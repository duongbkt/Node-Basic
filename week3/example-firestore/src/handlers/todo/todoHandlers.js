const {
  getListTodos,
  add: addTodo,
  getOne: getOneTodo,
  remove: deleteTodo,
  updateTodos,
} = require("../../database/todoRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getTodos(ctx) {
  try {
    const { limit, sort } = ctx.query;
    const products = await getListTodos(limit, sort);

    ctx.body = {
      data: products,
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
    const products = await addTodo(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data: products,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function getTodo(ctx) {
  try {
    const { id } = ctx.params;
    const { field } = ctx.query;
    const getCurrentProduct = await getOneTodo(id, field?.split(","));
    if (getCurrentProduct) {
      return (ctx.body = {
        data: getCurrentProduct,
      });
    }
    throw new Error("Book Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function removeTodos(ctx) {
  try {
    const id = ctx.request.body;
    await deleteTodo(id);
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

async function updates(ctx) {
  try {
    const product = ctx.request.body;
    await updateTodos(product?.length > 1 ? product : [product]);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getTodos,
  save,
  getTodo,
  removeTodos,
  updates,
};
