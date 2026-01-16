const DOM = {
  incomes: document.querySelector(".incomes"),
  menuItems: document.querySelectorAll(".category ul li"),
  dashboardSection: document.querySelector(".incomes-section"),
};

DOM.menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    DOM.menuItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");

    if (item.textContent.includes("incomes")) {
      DOM.dashboardSection.classList.add("hidden");
      DOM.dashboardSection.classList.remove("hidden");
    }
  });
});
