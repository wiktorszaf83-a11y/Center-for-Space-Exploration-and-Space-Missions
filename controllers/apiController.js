const planets = require("../data/planets");
const astronauts = require("../data/astronauts");
const missions = require("../data/missions");

function apiStats(req, res) {
  const stats = {
    totalPlanets: planets.length,
    planets: planets.map((p) => ({
      name: p.name,
      gravity: p.gravity,
      type: p.type,
      moons: p.moons,
    })),
    totalMissions: missions.length,
    activeMissions: missions.filter((m) => m.status === "Aktywna").length,
    generatedAt: new Date().toISOString(),
  };

  res.json(stats);
}

function apiAstronauts(req, res) {
  res.json({
    total: astronauts.length,
    astronauts: astronauts.map((a) => ({
      code: a.code,
      name: a.name,
      nationality: a.nationality,
      status: a.status,
      missions: a.missions,
    })),
  });
}


function astronautProfile(req, res) {
  const code = req.params.code;
  const astronaut = astronauts.find((a) => a.code === code);

  if (!astronaut) {
    return res.status(404).render("error", {
      title: "Nie znaleziono astronauty",
      message: `Astronauta o kodzie "${code}" nie istnieje w naszej bazie.`,
    });
  }

  res.render("astronaut", {
    title: `Astronauta: ${astronaut.name}`,
    astronaut,
  });
}

module.exports = { apiStats, apiAstronauts, astronautProfile };