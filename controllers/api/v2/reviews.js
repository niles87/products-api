const router = require("express").Router();
const { Review } = require("../../../models");

router.get("/:id", async (req, res) => {
  try {
    const { rows, rowCount } = await Review.getOne(req.params);

    if (rowCount > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { rowCount } = await Review.update({
      ...req.params,
      ...req.body,
    });

    res.status(rowCount === 0 ? 404 : 204).end();
  } catch (err) {
    console.error(err);
    res.status(err.table ? 400 : 500).end();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { rowCount } = await Review.delete(req.params);

    res.status(rowCount === 0 ? 404 : 204).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { rowCount } = await Review.updateVotes({
      ...req.params,
      helpful_votes: req.body.helpful_votes,
    });

    res.status(rowCount === 0 ? 404 : 204).end();
  } catch (err) {
    console.error(err);
    res.status(err.table ? 400 : 500).end();
  }
});

module.exports = router;
