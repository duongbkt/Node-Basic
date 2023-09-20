const Router = require("koa-router");
const productHandler = require("../handlers/products/productHandlers");
const todoHandler = require("../handlers/todos/todoHandlers");
const productInputMiddleware = require("../middleware/productInputMiddleware");
const todoInputMiddleware = require("../middleware/todoInputMiddleware");

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
router.post("/todo", todoHandler.removeTodo);
router.put("/todo", todoHandler.update);
router.get("/todos", todoHandler.getTodos);
router.post("/todos", todoInputMiddleware, todoHandler.save);


module.exports = router;
