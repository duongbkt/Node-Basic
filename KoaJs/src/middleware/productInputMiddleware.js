const yup = require("yup");

async function productInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number(),
      description: yup.string(),
      product: yup.string(),
      color: yup.string(),
      createdAt: yup.date(),
      image: yup.string(),
    });

    await schema.validate(postData);
   await next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

module.exports = productInputMiddleware;
