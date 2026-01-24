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
//prebaciti u stejt i dodati funkcije get za oba
function renderDashboard() {
  let totalIncome = 0;
  let totalExpense = 0;

  state.incomes.forEach((item) => (totalIncome += item.amount));
  state.expenses.forEach((item) => (totalExpense += item.amount));

  totalIncomeEl.textContent = `$${totalIncome}`;
  totalExpenseEl.textContent = `$${totalExpense}`;
  totalBalanceEl.textContent = `$${totalIncome - totalExpense}`;
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
  renderRecentHistory();
}

//incom.ispravke
const incomeAmountInput = DOM.incomeForm.querySelector(".income-amount");
const incomeDateInput = DOM.incomeForm.querySelector('input[type="date"]');
const incomeCategorySelect = DOM.incomeForm.querySelector("select");
const incomeReferenceTextarea = DOM.incomeForm.querySelector("textarea");
const addIncomeBtn = DOM.incomeForm.querySelector(".add-income-btn");

addIncomeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //napravi varijable, ne citaj direktno iz inputa, nego stavi eventlistenere na input
  const amount = Number(incomeAmountInput.value);
  if (!amount) return;

  state.incomes.push({
    amount,
    date: incomeDateInput.value || new Date().toLocaleDateString(),
    category: incomeCategorySelect.value,
    reference: incomeReferenceTextarea.value,
    type: "income",
  });

  render();
  DOM.incomeForm.reset();
});
//expens.
const expenseAmountInput = DOM.expenseForm.querySelector(".expense-amount");
const expenseDateInput = DOM.expenseForm.querySelector('input[type="date"]');
const expenseCategorySelect = DOM.expenseForm.querySelector("select");
const expenseReferenceTextarea = DOM.expenseForm.querySelector("textarea");
const addExpenseBtn = DOM.expenseForm.querySelector(".add-expense-btn");

addExpenseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Number(expenseAmountInput.value);
  if (!amount) return;

  state.expenses.push({
    amount,
    date: expenseDateInput.value || new Date().toLocaleDateString(),
    category: expenseCategorySelect.value,
    reference: expenseReferenceTextarea.value,
    type: "expense",
  });

  render();
  DOM.expenseForm.reset();
});

render();
//dodaj da se income, expanses, transactions, mogu sortirati po datumu, a na transaction stavi da mozes da filtriras samo income ili samo expensove.
