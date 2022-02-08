import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import tr from "date-fns/locale/tr";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";
registerLocale("tr", tr);

function ToDoForm({ todo, setTodos }) {
  const [startDate, setStartDate] = useState(new Date());
  const user = JSON.parse(sessionStorage.getItem("user"));
  var now = dayjs();

  const handleSubmit = (e) => {
    e.preventDefault();

    addDoc(collection(db, "todos"), {
      id: uuidv4(),
      userId: user.uid,
      task: e.target.task.value,
      completed: false,
      toDoDate: startDate,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <form className="p-5 bg-gray-300 rounded mb-4" onSubmit={handleSubmit}>
      <div className="flex items-end">
        <div>
          <label className="block font-bold">To Do</label>
          <input
            name="task"
            type="text"
            className="py-2 px-4 block outline-none"
          />
        </div>
        <div>
          <label className="block font-bold ml-2">Choose Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            locale="tr"
            className="py-2 px-4 block outline-none mx-2"
            dateFormat="dd.MM.yyyy"
          />
        </div>
        <div>
          <button type="submit" className="bg-gray-800 text-white py-2 px-4">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default ToDoForm;
