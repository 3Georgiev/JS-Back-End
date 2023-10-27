const router = require("express").Router();
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const electronicController = require("./controllers/electronicController");

router.use(homeController);
router.use("/electronics", electronicController);
router.use("/users", userController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
