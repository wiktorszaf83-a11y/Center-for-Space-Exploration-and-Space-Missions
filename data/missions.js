const missions = [
  {
    id: "apollo-11",
    name: "Apollo 11",
    destination: "Księżyc",
    year: 1969,
    status: "Zakończona",
    description: "Pierwsza załogowa misja, która wylądowała na Księżycu. Neil Armstrong i Buzz Aldrin stąpali po Księżycu 20 lipca 1969 roku.",
    crew: ["Neil Armstrong", "Buzz Aldrin", "Michael Collins"],
    duration: "8 dni, 3 godziny, 18 minut",
    cost: "1,2 mld USD",
    image: "🌙"
  },
  {
    id: "voyager-1",
    name: "Voyager 1",
    destination: "Układ Słoneczny i przestrzeń międzygwiezdna",
    year: 1977,
    status: "Aktywna",
    description: "Sonda kosmiczna wystrzelona 5 września 1977 roku. Najdalej oddalony od Ziemi obiekt stworzony przez człowieka.",
    crew: [],
    duration: "47+ lat w locie",
    cost: "828 mln USD",
    image: "🛰️"
  },
  {
    id: "mars-perseverance",
    name: "Mars Perseverance",
    destination: "Mars",
    year: 2020,
    status: "Aktywna",
    description: "Zjazdowy łazik NASA, który wylądował na Marsie 18 lutego 2021 roku w celu poszukiwania śladów życia i zbierania próbek.",
    crew: [],
    duration: "4+ lata na Marsie",
    cost: "2,7 mld USD",
    image: "🔴"
  },
  {
    id: "hubble",
    name: "Teleskop Hubble",
    destination: "Orbita okołoziemska",
    year: 1990,
    status: "Aktywna",
    description: "Wielki teleskop kosmiczny umieszczony na orbicie okołoziemskiej. Zmienił nasze zrozumienie Wszechświata.",
    crew: [],
    duration: "34+ lat obserwacji",
    cost: "4,7 mld USD",
    image: "🔭"
  },
  {
    id: "apollo-13",
    name: "Apollo 13",
    destination: "Księżyc",
    year: 1970,
    status: "Zakończona",
    description: "Trzecia załogowa misja na Księżyc, która ostatecznie nie wylądowała z powodu awarii modułu serwisowego. Załoga bezpiecznie wróciła na Ziemię.",
    crew: ["James Lovell", "Jack Swigert", "Fred Haise"],
    duration: "5 dni, 22 godziny, 54 minuty",
    cost: "1,2 mld USD",
    image: "🌙"
  },
  {
    id: "james-webb",
    name: "James Webb Space Telescope",
    destination: "Orbita L2 (Lagrange'a)",
    year: 2021,
    status: "Aktywna",
    description: "Największy i najpotężniejszy teleskop kosmiczny, zastąpił Hubble'a. Obserwuje Wszechświat w podczerwieni.",
    crew: [],
    duration: "3+ lata obserwacji",
    cost: "10 mld USD",
    image: "✨"
  },
  {
    id: "artemis-1",
    name: "Artemis I",
    destination: "Księżyc",
    year: 2022,
    status: "Zakończona",
    description: "Niezałogowy przelot wokół Księżyca, pierwszy test systemu SLS i kapsuły Orion. Kluczowy krok do powrotu ludzi na Księżyc.",
    crew: [],
    duration: "25 dni, 7 godzin, 18 minut",
    cost: "28 mld USD",
    image: "🚀"
  },
  {
    id: "curiosity",
    name: "Mars Curiosity",
    destination: "Mars",
    year: 2011,
    status: "Aktywna",
    description: "Łazik wielkości samochodu, który wylądował na Marsie 6 sierpnia 2012 roku. Badaje geologię i klimat Marsa.",
    crew: [],
    duration: "12+ lat na Marsie",
    cost: "2,5 mld USD",
    image: "🔴"
  }
];

module.exports = missions;