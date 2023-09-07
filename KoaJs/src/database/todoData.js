const fs = require("fs");

async function todos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todoData = await response.json();
  fs.writeFileSync("todos.json", JSON.stringify(todoData), "utf-8");
}
todos();
