const Router = require("koa-router");
const productHandler = require("../handlers/products/productHandlers");
const todoHandler = require("../handlers/todos/todoHandlers");
const productInputMiddleware = require("../middleware/productInputMiddleware");

const router = new Router({
  prefix: "/api",
});

// Routes products
router.get("/products", productHandler.getProducts);
router.post("/products", productInputMiddleware, productHandler.save);
router.put("/product/:id", productInputMiddleware, productHandler.update);
router.get("/product/:id", productHandler.getProduct);
router.delete("/product/:id", productHandler.removeProduct);

// Routes todos
router.get("/todos", todoHandler.getTodos);
router.put("/todo/:id", todoHandler.update);
router.post("/todos", todoHandler.save);
router.post("/todo", todoHandler.removeManyTodo);
router.delete("/todo/:id", todoHandler.removeTodo);
router.put("/todo", todoHandler.updateManyTodo);

module.exports = router;
