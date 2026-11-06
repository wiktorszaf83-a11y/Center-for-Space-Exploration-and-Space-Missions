const missions = require("../data/missions");

function catalog(req, res) {
  const query = (req.query.q || "").toLowerCase().trim();
  const yearFilter = req.query.year ? parseInt(req.query.year, 10) : null;
  const statusFilter = req.query.status || null;

  let filtered = missions.slice();

  if (query) {
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.destination.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
    );
  }

  if (yearFilter) {
    filtered = filtered.filter((m) => m.year === yearFilter);
  }

  if (statusFilter) {
    filtered = filtered.filter((m) => m.status === statusFilter);
  }

  const hasFilters = query || yearFilter || statusFilter;

  res.render("missions", {
    title: "Katalog Misji Kosmicznych",
    missions: filtered,
    query,
    yearFilter,
    statusFilter,
    hasFilters,
    totalResults: filtered.length,
  });
}

function detail(req, res) {
  const missionId = req.params.id;
  const mission = missions.find((m) => m.id === missionId);

  if (!mission) {
    return res.status(404).render("error", {
      title: "Nie znaleziono misji",
      message: `Misja o ID "${missionId}" nie istnieje w naszej bazie.`,
    });
  }

  res.render("mission-detail", {
    title: `Misja: ${mission.name}`,
    mission,
  });
}

module.exports = { catalog, detail };