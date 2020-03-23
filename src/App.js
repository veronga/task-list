import React, { useState, useEffect, useReducer, useCallback } from "react";
import TodoList from "./TodoList";
import { Context } from "./context";
import reducer from "./reducer";

import logo from "./img/pr_source.jpg";
import button from "./img/enter-arrow.png";
import pen from "./img/pen.png";

export default function App() {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [todoTitle, setTodoTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const addTodo = useCallback(
    event => {
      if (event.key === "Enter" || event.type === "click") {
        if (todoTitle === "") {
          setError("Пожалуйста введите задачу");
        } else {
          dispatch({
            type: "add",
            payload: todoTitle
          });
          setError("");
          setTodoTitle("");
        }
      }
    },
    [todoTitle]
  );

  return (
    <Context.Provider
      value={{
        dispatch
      }}
    >
      <div className="container">
        <div className="container-logo">
          <img src={logo} alt="logo" className="img-logo" />
          <h1>Напиши свой список дел</h1>
          <img src={pen} alt="pen" className="img-pen" />
        </div>
        <div className="input-field">
          <input
            type="text"
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
            onKeyPress={addTodo}
          />
          <label>Задача</label>
          <button onClick={addTodo}>
            <img src={button} alt="arrow" />
          </button>
        </div>
        <span className="text-error">{error}</span>
        <TodoList todos={state} />
      </div>
    </Context.Provider>
  );
}
