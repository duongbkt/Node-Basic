const { faker } = require("@faker-js/faker");
const fs = require("fs");
const { todoWriteFileSync } = require("../helpers/fileSync");

const { readFileSync } = fs;

const { data: todos } = JSON.parse(
  readFileSync("./src/database/todos.json", "utf-8")
);

function getAll() {
  return todos;
}

function add(data) {
  const updateTodo = [{ id: faker.number.int(), ...data }, ...todos];
  todoWriteFileSync(updateTodo);
  return data;
}

function remove(id) {
  const todo = todos.filter((todo) => todo.id !== id);
  todoWriteFileSync(todo);
}

function update(id, data) {
  const todoIndex = todos.findIndex((todo) => todo.id === Number(id));
  const todo = todos.find((todo) => todo.id === Number(id));
  const todoUpdate = { ...todo, ...data };
  todos[todoIndex] = todoUpdate;
  // const todoUpdate = todos.map((todo) => {
  //   if (todo.id === id) {
  //     return {
  //       ...todo,
  //       ...data,
  //     };
  //   }
  //   return todo;
  // });
  todoWriteFileSync(todos);
  return {
    ...data,
    id: id,
  };
}

function removeMany(id = []) {
  const todo = todos.filter((todo) => !id.includes(todo.id));
  todoWriteFileSync(todo);
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
  todoWriteFileSync(todoUpdate);
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
