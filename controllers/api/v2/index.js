const router = require("express").Router();
const productRoutes = require("./products");
const reviewRoutes = require("./reviews");
const categoryRoutes = require("./categories");
const { client } = require("../../../config/redis");

router.use(async (req, res, next) => {
  // await client.connect();

  if (req.method === "GET") {
    res.set("Cache-Control", "private, max-age=300");

    const cache = await client.get(req.originalUrl);

    if (cache) {
      res.status(200).json(JSON.parse(cache));
      return;
    }
  }
  next();
});

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
