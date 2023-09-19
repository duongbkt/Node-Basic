const {
  getAll: getAllTodo,
  remove,
  add: addTodo,
  update: updateTodo,
  removeMany,
  updateMany,
} = require("../../database/todoReponsitory");

//todo: phần này đãng nhé ra phải pass đc bài koajs basic mới làm đấy , tuy nhiên anh vẫn review qua nhé

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
    const { id } = ctx.params;
    if (!id) {
      ctx.status = 404;
      ctx.body = "Product not found";
      return;
    }
    remove(Number(id));
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
    const { id } = ctx.request.body;
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
