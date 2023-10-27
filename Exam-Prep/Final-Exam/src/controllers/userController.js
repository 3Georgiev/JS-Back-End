const router = require("express").Router();
const userServices = require("../services/userService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrMsg } = require("../util/errorHandler");

router.get("/register", isAuth, (req, res) => {
  res.render("user/register");
});

router.post("/register", isAuth, async (req, res) => {
  const { email, username, password, rePassword } = req.body;
  try {
    await userServices.register({ email, username, password, rePassword });
    const token = await userServices.login(email, password);
    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    const errorMessages = extractErrMsg(err);
    res.render("user/register", { errorMessages });
  }
});

router.get("/login", isAuth, (req, res) => {
  res.render("user/login");
});

router.post("/login", isAuth, async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userServices.login(email, password);
    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    const errorMessages = extractErrMsg(err);

    res.render("user/login", { errorMessages });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});
module.exports = router;
