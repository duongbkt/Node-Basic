const Router = require("koa-router");
const todoHandler = require("../handlers/todo/todoHandlers");
const todoInputMiddleware = require("../middleware/todoInputMiddleware");

const router = new Router({
  prefix: "/api",
});

// Routes todos
router.get("/todos", todoHandler.getTodos);
router.post("/todo", todoInputMiddleware, todoHandler.save);
router.get("/todo/:id", todoHandler.getTodo);
router.post("/todos", todoHandler.removeTodos);
router.put("/todos", todoHandler.updates);




module.exports = router;
