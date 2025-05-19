const router = require("express").Router();

router.get("/health_check", (req, res) => {
  res
    .status(200)
    .json({ status: true, msg: "working Fine!!", time: new Date() });
});

module.exports = router; 