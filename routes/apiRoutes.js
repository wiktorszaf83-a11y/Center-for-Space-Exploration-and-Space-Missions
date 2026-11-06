const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/api/stats", apiController.apiStats);

router.get("/api/astronauts", apiController.apiAstronauts);

router.get("/astronauts/:code", apiController.astronautProfile);

router.get("/health", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send("Status: OK\nSerwer: Centrum Eksploracji Kosmosu\nWersja: 1.0.0\nCzas działania: " + process.uptime().toFixed(0) + " sekund\n");
});

module.exports = router;