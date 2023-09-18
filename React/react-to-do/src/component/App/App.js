import React, { useState } from "react";
import "./App.css";
import TodoForm from "../Form";
import Todo from "../Todo";
import { addTodo, deleteTodo, updateTodo } from "../../api/todo";
import useFetchData from "../../hooks/useFetchData";

function App() {
  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const { data: todos, setData: setTodos } = useFetchData();

  const completeTodo = async (id, todo) => {
    try {
      setLoadingButton(true);
      const { data } = await updateTodo(id, {
        ...todo,
        completed: !todo.completed,
      });
      setLoadingButton(false);
      setTodos(
        todos.map((item) => (item.id === data.data.id ? data.data : item))
      );
    } catch (error) {}
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
      setEmpty(true);
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
            loadingButton={loadingButton}
          />
        ))}
        <TodoForm
          value={value}
          handleSubmit={handleSubmit}
          setValue={setValue}
          empty={empty}
          setEmpty={setEmpty}
        />
      </div>
    </div>
  );
}

export default App;
