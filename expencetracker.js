const DOM = {
  menuItems: document.querySelectorAll(".category ul li"),
  dashboardCards: document.getElementById("dashboardCards"),
  incomesSection: document.getElementById("incomesSection"),
  expensesSection: document.getElementById("expensesSection"),
};

function hideForms() {
  DOM.dashboardCards.classList.add("hidden");
  DOM.incomesSection.classList.add("hidden");
  DOM.expensesSection.classList.add("hidden");
}

DOM.menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    DOM.menuItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");

    const text = item.textContent.toLowerCase();

    hideForms();

    if (text.includes("dashboard")) {
      DOM.dashboardCards.classList.remove("hidden");
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
};

const getTotalIncome = () => state.incomes.reduce((sum, v) => sum + v, 0);

const getTotalExpense = () => state.expenses.reduce((sum, v) => sum + v, 0);

const getBalance = () => getTotalIncome() - getTotalExpense();

const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const totalBalanceEl = document.getElementById("totalBalance");

const incomeAmountInput = document.querySelector(
  "#incomesSection input[type='number']",
);
const addIncomeBtn = document.querySelector("#incomesSection .add-income-btn");

const expenseAmountInput = document.querySelector(
  "#expensesSection input[type='number']",
);
const addExpenseBtn = document.querySelector(
  "#expensesSection .add-income-btn",
);

function updateUI() {
  totalIncomeEl.textContent = `$${getTotalIncome()}`;
  totalExpenseEl.textContent = `$${getTotalExpense()}`;
  totalBalanceEl.textContent = `$${getBalance()}`;
}

addIncomeBtn.addEventListener("click", () => {
  const value = Number(incomeAmountInput.value);
  if (!value || value <= 0) return;

  state.incomes.push(value);
  updateUI();

  incomeAmountInput.value = "";
});

addExpenseBtn.addEventListener("click", () => {
  const value = Number(expenseAmountInput.value);
  if (!value || value <= 0) return;

  state.expenses.push(value);
  updateUI();

  expenseAmountInput.value = "";
});

updateUI();
