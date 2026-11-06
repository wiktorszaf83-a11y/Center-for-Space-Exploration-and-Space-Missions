const missions = require("../data/missions");
const astronauts = require("../data/astronauts");

function home(req, res) {
  const recentMissions = missions
    .filter((m) => m.year >= 2020)
    .slice(0, 3);

  const activeMissions = missions.filter((m) => m.status === "Aktywna");

  res.render("home", {
    title: "Centrum Eksploracji Kosmosu",
    recentMissions,
    activeMissions,
    totalMissions: missions.length,
    totalAstronauts: astronauts.length,
  });
}

module.exports = { home };