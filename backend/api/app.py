from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import joblib
import pandas as pd
import neattext.functions as nfx
import cv2
import numpy as np
import tensorflow as tf
import os

app = Flask(__name__)
CORS(app)

# Configure your database URI here
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a random secret key

db = SQLAlchemy(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

# Initialize the database with the application context
with app.app_context():
    db.create_all()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Missing email or password"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully",
                    "status": "success",
                    "status_code": "201"
                    }), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    email = data.get('Email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.email)
        return jsonify({"message": "Login successful", "token": access_token, "status": "success", "status_code": "201"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello {current_user}!"}), 200

# Load the pre-trained text emotion model
model_path = "./Models/text_emotion_classifier.pkl"
text_model = joblib.load(model_path)

# Load the pre-trained video emotion model
def load_model_from_disk():
    print("Loading model from disk...")
    try:
        model_config_path = '../Models/model.json'
        model_weights_path = '../Models/model_weights.h5'

        if not os.path.exists(model_config_path):
            raise FileNotFoundError(f"Model configuration file {model_config_path} does not exist.")
        if not os.path.exists(model_weights_path):
            raise FileNotFoundError(f"Model weights file {model_weights_path} does not exist.")

        with open(model_config_path, 'r') as json_file:
            model_config = json_file.read()

        if not model_config:
            raise ValueError("Model configuration file is empty.")

        loaded_model = tf.keras.models.model_from_json(model_config)
        loaded_model.load_weights(model_weights_path)
        loaded_model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

        print("Model loaded successfully.")
        loaded_model.summary()  # Print model summary for verification
        return loaded_model

    except Exception as e:
        print("Error loading model:", str(e))
        return None


# Function to capture frames from video
def capture_frames(video_path, num_frames=1):
    try:
        cap = cv2.VideoCapture(video_path)
        frames = []
        for _ in range(num_frames):
            ret, frame = cap.read()
            if not ret:
                break
            # Convert frame to grayscale
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            # Resize frame to (48, 48)
            resized_frame = cv2.resize(gray_frame, (48, 48))
            # Normalize frame pixel values (between 0 and 1)
            normalized_frame = resized_frame / 255.0
            frames.append(normalized_frame)
        cap.release()

        if frames:
            print(f"{len(frames)} frames captured successfully.")
        else:
            print("No frames captured from the video.")

        return frames

    except Exception as e:
        print("Error capturing frames:", str(e))
        return None

# Function to predict emotions from frames
def predict_emotion(frames, model):
    try:
        if model is None:
            raise ValueError("Model is not loaded correctly")

        label_to_text = {0: 'angry', 1: 'disgust', 2: 'fear', 3: 'happy', 4: 'sad'}
        emotions = []
        for frame in frames:
            # Reshape frame to (1, 48, 48, 1) to match model input shape
            frame = frame.reshape(1, 48, 48, 1)
            # Predict emotion using the loaded model
            predictions = model.predict(frame)
            predicted_class = np.argmax(predictions)
            # Map predicted class to corresponding emotion label
            predicted_emotion = label_to_text[predicted_class]
            emotions.append(predicted_emotion)

        print("Emotions predicted successfully.")
        return emotions

    except Exception as e:
        print("Error predicting emotions:", str(e))
        return None

# @app.route('/analyze', methods=['POST'])
@app.route('/analyze', methods=['POST'])
def analyze():
    if 'chat' not in request.files or 'video' not in request.files:
        return jsonify({"message": "No chat or video file provided"}), 400

    chat_file = request.files['chat']
    chat_text = chat_file.read().decode('utf-8')
    video_file = request.files['video']

    # Save the video file temporarily
    video_path = '../Models/temp_video.mp4'
    video_file.save(video_path)

    # Preprocess the chat text
    clean_text = nfx.remove_userhandles(chat_text)
    clean_text = nfx.remove_stopwords(clean_text)

    # Predict emotion from chat text
    text_prediction = text_model.predict([clean_text])[0]

    # Capture frames from the uploaded video
    captured_frames = capture_frames(video_path)
    
    # Ensure the model is loaded correctly
    print("Loading video emotion model...")
    video_model = load_model_from_disk()
    
    # Predict emotions for captured frames
    if captured_frames is not None and video_model is not None:
        video_predictions = predict_emotion(captured_frames, video_model)
    else:
        video_predictions = ["Error capturing frames or model not loaded"]

    # Delete the temporary video file
    os.remove(video_path)

    response = {
        "text_prediction": text_prediction,
        "video_predictions": video_predictions
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
