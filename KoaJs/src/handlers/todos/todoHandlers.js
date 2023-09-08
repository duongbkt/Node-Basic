const {
  getAll: getAllTodo,
  remove,
  add: addTodo,
  update: updateTodo,
  removeMany,
  updateMany,
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
      id: new Date().getTime(),
      userId: new Date().getTime() + 1,
      completed: false,
      ...postData,
    });

    ctx.status = 201;
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
    const { id } = ctx.params;
    if (!id) {
      ctx.status = 404;
      ctx.body = "Product not found";
      return;
    }
    remove(Number(id));
    ctx.body = "Deleted";
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
    const postData = ctx.request.body;
    const { id } = ctx.params;
    const todo = updateTodo(Number(id), postData);

    ctx.status = 201;
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

async function removeManyTodo(ctx) {
  try {
    const { id } = ctx.request.body;
    if (!id) {
      ctx.status = 404;
      ctx.body = "Product not found";
      return;
    }
    removeMany(id || []);
    ctx.body = "Deleted";
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function updateManyTodo(ctx) {
  try {
    const { id} = ctx.request.body;
    if (!id) {
      ctx.status = 404;
      ctx.body = "Product not found";
      return;
    }
    const todo = updateMany(id);
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
  removeManyTodo,
  updateManyTodo,
};
