# Toyota Chaser JZX100 – Prezentacja modelu i specyfikacja techniczna

**Wersja live (GitHub Pages):** https://Wikqtoq.github.io/toyota-chaser-jzx100/

## Opis projektu

Responsywna strona internetowa poświęcona Toyocie Chaser JZX100 w wersji Tourer V z silnikiem 1JZ-GTE. Strona przedstawia historię generacji X100 (1996–2001), charakter auta jako sportowego sedana z napędem na tylne koła, jego miejsce w kulturze driftu (D1GP), dane techniczne, galerię zdjęć konkretnego egzemplarza i innych aut oraz sekcję najczęściej zadawanych pytań.

Projekt wykonano jako pracę zaliczeniową z tworzenia stron internetowych.

## Wykorzystane technologie

- Semantyczny HTML5
- CSS3 (Grid, Flexbox, Media Queries)
- Vanilla JavaScript (ES6+)
- Git & GitHub Pages

## Zrealizowane funkcjonalności JavaScript

- **Responsywne menu hamburger** – rozwijane na ekranach do 768 px, z dynamiczną zmianą atrybutu `aria-expanded`, zamykane po wybraniu linku lub klawiszem Escape.
- **Modal / lightbox galerii** – powiększanie zdjęć z podpisem pobieranym z atrybutu `alt`, obsługa klawiaturą (Tab, Enter, Escape), zamykanie krzyżykiem lub kliknięciem w tło.
- **Przycisk Scroll to Top** – pojawia się po przewinięciu strony o 300 px i płynnie przewija stronę na górę.

## Struktura katalogów

```
toyota-chaser-jzx100/
├── index.html        # struktura strony
├── README.md         # dokumentacja projektu
├── .gitignore
├── css/
│   └── style.css     # style, układ i responsywność
├── js/
│   └── main.js       # interakcje strony
└── assets/
    └── img/          # zdjęcia do galerii
```

## Uruchomienie lokalne

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/Wikqtoq/toyota-chaser-jzx100.git
   cd toyota-chaser-jzx100
   ```
2. Otwórz plik `index.html` w przeglądarce albo uruchom prosty serwer lokalny:
   ```bash
   python3 -m http.server 8000
   ```
   i wejdź na `http://localhost:8000`.

## Autor

Wiktor Ochałek, 2026
