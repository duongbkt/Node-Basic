import {
  getListTodos,
  add,
  getOne,
  remove,
  updateTodos,
} from "../../database/todoRepository";

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getTodos  (ctx)  {
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
};

export const save = async (ctx) => {
  try {
    const postData = ctx.request.body;
    const products = await add(postData);

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
};

export const getTodo = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { field } = ctx.query;
    const getCurrentProduct = await getOne(id, field?.split(","));
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
};

export const removeTodos = async (ctx) => {
  try {
    const id = ctx.request.body;
    await remove(id);
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
};

export const updates = async (ctx) => {
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
};
