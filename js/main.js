// ==========================================================
// Interakcje strony Toyota Chaser JZX100 (czysty JavaScript)
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  inicjujMenuMobilne();
  inicjujModalGalerii();
  inicjujPrzyciskPowrotu();
  inicjujPasekPostepu();
  inicjujFiltryGalerii();
});

// ---------- 1. Menu mobilne (hamburger) ----------
function inicjujMenuMobilne() {
  const nawigacja = document.querySelector(".nawigacja");
  const przycisk = document.querySelector(".nawigacja__przycisk");
  const linki = document.querySelectorAll(".nawigacja__link");

  if (!nawigacja || !przycisk) return;

  // Ustawia stan menu i aktualizuje atrybuty dostępności
  const ustawMenu = (otwarte) => {
    nawigacja.classList.toggle("menu-aktywne", otwarte);
    przycisk.setAttribute("aria-expanded", String(otwarte));
    przycisk.setAttribute("aria-label", otwarte ? "Zamknij menu" : "Otwórz menu");
  };

  przycisk.addEventListener("click", () => {
    ustawMenu(!nawigacja.classList.contains("menu-aktywne"));
  });

  // Zamknięcie menu po wybraniu linku
  linki.forEach((link) => link.addEventListener("click", () => ustawMenu(false)));

  // Zamknięcie menu klawiszem Escape
  document.addEventListener("keydown", (zdarzenie) => {
    if (zdarzenie.key === "Escape" && nawigacja.classList.contains("menu-aktywne")) {
      ustawMenu(false);
      przycisk.focus();
    }
  });
}

// ---------- 2. Modal (lightbox) galerii ----------
function inicjujModalGalerii() {
  const modal = document.getElementById("modal-galerii");
  const miniatury = document.querySelectorAll(".galeria__zdjecie");

  if (!modal || miniatury.length === 0) return;

  const zdjecieModalu = modal.querySelector(".modal__zdjecie");
  const podpisModalu = modal.querySelector(".modal__podpis");
  const przyciskZamknij = modal.querySelector(".modal__zamknij");

  // Otwiera modal z wybranym zdjęciem i podpisem z atrybutu alt
  const otworzModal = (miniatura) => {
    zdjecieModalu.src = miniatura.src;
    zdjecieModalu.alt = miniatura.alt;
    podpisModalu.textContent = miniatura.alt;
    modal.showModal();
  };

  miniatury.forEach((miniatura) => {
    // Obsługa klawiaturą: miniatura dostępna klawiszem Tab
    miniatura.setAttribute("tabindex", "0");
    miniatura.setAttribute("role", "button");

    miniatura.addEventListener("click", () => otworzModal(miniatura));
    miniatura.addEventListener("keydown", (zdarzenie) => {
      if (zdarzenie.key === "Enter" || zdarzenie.key === " ") {
        zdarzenie.preventDefault();
        otworzModal(miniatura);
      }
    });
  });

  // Zamknięcie przyciskiem z krzyżykiem
  przyciskZamknij.addEventListener("click", () => modal.close());

  // Zamknięcie po kliknięciu w przyciemnione tło (poza zdjęciem)
  modal.addEventListener("click", (zdarzenie) => {
    if (zdarzenie.target === modal) modal.close();
  });

  // Klawisz Escape zamyka element <dialog> natywnie
}

// ---------- 3. Przycisk powrotu na górę ----------
function inicjujPrzyciskPowrotu() {
  const przycisk = document.querySelector(".przycisk-gora");
  const PROG_PRZEWINIECIA = 300;

  if (!przycisk) return;

  // Pokazuje przycisk po przewinięciu strony o co najmniej 300 px
  const aktualizujWidocznosc = () => {
    przycisk.classList.toggle("przycisk-gora--widoczny", window.scrollY >= PROG_PRZEWINIECIA);
  };

  window.addEventListener("scroll", aktualizujWidocznosc, { passive: true });
  aktualizujWidocznosc();

  przycisk.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---------- 4. Pasek postępu przewijania ----------
function inicjujPasekPostepu() {
  const pasek = document.querySelector(".pasek-postepu");

  if (!pasek) return;

  // Oblicza procent przewinięcia strony i ustawia szerokość paska
  const aktualizujPasek = () => {
    const maksimum = document.documentElement.scrollHeight - window.innerHeight;
    const procent = maksimum > 0 ? (window.scrollY / maksimum) * 100 : 0;
    pasek.style.width = `${procent}%`;
  };

  window.addEventListener("scroll", aktualizujPasek, { passive: true });
  window.addEventListener("resize", aktualizujPasek);
  aktualizujPasek();
}

// ---------- 5. Filtrowanie galerii ----------
function inicjujFiltryGalerii() {
  const przyciski = document.querySelectorAll(".filtry__przycisk");
  const kafelki = document.querySelectorAll(".galeria__element");
  const CZAS_ANIMACJI = 300;

  if (przyciski.length === 0) return;

  // Ukrywa nagłówek i siatkę, jeśli nie ma w niej widocznych zdjęć
  const aktualizujGrupy = () => {
    document.querySelectorAll(".galeria").forEach((siatka) => {
      const pusta = !siatka.querySelector(".galeria__element:not(.galeria__element--ukryty)");
      siatka.classList.toggle("galeria--ukryta", pusta);
      const naglowek = siatka.previousElementSibling;
      if (naglowek && naglowek.classList.contains("galeria__naglowek")) {
        naglowek.classList.toggle("galeria__naglowek--ukryty", pusta);
      }
    });
  };

  const filtruj = (kategoria) => {
    kafelki.forEach((kafelek) => {
      const pasuje = kategoria === "wszystkie" || kafelek.dataset.category === kategoria;

      if (pasuje) {
        // Pokazanie kafelka z płynnym wejściem
        kafelek.classList.remove("galeria__element--ukryty");
        requestAnimationFrame(() => kafelek.classList.remove("galeria__element--znika"));
      } else {
        // Płynne zniknięcie, a potem usunięcie z układu
        kafelek.classList.add("galeria__element--znika");
        setTimeout(() => {
          if (kafelek.classList.contains("galeria__element--znika")) {
            kafelek.classList.add("galeria__element--ukryty");
            aktualizujGrupy();
          }
        }, CZAS_ANIMACJI);
      }
    });
    aktualizujGrupy();
  };

  przyciski.forEach((przycisk) => {
    przycisk.addEventListener("click", () => {
      przyciski.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-pressed", "false");
      });
      przycisk.classList.add("active");
      przycisk.setAttribute("aria-pressed", "true");
      filtruj(przycisk.dataset.filter);
    });
  });
}
