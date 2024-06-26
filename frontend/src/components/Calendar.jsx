// Calendar.js
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Styles/customStyle.css"; // Custom styles
import monitor from "../assets/monitor-recorder.png";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container bg-white text-black p-4 rounded-lg">
      <div className="flex items-center">
        <img src={monitor} alt="" />
        <h3 className="mb-4 text-2xl font-semibold pl-2">Interview History</h3>
      </div>

      <h4 className=" mb-2 text-lg font-bold mt-4">Choose Date</h4>
      <Calendar onChange={setDate} value={date} className="custom-calendar" />
    </div>
  );
};

export default CalendarComponent;
