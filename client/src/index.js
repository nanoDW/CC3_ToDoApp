import "./style/style.css";

document.querySelector(".btn--login").addEventListener("click", () => {
  event.preventDefault();
  document.querySelector(".login-screen").classList.add("login-screen--hidden");
  document
    .querySelector(".main-screen")
    .classList.remove("main-screen--hidden");
});
