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
  // dùng find chỗ này nhé không nên dùng map chỗ này nha 
  const todoUpdate = todos.map((todo) => {

    if (todo.id === id) {
      return {
        ...todo,
        ...data,
      };
    }
    return todo;
  });
  //todo : tách ra 1 function riêng nhé 
  writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({
      data: todoUpdate,
    })
  );
  return {
    ...data,
    id: id,
  };
}

function removeMany(id = []) {
  const todo = todos.filter((todo) => !id.includes(todo.id));
  writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({
      data: todo,
    })
  );
}

function updateMany(id = []) {
  const todoUpdate = todos.map((todo) => {
    if (id.includes(todo.id)) {
      return {
        ...todo,
        completed: true,
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
  return todoUpdate;
}

module.exports = {
  getAll,
  add,
  update,
  remove,
  removeMany,
  updateMany,
};
