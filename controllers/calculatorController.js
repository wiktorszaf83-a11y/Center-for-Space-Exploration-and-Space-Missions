
const planets = require("../data/planets");

function calculator(req, res) {
  if (req.method === "GET") {
    return res.render("calculator", {
      title: "Kalkulator Wag na Planetach",
      result: null,
      earthWeight: null,
      planets: planets,
    });
  }

  const earthWeight = parseFloat(req.body.earthWeight);
  const selectedPlanet = req.body.planet;

  if (isNaN(earthWeight) || earthWeight <= 0) {
    return res.render("calculator", {
      title: "Kalkulator Wag na Planetach",
      result: null,
      earthWeight: req.body.earthWeight,
      error: "Podaj poprawną masę ciała (wartość dodatnia).",
      planets: planets,
    });
  }

  if (!selectedPlanet) {
    return res.render("calculator", {
      title: "Kalkulator Wag na Planetach",
      result: null,
      earthWeight: req.body.earthWeight,
      error: "Wybierz planetę.",
      planets: planets,
    });
  }

  const planet = planets.find((p) => p.name === selectedPlanet);

  if (!planet) {
    return res.render("calculator", {
      title: "Kalkulator Wag na Planetach",
      result: null,
      earthWeight: req.body.earthWeight,
      error: "Wybrano nieprawidłową planetę.",
      planets: planets,
    });
  }

  const weightOnPlanet = (earthWeight * planet.gravity).toFixed(2);

  res.render("calculator", {
    title: "Kalkulator Wag na Planetach",
    result: {
      earthWeight,
      planet: planet.name,
      gravity: planet.gravity,
      weightOnPlanet,
      color: planet.color,
    },
    earthWeight: req.body.earthWeight,
    planets: planets,
  });
}

module.exports = { calculator };