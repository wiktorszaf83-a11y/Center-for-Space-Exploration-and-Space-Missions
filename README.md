<div align="center">

# 🚀 Center for Space Exploration and Space Missions

**Center for Space Exploration and Space Missions**

A web application about space missions, the planets of the Solar System and astronauts - with interactive forms, report generation and a public API.

*Node.js · Express · Pug · Multer · Vanilla JS*

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](#-quick-start)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Pug](https://img.shields.io/badge/Pug-3.0-A5B6D2?style=flat-square&logo=pug&logoColor=white)](https://pugjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

</div>

---

## ✨ Features

| | Module | What it does |
|---|---|---|
| 🛰️ | **Mission catalog** | 8 space missions with description, crew, cost, duration and status; detail view for each mission (`/missions/:id`) |
| 🪐 | **Weight calculator** | Calculates your body weight on all 8 planets using each planet's local gravity |
| 👩‍🚀 | **Astronaut recruitment** | Application form with validation (name, e-mail, motivation) and automatic generation of a unique candidate code |
| 📊 | **Report generation** | Download the mission report as CSV and the planet report as TXT - files are created dynamically on request |
| 📁 | **File upload** | Upload up to 5 MB with a type filter (`jpeg`, `jpg`, `png`, `gif`, `pdf`, `txt`, `csv`) |
| 🔌 | **Public API** | JSON endpoints: planet and mission statistics, astronaut list, astronaut profile and a `health` endpoint |

## 🧱 Tech stack

- **Runtime**: Node.js **18+** (tested on v22)
- **Server**: Express `^4.21`
- **View engine**: Pug `^3.0` - shared `layout.pug` and views inheriting from it
- **File uploads**: Multer `^1.4.5-lts.1` with `diskStorage`
- **Frontend**: Vanilla JS + CSS with custom properties (dark cosmic theme)
- **No database dependencies** - application data are CommonJS modules (`module.exports`) in the [`data/`](data/) directory

## 📁 Project structure

```text
.
├── app.js                  # application entry point: Express, middleware, routes
├── controllers/            # business logic (1 file = 1 domain)
│   ├── homeController.js
│   ├── missionsController.js
│   ├── calculatorController.js
│   ├── recruitController.js
│   ├── reportsController.js
│   ├── uploadController.js
│   └── apiController.js
├── routes/                 # route definitions (1 file = 1 domain)
├── middleware/
│   └── logger.js           # request logging + Referer header verification
├── data/                   # application data: missions, planets, astronauts
├── views/                  # Pug templates (layout.pug + 9 views)
├── public/
│   ├── css/style.css
│   ├── js/main.js
│   └── uploads/            # directory for user files (.gitkeep keeps it in the repo)
└── .devcontainer/          # ready-to-use development environment (Dev Containers)
```

> Pattern: **route → controller → data**. Every domain has its own route file and controller, so routing and business logic stay separate.

## 🚀 Quick start

```bash
# 1. Clone the repository
git clone https://github.com/wiktorszaf83-a11y/Center-for-Space-Exploration-and-Space-Missions.git
cd Center-for-Space-Exploration-and-Space-Missions

# 2. Install dependencies
npm install

# 3a. Production run
npm start

# 3b. Development mode with auto-reload (`node --watch`)
npm run dev
```

Open → **http://localhost:3000**

Environment variables (optional):

| Variable | Default | Effect |
|---|---|---|
| `PORT` | `3000` | server port |
| `NODE_ENV` | - | `production` enables `Referer` header verification in [`middleware/logger.js`](middleware/logger.js:18) |

## 🗺️ Routes

| Method | Path | View / action |
|---|---|---|
| `GET` | `/` | Home page (recent missions, active missions, counters) |
| `GET` | `/missions` | Mission catalog |
| `GET` | `/missions/:id` | Mission details |
| `GET` `POST` | `/calculator` | Weight calculator on planets |
| `GET` `POST` | `/recruit` | Astronaut recruitment form |
| `GET` | `/reports` | Report download page |
| `GET` | `/reports/download-missions` | Download mission report (CSV) |
| `GET` | `/reports/download-planets` | Download planet report (TXT) |
| `GET` `POST` | `/upload` | File upload (5 MB limit) |
| `GET` | `/astronauts/:code` | Astronaut profile |
| `GET` | `/health` | Server status (text/plain) |

## 🔌 API

```bash
curl http://localhost:3000/api/stats
curl http://localhost:3000/api/astronauts
```

### `GET /api/stats`
```json
{
  "totalPlanets": 8,
  "planets": [{ "name": "Merkury", "gravity": 0.38, "type": "Skalista", "moons": 0 }],
  "totalMissions": 8,
  "activeMissions": 5,
  "generatedAt": "2026-11-06T19:16:39.812Z"
}
```

### `GET /api/astronauts`
```json
{
  "total": 5,
  "astronauts": [
    { "code": "ARM-001", "name": "Neil Armstrong", "nationality": "USA", "status": "Emerytowany", "missions": ["Apollo 11"] }
  ]
}
```

## 🗂️ Data in the project

- **8 missions**: Apollo 11, Voyager 1, Mars Perseverance, Hubble Space Telescope, Apollo 13, James Webb, Artemis I, Mars Curiosity
- **8 planets**: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune (gravity, moons, diameter, distance from the Sun, type)
- **5 astronauts**: Neil Armstrong, Buzz Aldrin, Sally Ride, Chris Hadfield, Marek Tomczyk (code, nationality, status, missions, flights, days in space)

> Note: the UI text, seed data values and status names are stored in Polish (`Merkury` = Mercury, `Skalista` = Rocky, `Aktywna` = Active), so API responses return Polish strings.

## 🛠️ Good practices used in the code

- **Layered structure** `routes/` → `controllers/` → `data/`, one domain per file
- **Middleware** logging request duration, response status code and IP ([`requestLogger`](middleware/logger.js:1))
- **Server-side validation** for the calculator and recruitment form + **client-side validation** in [`public/js/main.js`](public/js/main.js:1) (1000 kg weight limit, 5 MB file limit)
- **Generated files stay outside the repo** - reports and user files created at runtime are excluded by [`.gitignore`](.gitignore:1); the `public/uploads` directory is kept by [`public/uploads/.gitkeep`](public/uploads/.gitkeep)
- **Error handling**: the 404 and 500 handlers render the [`error.pug`](views/error.pug:1) view

## 📝 Tips for developers

1. New route → add a file in `routes/` and mount it in [`app.js`](app.js:27).
2. New view → Pug template in `views/`, inheritance via `extends layout`.
3. Data change → a file in `data/`; exported as a module exporting an array.
4. Reports and user files never reach the repo - see the generated-files section in [`.gitignore`](.gitignore:18).

## 📄 License

Released under the **MIT** license - see the [`LICENSE`](LICENSE) file.

<div align="center">

**⬤⬤⬤** - *Ad astra per aspera*

</div>
