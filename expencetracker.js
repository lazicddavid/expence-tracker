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
};

const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const totalBalanceEl = document.getElementById("totalBalance");

function renderDashboard() {
  let totalIncome = 0;
  let totalExpense = 0;

  state.incomes.forEach((item) => {
    totalIncome += item.amount;
  });

  state.expenses.forEach((item) => {
    totalExpense += item.amount;
  });

  totalIncomeEl.textContent = `$${totalIncome}`;
  totalExpenseEl.textContent = `$${totalExpense}`;
  totalBalanceEl.textContent = `$${totalIncome - totalExpense}`;
}

function render() {
  renderDashboard();
}

function updateDashboard() {
  const totalIncome = state.incomes.reduce((sum, val) => sum + val, 0);
  const totalExpenses = state.expenses.reduce((sum, val) => sum + val, 0);
  const balance = totalIncome - totalExpenses;

  totalIncomeEl.textContent = `$${totalIncome}`;
  totalExpensesEl.textContent = `$${totalExpenses}`;
  totalBalanceEl.textContent = `$${balance}`;
}

const incomeAmountInput = DOM.incomeForm.querySelector(".income-amount");
const addIncomeBtn = DOM.incomeForm.querySelector(".add-income-btn");

const expenseAmountInput = DOM.expenseForm.querySelector(".expense-amount");
const addExpenseBtn = DOM.expenseForm.querySelector(".add-expense-btn");

addIncomeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Number(incomeAmountInput.value);
  if (!amount || amount <= 0) return;

  state.incomes.push({
    amount,
    date: new Date().toLocaleDateString(),
    type: "income",
  });

  render();
  incomeAmountInput.value = "";
});

addExpenseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Number(expenseAmountInput.value);
  if (!amount || amount <= 0) return;

  state.expenses.push({
    amount,
    date: new Date().toLocaleDateString(),
    type: "expense",
  });

  render();
  expenseAmountInput.value = "";
});

render();
