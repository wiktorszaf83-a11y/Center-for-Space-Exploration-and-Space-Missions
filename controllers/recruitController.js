const astronauts = require("../data/astronauts");

function recruit(req, res) {
  if (req.method === "GET") {
    return res.render("recruit", {
      title: "Rekrutacja Astronautów",
      submitted: null,
      error: null,
    });
  }

  const fullName = req.body.fullName || "";
  const email = req.body.email || "";
  const motivation = req.body.motivation || "";
  const experience = req.body.experience || "";
  const birthDate = req.body.birthDate || "";

  if (!fullName.trim()) {
    return res.render("recruit", {
      title: "Rekrutacja Astronautów",
      submitted: null,
      error: "Imię i nazwisko są wymagane.",
    });
  }

  if (!email.trim() || !email.includes("@")) {
    return res.render("recruit", {
      title: "Rekrutacja Astronautów",
      submitted: null,
      error: "Podaj poprawny adres e-mail.",
    });
  }

  if (!motivation.trim()) {
    return res.render("recruit", {
      title: "Rekrutacja Astronautów",
      submitted: null,
      error: "Treść motywacji jest wymagana.",
    });
  }

  const code = `AST-${Date.now().toString(36).toUpperCase()}`;

  const submitted = {
    fullName,
    email,
    motivation,
    experience,
    birthDate,
    code,
    submittedAt: new Date().toLocaleString("pl-PL"),
  };

  res.render("recruit", {
    title: "Rekrutacja Astronautów",
    submitted,
    error: null,
  });
}

module.exports = { recruit };