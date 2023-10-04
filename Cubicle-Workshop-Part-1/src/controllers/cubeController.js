const router = require("express").Router();
const cubeServices = require("../services/cubeService");
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  cubeServices.create({ name, description, imageUrl, difficultyLevel });
  res.redirect("/");
});

router.get("/details/:cubeId", (req, res) => {
  const cubeData = cubeServices.getSingleCube(req.params.cubeId);
  if (!cubeData) {
    res.redirect("/404");
    return;
  }
  res.render("details", { ...cubeData });
});

module.exports = router;
