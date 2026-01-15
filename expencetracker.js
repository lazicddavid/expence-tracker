const menuItems = document.querySelectorAll(".category ul li");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");
  });
});

const DOM = {
  incomes: document.querySelector(".incomes"),
};
