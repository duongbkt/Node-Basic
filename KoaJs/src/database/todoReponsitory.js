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
  return updateTodo;
}

function remove(id) {
  const todo = todos.filter((todo) => !id.includes(todo.id));
  todoWriteFileSync(todo);
  return todo
}

function update(id=[]) {
  const todoUpdate = todos.map((todo) => {
    if (id.includes(todo.id)) {
      return {
        ...todo,
        completed: !todo.completed,
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
};
