const router = require("express").Router();
const cubeServices = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeServices.create({
    name,
    description,
    imageUrl,
    difficultyLevel,
    owner: req.user,
  });
  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeServices.getSingleCube(cubeId).lean();
  const hasAccessories = cube.accessories.length > 0;

  if (!cube) {
    res.redirect("/404");
    return;
  }
  res.render("details", { cube, hasAccessories });
});

router.get("/:cubeId/attach-accessory", async (req, res) => {
  const cubeData = await cubeServices.getSingleCube(req.params.cubeId).lean();
  const accessories = await accessoryService.getAll().lean();

  const hasAccessories = accessories.length > 0;

  res.render("accessory/attach", { ...cubeData, accessories, hasAccessories });
});

router.post("/:cubeId/attach-accessory", async (req, res) => {
  const { cubeId } = req.params;
  const { accessory: accessoryId } = req.body;
  await cubeServices.attachAccessory(cubeId, accessoryId);
  res.redirect(`/cubes/${cubeId}/details`);
});
module.exports = router;
