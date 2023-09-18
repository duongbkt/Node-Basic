const Todo = ({ todo, completeTodo, removeTodo, loadingButton }) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.completed ? "line-through" : "" }}
    >
      {todo.title}
      <div>
        <button
          disabled={loadingButton}
          onClick={() => completeTodo(todo.id, todo)}
        >
          {todo.completed === false ? "Complete" : "Un Complete"}
        </button>
        <button onClick={() => removeTodo(todo.id)}>x</button>
      </div>
    </div>
  );
};

export default Todo;
