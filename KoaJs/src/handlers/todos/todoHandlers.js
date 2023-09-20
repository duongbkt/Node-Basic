const {
  getAll: getAllTodo,
  remove,
  add: addTodo,
  update: updateTodo,
} = require("../../database/todoReponsitory");

async function getTodos(ctx) {
  try {
    const todos = getAllTodo();
    ctx.body = {
      data: todos,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

async function save(ctx) {
  try {
    const postData = ctx.request.body;
    const todo = addTodo({
      completed: false,
      ...postData,
    });

    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: todo,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function removeTodo(ctx) {
  try {
    const id = ctx.request.body;
    if (!id) {
      ctx.status = 404;
      ctx.body = "Product not found";
      return;
    }
    remove(id || []);
    ctx.body = {
      success: true,
    };
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function update(ctx) {
  try {
    const id = ctx.request.body;
    if (!id) {
      ctx.status = 404;
      ctx.body = "Product not found";
      return;
    }
    const todo = updateTodo(id);
    return (ctx.body = {
      success: true,
      todo,
    });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}



module.exports = {
  getTodos,
  removeTodo,
  save,
  update,
};
