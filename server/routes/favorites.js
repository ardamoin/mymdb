const express = require("express");
const favoritesController = require("../controllers/favoritesController");

const router = express.Router();

router.post("/", favoritesController.get_favorites);

router.post("/add", favoritesController.add_favorite);

router.post("/remove", favoritesController.remove_favorite);

module.exports = router;
