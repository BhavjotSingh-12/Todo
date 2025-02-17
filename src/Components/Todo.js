import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import './todo.css'

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [credentials] = useContext(CredentialsContext);
  const [filter, setFilter] = useState("uncompleted");

  const persist = (newTodos) => {
    fetch(`http://localhost:4000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => { });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => {
        if (todos == null) {
          return null;
        }
        setTodos(todos)
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };

  const getTodos = () => {
    return todos.filter((todo) =>
      filter === "completed" ? todo.checked : !todo.checked
    );
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <select value={filter} className="select" onChange={(e) => changeFilter(e.target.value)}>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
      <div className="todo">
        {getTodos().map((todo) => (
          <div key={todo.id} className="blocks">
            <div className="boxsize">
              <input
                className="check"
                checked={todo.checked}
                onChange={() => toggleTodo(todo.id)}
                type="checkbox"
              />
            </div>
            <div>
              <label className="text">{todo.text}</label>
            </div>
          </div>
        ))}
        <br />

        <form onSubmit={addTodo}>
          <input
          className="boxsize"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            type="text"
          ></input>
          <button type="submit" className="submit">Add</button>
        </form>
      </div>
    </div>
  );
}