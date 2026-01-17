const DOM = {
  menuItems: document.querySelectorAll(".category ul li"),
  dashboardSection: document.getElementById("dashboardSection"),
  incomesSection: document.getElementById("incomesSection"),
  expensesSection: document.getElementById("expensesSection"),
};

function hideAllSections() {
  DOM.dashboardSection.classList.add("hidden");
  DOM.incomesSection.classList.add("hidden");
  DOM.expensesSection.classList.add("hidden");
}

DOM.menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    DOM.menuItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");

    hideAllSections();

    const text = item.textContent.toLowerCase();

    if (text.includes("dashboard")) {
      DOM.dashboardSection.classList.remove("hidden");
    }

    if (text.includes("incomes")) {
      DOM.incomesSection.classList.remove("hidden");
    }

    if (text.includes("expenses")) {
      DOM.expensesSection.classList.remove("hidden");
    }
  });
});

function hideAllSections() {
  DOM.dashboardSection.classList.add("hidden");
  DOM.incomesSection.classList.add("hidden");
  DOM.expensesSection.classList.add("hidden");
  DOM.historyPanel.classList.add("hidden");
}
