import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ state }) {
  return (
    <ul>
      {state.map(item => (
        <TodoItem key={item.id} {...item} />
      ))}
    </ul>
  );
}
