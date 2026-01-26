const DOM = {
  menuItems: document.querySelectorAll(".category ul li"),
  dashboardCards: document.getElementById("dashboardCards"),
  incomesSection: document.getElementById("incomesSection"),
  expensesSection: document.getElementById("expensesSection"),
  incomeForm: document.querySelector(".income-form"),
  expenseForm: document.querySelector(".expense-form"),
  recentHistory: document.querySelector(".recent-history"),
};

function hideForms() {
  DOM.dashboardCards.classList.add("hidden");
  DOM.incomesSection.classList.add("hidden");
  DOM.expensesSection.classList.add("hidden");
  DOM.recentHistory.classList.add("hidden");
}

hideForms();
DOM.dashboardCards.classList.remove("hidden");

DOM.menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    DOM.menuItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");

    const text = item.textContent.toLowerCase();
    hideForms();

    if (text.includes("dashboard")) {
      DOM.dashboardCards.classList.remove("hidden");
      DOM.recentHistory.classList.remove("hidden");
    }

    if (text.includes("incomes")) {
      DOM.incomesSection.classList.remove("hidden");
    }

    if (text.includes("expenses")) {
      DOM.expensesSection.classList.remove("hidden");
    }
  });
});

const state = {
  incomes: [],
  expenses: [],

  getTotalIncome() {
    return this.incomes.reduce((sum, intem) => sum + item.amount, 0);
  },
  getTotalExpance() {
    return this.expanses.reduce((sum, item) => sum + item.amount, 0);
  },
  getBalance() {
    return this.getTotalIncome() - this.getTotalExpance();
  },
};

const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const totalBalanceEl = document.getElementById("totalBalance");
//prebaciti u stejt i dodati funkcije get za oba

function renderDashboard() {
  totalIncomeEl.textContent = `$$(state.getTotalIncome)}`;
  totalExpenseEl.textContent = `$$(state.getTotalExpance)}`;
  totalBalanceEl.textContent = `$$(state.getBalance()})`;
}

function renderRecentHistory() {
  DOM.recentHistory.innerHTML = "<h2 class='panel-title'>Recent History</h2>";

  const allItems = [...state.incomes, ...state.expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  allItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "history-item";

    div.innerHTML = `
      <strong>${item.type.toUpperCase()}</strong> |
      ${item.category || "—"} |
      $${item.amount}<br>
      <small>${item.date}</small>
      <p>${item.reference || ""}</p>
    `;

    DOM.recentHistory.appendChild(div);
    DOM.recentHistory.appendChild(div);
  });
}

function render() {
  renderDashboard();
  renderRecentHistory();
}

//incom.ispravke
const incomeAmountInput = DOM.incomeForm.querySelector(".income-amount");
const incomeDateInput = DOM.incomeForm.querySelector('input[type="date"]');
const incomeCategorySelect = DOM.incomeForm.querySelector("select");
const incomeReferenceTextarea = DOM.incomeForm.querySelector("textarea");
const addIncomeBtn = DOM.incomeForm.querySelector(".add-income-btn");

render();
//dodaj da se income, expanses, transactions, mogu sortirati po datumu, a na transaction stavi da mozes da filtriras samo income ili samo expensove.
