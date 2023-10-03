import Router from "koa-router";
import * as todoHandler from "../handlers/todo/todoHandlers.js";
import todoInputMiddleware from "../middleware/todoInputMiddleware.js";

const router = new Router({
  prefix: "/api",
});

// Routes todos
router.get("/todos", todoHandler.getTodos);
router.post("/todo", todoHandler.save);
router.get("/todo/:id", todoHandler.getTodo);
router.post("/todos", todoHandler.removeTodos);
router.put("/todos", todoHandler.updates);

export default router;
