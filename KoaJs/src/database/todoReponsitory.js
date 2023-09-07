const fs = require("fs");

const { readFileSync, writeFileSync } = fs;

const { data: todos } = JSON.parse(
  readFileSync("./src/database/todos.json", "utf-8")
);

function getAll() {
  return todos;
}

function add(data) {
  const updateTodo = [data, ...todos];
  writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({
      data: updateTodo,
    })
  );
  return data;
}

function remove(id) {
  const todo = todos.filter((todo) => todo.id !== id);
  writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({
      data: todo,
    })
  );
}

function update(id, data) {
  const todoUpdate = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        ...data,
      };
    }
    return todo;
  });
  writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({
      data: todoUpdate,
    })
  );
  return {
    ...data, id: id
  };
}

module.exports = {
  getAll,
  add,
  update,
  remove,
};
