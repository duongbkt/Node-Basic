import React, { useState } from "react";
import "./App.css";
import TodoForm from "../Form";
import Todo from "../Todo";
import { addTodo, deleteTodo, updateTodo } from "../../api/todo";
import useFetchData from "../../hooks/useFetchData";

function App() {
  const [value, setValue] = useState("");
  const { data: todos, setData: setTodos } = useFetchData();

  const completeTodo = async (id, todo) => {
    const { data } = await updateTodo(id, {
      ...todo,
      completed: !todo.completed,
    });
    setTodos(
      todos.map((item) => (item.id === data.data.id ? data.data : item))
    );
  };

  const onHandleRemoveTodo = (id) => {
    const confirm = window.confirm("Are you sure delete???");
    if (confirm) {
      deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!value) return;
      const { data } = await addTodo({ title: value.trim() });
      setTodos(data.data);
      setValue("");
    } catch (error) {
      alert("Can not be empty");
    }
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={todo.id + index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={onHandleRemoveTodo}
          />
        ))}
        <TodoForm
          value={value}
          handleSubmit={handleSubmit}
          setValue={setValue}
        />
      </div>
    </div>
  );
}

export default App;
