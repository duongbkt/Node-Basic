async function hello(ctx) {
  return (ctx.body = {
    message: "Hello World jebiuwerb",
  });
}

module.exports = {
  hello,
};
