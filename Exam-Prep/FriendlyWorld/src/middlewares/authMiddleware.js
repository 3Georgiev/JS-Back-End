const jwt = require("../lib/jwt");

exports.auth = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, "Secret");
      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      next();
    } catch (error) {
      console.log(error);
      res.clearCookie("auth");
      res.redirect("users/login");
    }
  } else {
    req.user = { _id: "N/A" };
    next();
  }
};

exports.isNotAuth = (req, res, next) => {
  if (req.user._id === "N/A") {
    return res.redirect("/users/login");
  }
  next();
};

exports.isAuth = (req, res, next) => {
  if (req.user._id !== "N/A") {
    return res.redirect("/");
  }
  next();
};
