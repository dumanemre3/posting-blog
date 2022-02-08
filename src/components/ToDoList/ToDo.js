import React from "react";
import dayjs from "dayjs";
import moment from "moment";
import {
  updateDoc,
  Firestore,
  collection,
  doc,
  update,
} from "@firebase/firestore";
import db from "../../firebase";
import { deleteDoc } from "firebase/firestore";

function ToDo({ todo, toggleComplete, removeTodo }) {
  let { completed, createdAt, id, task, toDoDate, userId } = todo.data();
  var toObject = require("dayjs/plugin/toObject");
  var customParseFormat = require("dayjs/plugin/customParseFormat");
  var now = moment().format("DD.MM.YYYY");
  var toDoDateMoment = moment(toDoDate?.toDate()).format("DD.MM.YYYY");

  dayjs.extend(toObject);
  dayjs.extend(customParseFormat);

  const handleCheckBoxClick = async () => {
    updateDoc(doc(db, "todos", todo.id), {
      completed: !completed,
    });
    console.log(todo);
  };
  function handleRemoveClick() {
    deleteDoc(doc(db, "todos", todo.id));
  }
  return (
    <div
      className="flex justify-start items-start mb-1 pb-1"
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, .2)",
      }}
    >
      <div className="flex-none w-8">
        <input
          type="checkbox"
          defaultChecked={completed}
          onClick={handleCheckBoxClick}
        />
      </div>
      <div
        style={{
          flex: 6,
        }}
      >
        {!completed ? (
          now === toDoDateMoment ? (
            <div className="rounded bg-red-500 text-white px-3 py-1">
              It has to be done today!
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        <p
          style={{
            color: "white",
            textDecoration: completed ? "line-through" : null,
          }}
          className="break-all"
        >
          {task}
        </p>
        <small className="text-white">
          <strong>Entery Date:</strong>{" "}
          {moment(createdAt?.toDate()).format("DD.MM.YYYY")} -{" "}
          <strong>Deadline:</strong>{" "}
          {moment(toDoDate?.toDate()).format("DD.MM.YYYY")}
        </small>
      </div>
      <div className="flex-1 w-4 text-right text-white">
        <button
          className="px-4 py-2 bg-red-600 rounded text-white"
          onClick={handleRemoveClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ToDo;
