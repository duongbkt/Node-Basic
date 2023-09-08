const { writeFileSync } = require("fs");

const productWriteFileSync = (data) =>
  writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: data,
    })
  );

const todoWriteFileSync = (data) =>
  writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({
      data: data,
    })
  );

module.exports = {
  productWriteFileSync,
  todoWriteFileSync,
};
