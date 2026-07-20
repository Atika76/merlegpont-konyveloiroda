(() => {
  "use strict";

  const body = document.body;
  const page = body.dataset.page;
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  const SAFETY_TEXT = "Ez egy bemutató ügyfélsegítő alkalmazás. Nem minősül könyvelési, adózási vagy jogi tanácsadásnak. Valós vagy érzékeny adatot ne adj meg.";

  document.querySelectorAll("[data-nav]").forEach(link => {
    if (link.dataset.nav === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
    if (link.dataset.nav === "contact") link.textContent = "A demóról";
  });

  const utility = document.querySelector(".utility-inner");
  if (utility) {
    utility.innerHTML = "<span>Nyilvánosan kipróbálható bemutató ügyfélsegítő • nincs adatküldés</span>";
  }

  const header = document.querySelector(".site-header");
  if (header && !document.querySelector(".demo-safety")) {
    const notice = document.createElement("aside");
    notice.className = "demo-safety";
    notice.setAttribute("role", "note");
    notice.innerHTML = `<div class="container"><strong>Bemutató alkalmazás</strong><span>${SAFETY_TEXT}</span></div>`;
    header.insertAdjacentElement("afterend", notice);
  }

  const footerInfo = document.querySelector(".footer-grid > div:last-child");
  if (footerInfo) {
    footerInfo.innerHTML = `<h3>Fontos</h3><p class="footer-note">${SAFETY_TEXT}</p>`;
  }
  const copyright = document.querySelector(".copyright");
  if (copyright) copyright.textContent = "© 2026 MérlegPont – bemutató ügyfélsegítő webalkalmazás.";

  menuBtn?.addEventListener("click", () => {
    const open = body.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Menü bezárása" : "Menü megnyitása");
    menuBtn.textContent = open ? "✕" : "☰";
  });

  nav?.addEventListener("click", event => {
    if (!event.target.closest("a")) return;
    body.classList.remove("menu-open");
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Menü megnyitása");
      menuBtn.textContent = "☰";
    }
  });

  document.querySelectorAll(".faq button").forEach(button => {
    if (button.textContent.includes("űrlapja valódi üzenetet")) {
      button.innerHTML = "Milyen adatot tárol a bemutató alkalmazás?<span>+</span>";
      const answer = button.closest(".faq")?.querySelector(".content");
      if (answer) answer.textContent = "Csak a kiválasztott vállalkozási formát és a jelölőnégyzetek állapotát tárolja a saját böngésződ localStorage tárhelyén. Személyes vagy érzékeny adatot nem kér és nem küld szerverre.";
    }
  });

  if (page === "services") {
    const cta = document.querySelector("main .cta");
    if (cta) {
      const title = cta.querySelector("h2");
      const text = cta.querySelector("p");
      const link = cta.querySelector("a");
      if (title) title.textContent = "Nézd meg működés közben az ügyfélsegítőt";
      if (text) text.textContent = "Válassz vállalkozási formát, majd próbáld ki a változó havi dokumentumlistát.";
      if (link) {
        link.href = "dokumentumlista.html";
        link.textContent = "Demó kipróbálása";
      }
    }
  }

  document.querySelectorAll(".faq").forEach((faq, index) => {
    const btn = faq.querySelector("button");
    const content = faq.querySelector(".content");
    if (!btn || !content) return;
    const contentId = `faq-content-${index + 1}`;
    content.id = contentId;
    btn.setAttribute("aria-controls", contentId);
    btn.setAttribute("aria-expanded", String(faq.classList.contains("open")));
    btn.addEventListener("click", () => {
      const open = faq.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  const CHECKLISTS = {
    egyeni: {
      label: "Egyéni vállalkozó",
      items: [
        ["sales-invoices", "Kimenő számlák", "Az adott hónapban kiállított és módosított számlák áttekintése."],
        ["purchase-invoices", "Bejövő számlák", "A vállalkozási tevékenységhez kapcsolódó költségek bizonylatai."],
        ["bank-statements", "Bankszámlakivonatok", "A vállalkozói pénzforgalomhoz kapcsolódó havi kivonatok."],
        ["cash-records", "Készpénzes bizonylatok", "A készpénzes bevételek és kiadások bizonylatainak összekészítése."],
        ["contracts", "Új vagy módosított szerződések", "Az adott hónapban létrejött, megszűnt vagy módosított megállapodások."],
        ["official-notices", "Hivatalos értesítések", "A vállalkozással kapcsolatos új hatósági vagy önkormányzati levelek jelzése."],
        ["changes", "Vállalkozási változások", "Székhely, tevékenység, bankszámla vagy más nyilvántartott adat változása."]
      ]
    },
    atalanyadozo: {
      label: "Átalányadózó",
      items: [
        ["sales-invoices", "Havi bevételi bizonylatok", "A hónapban kiállított minden számla és nyugta összesítése."],
        ["income-record", "Bevételi nyilvántartás", "A havi bevételek naprakész, ellenőrizhető összesítése."],
        ["bank-statements", "Bankszámlakivonatok", "A vállalkozáshoz kapcsolódó pénzmozgások havi kivonatai."],
        ["status-changes", "Jogviszonyt érintő változások", "Például új munkaviszony, szünetelés vagy más körülmény megváltozása."],
        ["employment", "Foglalkoztatással kapcsolatos adatok", "Csak akkor jelöld, ha a vállalkozás munkavállalót foglalkoztat; adatot ide ne írj."],
        ["official-notices", "Hivatalos értesítések", "Az új hatósági vagy önkormányzati levelek jelzése."],
        ["threshold-check", "Bevételi határok áttekintése", "A saját nyilvántartás alapján ellenőrizd, szükséges-e szakemberrel egyeztetni."]
      ]
    },
    bt: {
      label: "Betéti társaság",
      items: [
        ["sales-invoices", "Kimenő számlák", "Az adott hónapban kiállított és módosított számlák."],
        ["purchase-invoices", "Bejövő számlák", "Beszerzések, szolgáltatások és költségek bizonylatai."],
        ["bank-statements", "Bank- és pénztáranyag", "Bankszámlakivonatok, pénztárbizonylatok és kapcsolódó összesítők."],
        ["contracts", "Szerződések és tagi változások", "Új vagy módosított szerződések, illetve a társaság működését érintő változások jelzése."],
        ["payroll", "Bérszámfejtési változások", "Belépő, kilépő, szabadság vagy egyéb havi változás jelzése, érzékeny adat megadása nélkül."],
        ["asset-changes", "Eszközbeszerzések és értékesítések", "A tartós használatra vásárolt vagy eladott eszközök bizonylatai."],
        ["official-notices", "Hivatalos értesítések", "Az új hatósági, önkormányzati vagy kamarai levelek jelzése."],
        ["inventory", "Készletet érintő változások", "Ha releváns, a készletmozgásokhoz kapcsolódó összesítők előkészítése."]
      ]
    },
    kft: {
      label: "Korlátolt felelősségű társaság",
      items: [
        ["sales-invoices", "Kimenő számlák", "Az adott hónapban kiállított és módosított számlák."],
        ["purchase-invoices", "Bejövő számlák", "Beszerzések, szolgáltatások és költségek bizonylatai."],
        ["bank-statements", "Bank- és pénztáranyag", "Minden üzleti bankszámla kivonata és a pénztárhoz kapcsolódó bizonylatok."],
        ["contracts", "Új vagy módosított szerződések", "Vevői, szállítói, bérleti, hitel- és egyéb megállapodások változásai."],
        ["payroll", "Bérszámfejtési változások", "A foglalkoztatást érintő havi változások jelzése, személyes adatok megadása nélkül."],
        ["asset-changes", "Tárgyi eszközök változásai", "Beszerzések, értékesítések, selejtezések és üzembe helyezések bizonylatai."],
        ["member-decisions", "Taggyűlési vagy vezetői döntések", "A könyvelést érintő új határozatok és tulajdonosi változások jelzése."],
        ["official-notices", "Hivatalos értesítések", "Az új hatósági, önkormányzati vagy kamarai levelek jelzése."],
        ["accruals", "Időszakot érintő egyéb tételek", "Előlegek, hitelek, támogatások vagy más külön egyeztetendő tételek jelzése."]
      ]
    }
  };

  const checklist = document.querySelector("[data-dynamic-checklist]");
  const businessType = document.querySelector("#businessType");

  if (checklist && businessType) {
    const STORAGE_KEY = "merlegpont_demo_checklists_v1";
    const TYPE_KEY = "merlegpont_demo_business_type";
    const progressBar = document.querySelector(".progress span");
    const progressLabel = document.querySelector(".progress-label");
    const listTitle = document.querySelector("[data-list-title]");

    const loadAllStates = () => {
      try {
        const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        return value && typeof value === "object" ? value : {};
      } catch {
        return {};
      }
    };

    const saveAllStates = states => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(states)); } catch {}
    };

    const updateDownloadLink = () => {
      const link = document.querySelector("[data-download-checklist]");
      const selected = CHECKLISTS[businessType.value];
      if (!link || !selected) return;
      const lines = [
        "MérlegPont – bemutató havi dokumentumlista",
        `Vállalkozási forma: ${selected.label}`,
        "------------------------------------------------",
        ""
      ];
      checklist.querySelectorAll("input[type='checkbox']").forEach(box => {
        const title = box.closest(".check-item")?.querySelector("strong")?.textContent || "Tétel";
        lines.push(`${box.checked ? "[x]" : "[ ]"} ${title}`);
      });
      lines.push("", SAFETY_TEXT);
      link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(lines.join("\n"))}`;
      link.download = `merlegpont-${businessType.value}-dokumentumlista.txt`;
    };

    const updateProgress = () => {
      const boxes = [...checklist.querySelectorAll("input[type='checkbox']")];
      const done = boxes.filter(box => box.checked).length;
      const percent = boxes.length ? Math.round(done / boxes.length * 100) : 0;
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (progressLabel) progressLabel.textContent = `Készültség: ${done}/${boxes.length} (${percent}%)`;
      updateDownloadLink();
    };

    const persistCurrent = () => {
      const type = businessType.value;
      if (!CHECKLISTS[type]) return;
      const states = loadAllStates();
      states[type] = {};
      checklist.querySelectorAll("input[type='checkbox']").forEach(box => {
        states[type][box.dataset.itemId] = box.checked;
      });
      saveAllStates(states);
      try { localStorage.setItem(TYPE_KEY, type); } catch {}
    };

    const renderChecklist = () => {
      const selected = CHECKLISTS[businessType.value];
      if (!selected) return;
      const states = loadAllStates()[businessType.value] || {};
      checklist.innerHTML = selected.items.map(([id, title, description]) => `
        <label class="check-item">
          <input type="checkbox" data-item-id="${id}" ${states[id] ? "checked" : ""}>
          <span><strong>${title}</strong><small>${description}</small></span>
        </label>`).join("");
      if (listTitle) listTitle.textContent = `${selected.label} – havi ellenőrzőlista`;
      checklist.querySelectorAll("input[type='checkbox']").forEach(box => {
        box.addEventListener("change", () => {
          persistCurrent();
          updateProgress();
        });
      });
      updateProgress();
    };

    let savedType = "";
    try { savedType = localStorage.getItem(TYPE_KEY) || ""; } catch {}
    if (CHECKLISTS[savedType]) businessType.value = savedType;

    businessType.addEventListener("change", () => {
      try { localStorage.setItem(TYPE_KEY, businessType.value); } catch {}
      renderChecklist();
    });

    document.querySelector("[data-clear-checklist]")?.addEventListener("click", () => {
      checklist.querySelectorAll("input[type='checkbox']").forEach(box => { box.checked = false; });
      persistCurrent();
      updateProgress();
    });

    renderChecklist();
  }

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
  }
})();
