const DOM = {
  menuItems: document.querySelectorAll(".category ul li"), //staviti klasu
  dashboardCards: document.getElementById("dashboardCards"),
  incomesSection: document.getElementById("incomesSection"),
  expensesSection: document.getElementById("expensesSection"),
  incomeForm: document.querySelector(".income-form"),
  expenseForm: document.querySelector(".expanse-form"),
};

function hideForms() {
  DOM.dashboardCards.classList.add("hidden");
  DOM.incomesSection.classList.add("hidden");
  DOM.expensesSection.classList.add("hidden");
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

function getTotalIncome() {
  let total = 0;

  for (let i = 0; i < state.incomes.length; i++) {
    total += state.incomes[i];
  }

  return total;
}

function getTotalExpense() {
  let total = 0;

  for (let i = 0; i < state.expenses.length; i++) {
    total += state.expenses[i];
  }

  return total;
}

function getBalance() {
  return getTotalIncome() - getTotalExpense();
}

const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const totalBalanceEl = document.getElementById("totalBalance");

// INCOME
const incomeAmountInput = DOM.incomeForm.querySelector(".income-amount");
const addIncomeBtn = DOM.incomeForm.querySelector(".add-income-btn");

// EXPENSE
const expenseAmountInput = DOM.expenseForm.querySelector(".expense-amount");
const addExpenseBtn = DOM.expenseForm.querySelector(".add-expense-btn");

function updateDashboard() {
  totalIncomeEl.textContent = `$${getTotalIncome()}`;
  totalExpenseEl.textContent = `$${getTotalExpense()}`;
  totalBalanceEl.textContent = `$${getBalance()}`;
}

addIncomeBtn.addEventListener("click", () => {
  const value = Number(incomeAmountInput.value);
  if (!value || value <= 0) return;

  state.incomes.push(value);
  updateDashboard();

  incomeAmountInput.value = "";
});

addExpenseBtn.addEventListener("click", () => {
  const value = Number(expenseAmountInput.value);
  if (!value || value <= 0) return;

  state.expenses.push(value);
  updateDashboard();

  expenseAmountInput.value = "";
});

updateDashboard();
