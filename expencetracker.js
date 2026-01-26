const DOM = {
  menuItems: document.querySelectorAll(".category ul li"),
  dashboardCards: document.getElementById("dashboardCards"),
  incomesSection: document.getElementById("incomesSection"),
  expensesSection: document.getElementById("expensesSection"),
  incomeForm: document.querySelector(".income-form"),
  expenseForm: document.querySelector(".expense-form"),
  recentHistory: document.querySelector(".recent-history"),

  incomeAmountInput: document.querySelector(".income-amount"),
  incomeDateInput: document.querySelector(".income-form input[type='date']"),
  incomeCategorySelect: document.querySelector(".income-form select"),
  incomeReferenceTextarea: document.querySelector(".income-form textarea"),
  addIncomeBtn: document.querySelector(".add-income-btn"),

  expenseAmountInput: document.querySelector(".expense-amount"),
  expenseDateInput: document.querySelector(".expense-form input[type='date']"),
  expenseCategorySelect: document.querySelector(".expense-form select"),
  expenseReferenceTextarea: document.querySelector(".expense-form textarea"),
  addExpenseBtn: document.querySelector(".add-expense-btn"),
};

function hideForms() {
  DOM.dashboardCards.classList.add("hidden");
  DOM.incomesSection.classList.add("hidden");
  DOM.expensesSection.classList.add("hidden");
  DOM.recentHistory.classList.add("hidden");
}

hideForms();
DOM.dashboardCards.classList.remove("hidden");
DOM.recentHistory.classList.remove("hidden");

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

  incomeDraft: {
    amount: 0,
    date: "",
    category: "",
    reference: "",
  },

  expenseDraft: {
    amount: 0,
    date: "",
    category: "",
    reference: "",
  },

  getTotalIncome() {
    return this.incomes.reduce((sum, item) => sum + item.amount, 0);
  },
  getTotalExpense() {
    return this.expenses.reduce((sum, item) => sum + item.amount, 0);
  },
  getBalance() {
    return this.getTotalIncome() - this.getTotalExpense();
  },
};

const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const totalBalanceEl = document.getElementById("totalBalance");
//prebaciti u stejt i dodati funkcije get za oba

function renderDashboard() {
  totalIncomeEl.textContent = `$$(state.getTotalIncome)}`;
  totalExpenseEl.textContent = `$$(state.getTotalExpence)}`;
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
  });
}

function render() {
  renderDashboard();
  renderRecentHistory();
}

//incom.ispravke
/* INPUT LISTENERS (draft) */
DOM.incomeAmountInput.addEventListener("input", (e) => {
  state.incomeDraft.amount = Number(e.target.value);
});
DOM.incomeDateInput.addEventListener("change", (e) => {
  state.incomeDraft.date = e.target.value;
});
DOM.incomeCategorySelect.addEventListener("change", (e) => {
  state.incomeDraft.category = e.target.value;
});
DOM.incomeReferenceTextarea.addEventListener("input", (e) => {
  state.incomeDraft.reference = e.target.value;
});

DOM.expenseAmountInput.addEventListener("input", (e) => {
  state.expenseDraft.amount = Number(e.target.value);
});
DOM.expenseDateInput.addEventListener("change", (e) => {
  state.expenseDraft.date = e.target.value;
});
DOM.expenseCategorySelect.addEventListener("change", (e) => {
  state.expenseDraft.category = e.target.value;
});
DOM.expenseReferenceTextarea.addEventListener("input", (e) => {
  state.expenseDraft.reference = e.target.value;
});

/* SUBMIT LISTENERS */
DOM.addIncomeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!state.incomeDraft.amount) return;

  state.incomes.push({
    amount: state.incomeDraft.amount,
    date: state.incomeDraft.date || new Date().toLocaleDateString(),
    category: state.incomeDraft.category,
    reference: state.incomeDraft.reference,
    type: "income",
  });

  render();
  DOM.incomeForm.reset();
  state.incomeDraft = { amount: 0, date: "", category: "", reference: "" };
});

DOM.addExpenseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!state.expenseDraft.amount) return;

  state.expenses.push({
    amount: state.expenseDraft.amount,
    date: state.expenseDraft.date || new Date().toLocaleDateString(),
    category: state.expenseDraft.category,
    reference: state.expenseDraft.reference,
    type: "expense",
  });

  render();
  DOM.expenseForm.reset();
  state.expenseDraft = { amount: 0, date: "", category: "", reference: "" };
});

render();

//dodaj da se income, expanses, transactions, mogu sortirati po datumu, a na transaction stavi da mozes da filtriras samo income ili samo expensove.
