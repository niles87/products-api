const router = require("express").Router();
const productRoutes = require("./products");
const reviewRoutes = require("./reviews");
const categoryRoutes = require("./categories");

router.use((req, res, next) => {
  if (req.method === "GET") res.set("Cache-Control", "private, max-age=300");
  next();
});

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
