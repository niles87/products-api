const router = require("express").Router();
const productRoutes = require("./products");
const reviewRoutes = require("./reviews");
const categoryRoutes = require("./categories");

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
