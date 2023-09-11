const {
  getAll: getAllProduct,
  add: addProduct,
  update: updateProduct,
  getOne: getOneProduct,
  remove: deleteProduct,
} = require("../../database/productRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
  try {
    const { limit, sort } = ctx.query;
    const products = getAllProduct(limit, sort);

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
    addProduct({
      id: Math.random(),
      createdAt: new Date().toISOString(),
      ...postData,
    });

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
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
    updateProduct(id, postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const { field } = ctx.query;
    const getCurrentProduct = getOneProduct(id, field?.split(","));
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

async function removeProduct(ctx) {
  try {
    const { id } = ctx.params;
    const product = getProduct(id);
    if (!product) {
      ctx.status = 404;
      ctx.body = "Product not found";
      return;
    }
    deleteProduct(id);
    ctx.body = "Deleted";
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

module.exports = {
  getProducts,
  save,
  update,
  getProduct,
  removeProduct,
};
