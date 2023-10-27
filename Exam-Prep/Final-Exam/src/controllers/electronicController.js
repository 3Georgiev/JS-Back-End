const router = require("express").Router();
const electronicService = require("../services/electronicService");
const { isNotAuth, checkPermission } = require("../middlewares/authMiddleware");
const { extractErrMsg } = require("../util/errorHandler");

router.get("/create", isNotAuth, (req, res) => {
  res.render("electronic/create");
});

router.post("/create", isNotAuth, async (req, res) => {
  try {
    const {
      name,
      type,
      production,
      exploitation,
      damages,
      image,
      price,
      description,
    } = req.body;
    await electronicService.create({
      name,
      type,
      production,
      exploitation,
      damages,
      image,
      price,
      description,
      owner: req.user,
    });

    res.redirect("/catalog");
  } catch (err) {
    const errorMessages = extractErrMsg(err);
    res.render("electronic/create", { errorMessages });
  }
});

router.get("/:electronicId/details", async (req, res) => {
  const id = req.params.electronicId;
  const electronic = await electronicService.getSingleElectronic(id);
  const isOwner = electronic.owner.toString() === req.user._id;
  const buyers = electronic.buyingList;
  const alreadyBought = buyers.filter((buyer) => buyer._id === req.user._id);

  if (!electronic) {
    res.redirect("/404");
    return;
  }
  res.render("electronic/details", { electronic, isOwner, alreadyBought });
});

router.get(
  "/:electronicId/edit",
  isNotAuth,
  checkPermission,
  async (req, res) => {
    const id = req.params.electronicId;
    const electronic = await electronicService.getSingleElectronic(id);
    res.render("electronic/edit", { electronic });
  }
);

router.post(
  "/:electronicId/edit",
  isNotAuth,
  checkPermission,
  async (req, res) => {
    const id = req.params.electronicId;
    const electronic = await electronicService.getSingleElectronic(id);
    try {
      const {
        name,
        type,
        production,
        exploitation,
        damages,
        image,
        price,
        description,
      } = req.body;
      const payLoad = {
        name,
        type,
        production,
        exploitation,
        damages,
        image,
        price,
        description,
      };
      await electronicService.update(id, payLoad);
      res.redirect(`/electronics/${id}/details`);
    } catch (err) {
      const errorMessages = extractErrMsg(err);
      res.render("electronic/edit", { electronic, errorMessages });
    }
  }
);

router.get(
  "/:electronicId/delete",
  isNotAuth,
  checkPermission,
  async (req, res) => {
    const id = req.params.electronicId;
    await electronicService.delete(id);
    res.redirect(`/catalog`);
  }
);

router.get("/:electronicId/buy", isNotAuth, async (req, res) => {
  const id = req.params.electronicId;
  await electronicService.buy(id, req.user._id);

  res.redirect(`/electronics/${id}/details`);
});

module.exports = router;
