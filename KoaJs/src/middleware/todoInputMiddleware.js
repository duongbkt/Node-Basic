const yup = require("yup");

async function todoInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
        completed: yup.boolean(), 
        title: yup.string().required().trim()
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

module.exports = todoInputMiddleware;
