import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./component/Form";
import Todo from "./component/Todo";
import { addTodo, deleteTodo, getTodo, updateTodo } from "./api/todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await getTodo();
      setTodos(data.data);
    };
    getTodos();
  }, []);

  const completeTodo = async (id, todo) => {
    const { data } = await updateTodo(id, {
      ...todo,
      completed: !todo.completed,
    });
    setTodos(todos.map((item) => (item.id === data.data.id ? data.data : item)));
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
    if (!value) return;
    const { data } = await addTodo({ title: value });
    setTodos([...todos, data.data]);
    setValue("");
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
