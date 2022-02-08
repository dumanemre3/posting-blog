import React, { useEffect, useState } from "react";
import _Post_Blog_Logo from "../images/_Post_Blog_Logo.svg";
import ToDoForm from "./ToDoList/ToDoForm";
import ToDoList from "../components/ToDoList/ToDoList";
import { Typography } from "@mui/material";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import db from "../firebase";

function ToDoComponent() {
  // const storageTodos = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  /*const getTodos = async () => {
    const dataCol = collection(db, "todos");
    onSnapshot(dataCol, async (doc) => {
      const q = query(dataCol, where("userId", "==", user.uid));
      let feedSnapshot = await getDocs(q);
      const todosArray = [];
      feedSnapshot.forEach((data) => {
        todosArray.push(data.data());
      });
      setTodos(todosArray);
    });
  };*/

  const getTodos = async () => {
    const dataCol = collection(db, "todos");
    onSnapshot(dataCol, async (doc) => {
      const q = query(dataCol, where('userId', '==', user.uid));

      let todoSnapshot = await getDocs(q);
      let data = todoSnapshot.docs;
      setTodos(data);
    });
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div>
      <header className="flex justify-between items-center p-4 border-b border-gray-extraLight text-white">
        <span className="ml-3 font-serif font-bold text- italic hover:not-italic mt-3">
          To Do List
        </span>
        <img
          src={_Post_Blog_Logo}
          alt=""
          className="w-10 h-10 rounded-t-lg"
        />
      </header>
      <div className="p-4">
        <ToDoForm todo={todos} setTodos={setTodos} />
        <ToDoList todos={todos} />
      </div>
    </div>
  );
}

export default ToDoComponent;
