import React from "react";
import ToDo from "./ToDo";
import lodash from "lodash";

const ToDoList = ({ todos }) => {
  /**const createdAtSortedArray = lodash.orderBy(
    todos,
    [(obj) => new Date(obj.createdAt)],
    ["desc"]
  );*/
  const toDoDateSortedArray = lodash.orderBy(
    todos,
    [(obj) => new Date(obj.toDoDate)],
    ["asc"]
  );
  return (
    <>
      {todos.map((item, key) => (
        <ToDo key={key} todo={item} />
      ))}
    </>
  );
};

export default ToDoList;
