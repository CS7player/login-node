const router = require("express").Router();

const sign_up = require("./sign-up");
router.use("/sign-up",sign_up);

router.get("/health_check", (req, res) => {
  res.status(SUCCESS_CODE).json({ status: true, msg: "working Fine!!", time: new Date() });
});

module.exports = router; 