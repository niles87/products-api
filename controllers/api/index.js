const router = require("express").Router();
const v1 = require("./v1");
const v2 = require("./v2");

router.use("/v1", v1);
router.use("/v2", v2);

router.use("/", v1);

module.exports = router;
