const Router = require("koa-router");
const productHandler = require("../handlers/books/productHandlers");
const productInputMiddleware = require("../middleware/productInputMiddleware")

const router = new Router({
  prefix: "/api",
});

// Routes will go here
router.get("/products", productHandler.getProducts);
router.post("/products", productInputMiddleware, productHandler.save);
router.put("/product/:id", productInputMiddleware, productHandler.update);
router.get("/product/:id", productHandler.getProduct);
router.delete("/product/:id", productHandler.removeProduct);

module.exports = router;
