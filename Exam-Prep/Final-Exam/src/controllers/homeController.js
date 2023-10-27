const router = require("express").Router();
const { getAll } = require("../services/electronicService");

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/search", async (req, res) => {
  const electronics = await getAll();
  res.render("search", { electronics });
});

router.post("/search", async (req, res) => {
  let { searchName, searchType } = req.body;
  if (!searchName) {
    searchName = null;
  }
  const electronicsFiltered = await getAll(searchName, searchType);
  const hasElectronics = electronicsFiltered.length > 0 ? false : true;

  res.render("search", { electronicsFiltered, hasElectronics });
});

router.get("/catalog", async (req, res) => {
  const electronics = await getAll();
  const hasPosts = electronics.length > 0;
  res.render("catalog", { electronics, hasPosts });
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
