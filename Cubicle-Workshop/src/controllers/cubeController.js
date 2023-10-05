const router = require("express").Router();
const cubeServices = require("../services/cubeService");
const accesoryService = require("../services/accesoryService");
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeServices.create({ name, description, imageUrl, difficultyLevel });
  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const cubeData = await cubeServices.getSingleCube(req.params.cubeId);
  if (!cubeData) {
    res.redirect("/404");
    return;
  }
  res.render("details", { ...cubeData });
});

router.get("/:cubeId/attach-accessory", async (req, res) => {
  const cubeData = await cubeServices.getSingleCube(req.params.cubeId);
  const accessories = await accesoryService.getAll().lean();

  const hasAccessories = accessories.length > 0;

  res.render("accessory/attach", { ...cubeData, accessories, hasAccessories });
});

module.exports = router;
