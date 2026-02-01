const DOM = {
  menuItems: document.querySelectorAll(".category ul li"),
  dashboardCards: document.getElementById("dashboardCards"),
  incomesSection: document.getElementById("incomesSection"),
  expensesSection: document.getElementById("expensesSection"),
  incomeForm: document.querySelector(".income-form"),
  expenseForm: document.querySelector(".expense-form"),
  recentHistory: document.querySelector(".recent-history"),
  transactionControls: document.querySelector(".transaction-controls"),

  incomeAmountInput: document.querySelector(".income-amount"),
  incomeDateInput: document.querySelector(".income-date"),
  incomeCategorySelect: document.querySelector(".income-form select"),
  incomeReferenceTextarea: document.querySelector(".income-form textarea"),
  addIncomeBtn: document.querySelector(".add-income-btn"),
  incomePreview: document.querySelector(".income-preview"),

  expenseAmountInput: document.querySelector(".expense-amount"),
  expenseDateInput: document.querySelector(".expense-date"),
  expenseCategorySelect: document.querySelector(".expense-form select"),
  expenseReferenceTextarea: document.querySelector(".expense-form textarea"),
  addExpenseBtn: document.querySelector(".add-expense-btn"),
  expensePreview: document.querySelector(".expense-preview"),
  sortSelect: document.getElementById("sortOrder"),
};

function hideForms() {
  DOM.dashboardCards.classList.add("hidden");
  DOM.incomesSection.classList.add("hidden");
  DOM.expensesSection.classList.add("hidden");
  DOM.recentHistory.classList.add("hidden");
  if (DOM.transactionControls) DOM.transactionControls.classList.add("hidden");
}

hideForms();
DOM.dashboardCards.classList.remove("hidden");
DOM.recentHistory.classList.remove("hidden");
if (DOM.transactionControls) DOM.transactionControls.classList.remove("hidden");

DOM.menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    DOM.menuItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");

    const text = item.textContent.toLowerCase();
    hideForms();

    if (text.includes("dashboard")) {
      DOM.dashboardCards.classList.remove("hidden");
      DOM.recentHistory.classList.remove("hidden");
      if (DOM.transactionControls)
        DOM.transactionControls.classList.remove("hidden");
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
  sortOrder: "newest",

  getTotalIncome() {
    return this.incomes.reduce((s, i) => s + i.amount, 0);
  },
  getTotalExpense() {
    return this.expenses.reduce((s, i) => s + i.amount, 0);
  },
  getBalance() {
    return this.getTotalIncome() - this.getTotalExpense();
  },
};

let incomeDraft = { amount: 0, date: "", category: "", reference: "" };
let expenseDraft = { amount: 0, date: "", category: "", reference: "" };

const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const totalBalanceEl = document.getElementById("totalBalance");

function renderDashboard() {
  totalIncomeEl.textContent = `$${state.getTotalIncome()}`;
  totalExpenseEl.textContent = `$${state.getTotalExpense()}`;
  totalBalanceEl.textContent = `$${state.getBalance()}`;
}

function compareByDate(a, b) {
  if (state.sortOrder === "oldest") {
    if (a.date > b.date) return 1;
    if (a.date < b.date) return -1;
  } else {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
  }
  return 0;
}

function getAllTransactions() {
  return state.incomes.concat(state.expenses);
}

function renderIncomePreview() {
  if (!DOM.incomePreview) return;
  DOM.incomePreview.innerHTML = "";
  if (!incomeDraft.amount) return;

  DOM.incomePreview.innerHTML = `
    <p><strong>Amount:</strong> $${incomeDraft.amount}</p>
    <p><strong>Date:</strong> ${incomeDraft.date || "-"}</p>
    <p><strong>Category:</strong> ${incomeDraft.category || "-"}</p>
    <p><strong>Note:</strong> ${incomeDraft.reference || "-"}</p>
  `;
}

function renderExpensePreview() {
  if (!DOM.expensePreview) return;
  DOM.expensePreview.innerHTML = "";
  if (!expenseDraft.amount) return;

  DOM.expensePreview.innerHTML = `
    <p><strong>Amount:</strong> $${expenseDraft.amount}</p>
    <p><strong>Date:</strong> ${expenseDraft.date || "-"}</p>
    <p><strong>Category:</strong> ${expenseDraft.category || "-"}</p>
    <p><strong>Note:</strong> ${expenseDraft.reference || "-"}</p>
  `;
}

function renderRecentHistory() {
  DOM.recentHistory.innerHTML = "<h2 class='panel-title'>Recent History</h2>";

  const list = getAllTransactions().sort(compareByDate);

  list.forEach((item) => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <strong>${item.type.toUpperCase()}</strong> |
      ${item.category || "—"} |
      $${item.amount}<br>
      <small>${item.date}</small>
    `;
    DOM.recentHistory.appendChild(div);
  });
}

function render() {
  renderDashboard();
  renderRecentHistory();
}

DOM.incomeAmountInput.addEventListener("input", (e) => {
  incomeDraft.amount = Number(e.target.value);
  renderIncomePreview();
});
DOM.incomeDateInput.addEventListener("change", (e) => {
  incomeDraft.date = e.target.value;
  renderIncomePreview();
});
DOM.incomeCategorySelect.addEventListener("change", (e) => {
  incomeDraft.category = e.target.value;
  renderIncomePreview();
});
DOM.incomeReferenceTextarea.addEventListener("input", (e) => {
  incomeDraft.reference = e.target.value;
  renderIncomePreview();
});

DOM.expenseAmountInput.addEventListener("input", (e) => {
  expenseDraft.amount = Number(e.target.value);
  renderExpensePreview();
});
DOM.expenseDateInput.addEventListener("change", (e) => {
  expenseDraft.date = e.target.value;
  renderExpensePreview();
});
DOM.expenseCategorySelect.addEventListener("change", (e) => {
  expenseDraft.category = e.target.value;
  renderExpensePreview();
});
DOM.expenseReferenceTextarea.addEventListener("input", (e) => {
  expenseDraft.reference = e.target.value;
  renderExpensePreview();
});

if (DOM.sortSelect) {
  DOM.sortSelect.addEventListener("change", (e) => {
    state.sortOrder = e.target.value;
    render();
  });
}

DOM.addIncomeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!incomeDraft.amount) return;

  state.incomes.push({
    amount: incomeDraft.amount,
    date: incomeDraft.date || new Date().toLocaleDateString(),
    category: incomeDraft.category,
    reference: incomeDraft.reference,
    type: "income",
  });

  DOM.incomeForm.reset();
  incomeDraft = { amount: 0, date: "", category: "", reference: "" };
  render();
});

DOM.addExpenseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!expenseDraft.amount) return;

  state.expenses.push({
    amount: expenseDraft.amount,
    date: expenseDraft.date || new Date().toLocaleDateString(),
    category: expenseDraft.category,
    reference: expenseDraft.reference,
    type: "expense",
  });

  DOM.expenseForm.reset();
  expenseDraft = { amount: 0, date: "", category: "", reference: "" };
  render();
});
