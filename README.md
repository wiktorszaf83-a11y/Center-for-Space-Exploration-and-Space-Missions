<div align="center">

# 🚀 Centrum Eksploracji Kosmosu

**Centrum Eksploracji Kosmosu i Misji Kosmicznych**

Aplikacja webowa o misjach kosmicznych, planetach Układu Słonecznego i astronautach — z interaktywnymi formularzami, generowaniem raportów i publicznym API.

*Node.js · Express · Pug · Multer · Vanilla JS*

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](#-szybki-start)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Pug](https://img.shields.io/badge/Pug-3.0-A5B6D2?style=flat-square&logo=pug&logoColor=white)](https://pugjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

**PL** · [English →](#english)

</div>

---

## ✨ Funkcje

| | Moduł | Co robi |
|---|---|---|
| 🛰️ | **Katalog misji** | 8 misji kosmicznych z opisem, załogą, kosztem, czasem trwania i statusem; podgląd szczegółów każdej misji (`/missions/:id`) |
| 🪐 | **Kalkulator wagi** | Oblicza wagę ciała na wszystkich 8 planetach na podstawie lokalnej grawitacji |
| 👩‍🚀 | **Rekrutacja astronautów** | Formularz zgłoszeniowy z walidacją (imię, e-mail, motywacja) i generowaniem unikalnego kodu kandydata |
| 📊 | **Generowanie raportów** | Pobranie raportu misji jako CSV i raportu planet jako TXT — pliki są tworzone dynamicznie w czasie żądania |
| 📁 | **Przesył plików** | Upload do 5 MB z filtrem typów (`jpeg`, `jpg`, `png`, `gif`, `pdf`, `txt`, `csv`) |
| 🔌 | **Publiczne API** | Endpointy JSON: statystyki planet i misji, lista astronautów, profil astronauty oraz endpoint `health` |

## 🧱 Stack technologiczny

- **Runtime**: Node.js **18+** (testowane na v22)
- **Serwer**: Express `^4.21`
- **Silnik widoków**: Pug `^3.0` — wspólny `layout.pug` i widoki dziedziczące po nim
- **Upload plików**: Multer `^1.4.5-lts.1` z `diskStorage`
- **Frontend**: Vanilla JS + CSS ze zmiennymi CSS (dark cosmic theme)
- **Zero zależności bazodanowych** — dane aplikacji to moduły CommonJS (`module.exports`) w katalogu [`data/`](data/)

## 📁 Struktura

```text
.
├── app.js                  # wejście aplikacji: Express, middleware, route'y
├── controllers/            # logika biznesowa (1 plik = 1 domena)
│   ├── homeController.js
│   ├── missionsController.js
│   ├── calculatorController.js
│   ├── recruitController.js
│   ├── reportsController.js
│   ├── uploadController.js
│   └── apiController.js
├── routes/                 # definicje tras (1 plik = 1 domena)
├── middleware/
│   └── logger.js           # logowanie żądań + weryfikacja nagłówka Referer
├── data/                   # dane aplikacji: misje, planety, astronauci
├── views/                  # szablony Pug (layout.pug + 9 widoków)
├── public/
│   ├── css/style.css
│   ├── js/main.js
│   └── uploads/            # katalog dla plików usera (.gitkeep utrzymuje go w repo)
└── .devcontainer/          # gotowe środowisko dev (Dev Containers)
```

> Wzorzec: **route → controller → data**. Każda domena ma własny plik tras i kontrolera, dzięki czemu trasy i logika są rozłączne.

## 🚀 Szybki start

```bash
# 1. Pobranie repozytorium
git clone https://github.com/wiktorszaf83-a11y/Center-for-Space-Exploration-and-Space-Missions.git
cd Center-for-Space-Exploration-and-Space-Missions

# 2. Instalacja zależności
npm install

# 3a. Uruchomienie produkcyjne
npm start

# 3b. Tryb dev z auto-reloadem (`node --watch`)
npm run dev
```

Otwórz → **http://localhost:3000**

Zmienne środowiskowe (opcjonalne):

| Zmienna | Domyślnie | Efekt |
|---|---|---|
| `PORT` | `3000` | port serwera |
| `NODE_ENV` | — | `production` włącza weryfikację nagłówka `Referer` w [`middleware/logger.js`](middleware/logger.js:18) |

## 🗺️ Trasy

| Metoda | Ścieżka | Widok / akcja |
|---|---|---|
| `GET` | `/` | Strona główna (ostatnie misje, aktywne misje, liczniki) |
| `GET` | `/missions` | Katalog misji |
| `GET` | `/missions/:id` | Szczegóły misji |
| `GET` `POST` | `/calculator` | Kalkulator wagi na planetach |
| `GET` `POST` | `/recruit` | Formularz rekrutacji astronautów |
| `GET` | `/reports` | Strona pobierania raportów |
| `GET` | `/reports/download-missions` | Pobranie raportu misji (CSV) |
| `GET` | `/reports/download-planets` | Pobranie raportu planet (TXT) |
| `GET` `POST` | `/upload` | Przesył pliku (limit 5 MB) |
| `GET` | `/astronauts/:code` | Profil astronauty |
| `GET` | `/health` | Status serwera (text/plain) |

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

## 🗂️ Dane w projekcie

- **8 misji**: Apollo 11, Voyager 1, Mars Perseverance, Teleskop Hubble'a, Apollo 13, James Webb, Artemis I, Mars Curiosity
- **8 planet**: Merkury, Wenus, Ziemia, Mars, Jowisz, Saturn, Uran, Neptun (grawitacja, księżyce, średnica, odległość od Słońca, typ)
- **5 astronautów**: Neil Armstrong, Buzz Aldrin, Sally Ride, Chris Hadfield, Marek Tomczyk (kod, narodowość, status, misje, loty, dni w kosmosie)

## 🛠️ Dobre praktyki zastosowane w kodzie

- **Warstwowa struktura** `routes/` → `controllers/` → `data/`, jedna domena na plik
- **Middleware** z logowaniem czasu wykonania żądania, kodu odpowiedzi i IP ([`requestLogger`](middleware/logger.js:1))
- **Walidacja po stronie serwera** dla kalkulatora i rekrutacji + **walidacja kliencka** w [`public/js/main.js`](public/js/main.js:1) (limit 1000 kg, limit 5 MB pliku)
- **Dynamiczne pliki poza repo** — raporty i pliki usera generowane w czasie działania są wykluczone przez [`.gitignore`](.gitignore:1); katalog `public/uploads` utrzymuje [`public/uploads/.gitkeep`](public/uploads/.gitkeep)
- **Obsługa błędów**: handler 404 i handler 500 renderują widok [`error.pug`](views/error.pug:1)

## 📝 Wskazówki dla osób rozwijających

1. Nowa trasa → dodaj plik w `routes/` i podłącz go w [`app.js`](app.js:27).
2. Nowy widok → szablon Pug w `views/`, dziedziczenie przez `extends layout`.
3. Zmiana danych → plik w `data/`; zwracany jako moduł eksportujący tablicę.
4. Raporty i pliki usera nie trafiają do repo — patrz sekcja plików generowanych w [`.gitignore`](.gitignore:18).

## 📄 Licencja

Wydane na licencji **MIT** — szczegóły w pliku [`LICENSE`](LICENSE).

---

<a id="english"></a>

## English

**Center for Space Exploration and Space Missions** is a Node.js/Express web application featuring space missions, the planets of the Solar System, and astronauts, with interactive forms, report generation, and a public API. Views are rendered with the Pug engine; file uploads are handled by Multer. It runs as a standard Node.js server with a layered structure: `routes` → `controllers` → `data`.

Quick start: `npm install` → `npm start` → open **http://localhost:3000**. Full documentation (in Polish) above.

<div align="center">

**⬤⬤⬤** — *Ad astra per aspera*

</div>
