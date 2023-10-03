const Router = require("koa-router");
const helloWorldController = require("../handlers/controllers/helloWorld");

const router = new Router({
  prefix: "/api",
});

router.get("/helloWorld", helloWorldController.hello);

module.exports = router;
