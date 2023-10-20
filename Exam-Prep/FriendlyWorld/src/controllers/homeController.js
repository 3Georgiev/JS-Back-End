const router = require("express").Router();
const { getAll } = require("../services/animalService");

router.get("/", async (req, res) => {
  const animals = await getAll();

  const latestPosts = animals
    .slice(animals.length > 3 ? animals.length - 3 : 0)
    .reverse();

  const hasPosts = animals.length > 0;
  res.render("index", { latestPosts, hasPosts });
});

router.get("/search", (req, res) => {
  res.render("search");
});

router.post("/search", async (req, res) => {
  const { search } = req.body;
  const animalsFiltered = await getAll(search);
  const hasAnimals = animalsFiltered.length > 0 ? false : true;

  res.render("search", { animalsFiltered, hasAnimals });
});

router.get("/dashboard", async (req, res) => {
  const animals = await getAll();
  const hasPosts = animals.length > 0;
  res.render("dashboard", { animals, hasPosts });
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
