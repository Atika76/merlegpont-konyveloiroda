(() => {
  const body = document.body;
  const page = body.dataset.page;
  const nav = document.querySelector(".nav");
  const menuBtn = document.querySelector(".menu-btn");

  document.querySelectorAll("[data-nav]").forEach(link => {
    if (link.dataset.nav === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "✕" : "☰";
    });
  }

  document.querySelectorAll(".faq button").forEach(btn => {
    btn.addEventListener("click", () => {
      const faq = btn.closest(".faq");
      faq.classList.toggle("open");
    });
  });

  const checklist = document.querySelector("[data-checklist]");
  if (checklist) {
    const key = checklist.dataset.checklist;
    const boxes = [...checklist.querySelectorAll("input[type='checkbox']")];
    const progressFill = document.querySelector(".progress span");
    const progressLabel = document.querySelector(".progress-label");

    try {
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      boxes.forEach((box, i) => box.checked = !!saved[i]);
    } catch {}

    function updateProgress() {
      const states = boxes.map(b => b.checked);
      try { localStorage.setItem(key, JSON.stringify(states)); } catch {}
      const done = states.filter(Boolean).length;
      const total = states.length || 1;
      const percent = Math.round(done / total * 100);
      if (progressFill) progressFill.style.width = percent + "%";
      if (progressLabel) progressLabel.textContent = `Készültség: ${done}/${total} (${percent}%)`;
    }

    boxes.forEach(box => box.addEventListener("change", updateProgress));
    updateProgress();

    const clearBtn = document.querySelector("[data-clear-checklist]");
    clearBtn?.addEventListener("click", () => {
      boxes.forEach(b => b.checked = false);
      updateProgress();
    });

    const downloadBtn = document.querySelector("[data-download-checklist]");
    downloadBtn?.addEventListener("click", () => {
      const lines = ["MérlegPont Könyvelőiroda – Dokumentumlista", "-------------------------------------------", ""];
      boxes.forEach(box => {
        const label = box.closest(".check-item").querySelector("strong")?.textContent || "Tétel";
        lines.push(`${box.checked ? "[x]" : "[ ]"} ${label}`);
      });
      const blob = new Blob([lines.join("\n")], {type: "text/plain;charset=utf-8"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merlegpont-dokumentumlista.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  const callbackForm = document.querySelector("#callbackForm");
  const status = document.querySelector(".status");
  callbackForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!callbackForm.reportValidity()) return;
    const data = Object.fromEntries(new FormData(callbackForm).entries());
    try {
      localStorage.setItem("merlegpont_callback", JSON.stringify(data));
    } catch {}
    if (status) {
      status.classList.add("show");
      status.textContent = "Köszönjük! Ez egy bemutató űrlap, az adatokat helyben mentettük ebben a böngészőben. Valódi e-mail nem lett elküldve.";
    }
    callbackForm.reset();
  });
})();