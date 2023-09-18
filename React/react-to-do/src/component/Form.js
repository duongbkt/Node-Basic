const TodoForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          style={{ position: "relative", right: "10px" }}
          disabled={value.trim() === ""}
          onClick={handleSubmit}
        >
          Create
        </button>
      </div>
      {value && value.trim() === "" && <p style={{ color: "red" }}>not empty</p>}
    </form>
  );
};

export default TodoForm;
