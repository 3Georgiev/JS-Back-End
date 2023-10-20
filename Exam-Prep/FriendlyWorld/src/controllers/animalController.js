const router = require("express").Router();
const animalService = require("../services/animalService");
const { isNotAuth } = require("../middlewares/authMiddleware");
const { extractErrMsg } = require("../util/errorHandler");

router.get("/create", isNotAuth, (req, res) => {
  res.render("animal/create");
});

router.post("/create", isNotAuth, async (req, res) => {
  try {
    const { name, years, kind, imageUrl, need, location, description } =
      req.body;
    await animalService.create({
      name,
      years,
      kind,
      imageUrl,
      need,
      location,
      description,
      owner: req.user,
    });

    res.redirect("/dashboard");
  } catch (err) {
    const errorMessages = extractErrMsg(err);
    res.render("animal/create", { errorMessages });
  }
});

router.get("/:animalId/details", async (req, res) => {
  const id = req.params.animalId;
  const animal = await animalService.getSingleAnimal(id);
  const isOwner = animal.owner.toString() === req.user._id;
  const donations = animal.donations;
  const alreadyDonated = donations.filter(
    (donator) => donator._id === req.user._id
  );

  if (!animal) {
    res.redirect("/404");
    return;
  }
  res.render("animal/details", { animal, isOwner, alreadyDonated });
});

router.get("/:animalId/edit", isNotAuth, async (req, res) => {
  const id = req.params.animalId;
  const animal = await animalService.getSingleAnimal(id);
  res.render("animal/edit", { animal });
});

router.post("/:animalId/edit", isNotAuth, async (req, res) => {
  const id = req.params.animalId;
  const { name, years, kind, imageUrl, need, location, description } = req.body;
  const payLoad = { name, years, kind, imageUrl, need, location, description };
  await animalService.update(id, payLoad);
  res.redirect(`/animals/${id}/details`);
});

router.get("/:animalId/delete", isNotAuth, async (req, res) => {
  const id = req.params.animalId;
  await animalService.delete(id);
  res.redirect(`/dashboard`);
});

router.get("/:animalId/donate", isNotAuth, async (req, res) => {
  const id = req.params.animalId;
  await animalService.donate(id, req.user._id);

  res.redirect(`/animals/${id}/details`);
});

module.exports = router;
