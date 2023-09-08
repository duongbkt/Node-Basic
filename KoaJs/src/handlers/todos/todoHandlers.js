const {
  getAll: getAllTodo,
  remove,
  add: addTodo,
  update: updateTodo,
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
    //todo: không dùng id thế này nhé thành ra mỗi todo là 1 userId khác nhau à , bỏ cái userId đi tìm cách khác để gen id cho  todo nhé 
    // phần genid cho vào repository nhé 
    const todo = addTodo({
      id: new Date().getTime(),
      userId: new Date().getTime() + 1,
      completed: false,
      ...postData,
    });

    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data: todo
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

module.exports = {
  getTodos,
  removeTodo,
  save,
  update,
};
