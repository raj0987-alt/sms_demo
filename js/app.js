const sidebar = document.querySelector("#sidebar");
const scrim = document.querySelector(".sidebar-scrim");
document.querySelectorAll("[data-sidebar-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    sidebar?.classList.toggle("open");
    scrim?.classList.toggle("open");
  });
});

document.querySelectorAll(".seg[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".seg[data-view]").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view-pane").forEach((pane) => pane.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`.${button.dataset.view}-view`)?.classList.add("active");
  });
});

document.querySelectorAll("[data-print]").forEach((button) => {
  button.addEventListener("click", () => window.print());
});
