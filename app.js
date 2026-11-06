const express = require("express");
const path = require("path");
const fs = require("fs");

const { requestLogger, refererVerifier } = require("./middleware/logger");

const homeRoutes = require("./routes/homeRoutes");
const missionsRoutes = require("./routes/missionsRoutes");
const calculatorRoutes = require("./routes/calculatorRoutes");
const recruitRoutes = require("./routes/recruitRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(requestLogger);
app.use(refererVerifier);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/", missionsRoutes);
app.use("/", calculatorRoutes);
app.use("/", recruitRoutes);
app.use("/", reportsRoutes);
app.use("/", uploadRoutes);
app.use("/", apiRoutes);

app.use((req, res) => {
  res.status(404).render("error", {
    title: "404 — Strona nie znaleziona",
    message: `Strona "${req.originalUrl}" nie istnieje w Centrum Eksploracji Kosmosu.`,
  });
});

app.use((err, req, res, next) => {
  console.error("Błąd aplikacji:", err.message);
  res.status(500).render("error", {
    title: "500 — Błąd serwera",
    message: "Wystąpił nieoczekiwany błąd na serwerze. Spróbuj ponownie później.",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`  Centrum Eksploracji Kosmosu`);
  console.log(`  Serwer działa na porcie: ${PORT}`);
  console.log(`  Otwórz: http://localhost:${PORT}`);
  console.log(`========================================\n`);
});

module.exports = app;