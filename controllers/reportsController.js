const fs = require("fs");
const path = require("path");
const missions = require("../data/missions");
const planets = require("../data/planets");

function reportsPage(req, res) {
  res.render("reports", {
    title: "Pobieranie Raportów",
  });
}

function downloadReport(req, res) {
  let csv = "ID,Nazwa,Cel,Rok,Status,Czas trwania,Koszt\n";
  for (const m of missions) {
    csv += `"${m.id}","${m.name}","${m.destination}",${m.year},"${m.status}","${m.duration}","${m.cost}"\n`;
  }

  const filePath = path.join(__dirname, "..", "data", "missions-report.csv");
  fs.writeFileSync(filePath, csv, "utf-8");

  res.download(filePath, "raport-misji.csv", (err) => {
    if (err) {
      res.status(500).send("Błąd podczas pobierania pliku.");
    }
  });
}

function downloadPlanetReport(req, res) {
  let txt = "=== RAPORT PLANET ===\n\n";
  for (const p of planets) {
    txt += `Planeta: ${p.name}\n`;
    txt += `  Typ: ${p.type}\n`;
    txt += `  Grawitacja: ${p.gravity}g\n`;
    txt += `  Odległość od Słońca: ${p.distance}\n`;
    txt += `  Średnica: ${p.diameter}\n`;
    txt += `  Liczba księżyców: ${p.moons}\n\n`;
  }

  const filePath = path.join(__dirname, "..", "data", "planets-report.txt");
  fs.writeFileSync(filePath, txt, "utf-8");

  res.download(filePath, "raport-planet.txt", (err) => {
    if (err) {
      res.status(500).send("Błąd podczas pobierania pliku.");
    }
  });
}

module.exports = { reportsPage, downloadReport, downloadPlanetReport };