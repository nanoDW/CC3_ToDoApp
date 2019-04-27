import "./style/style.css";
import "./style/zwicon.css";

document.querySelector(".btn--login").addEventListener("click", () => {
  event.preventDefault();

  const email = document.querySelector(".login-form__input--email").value;
  const password = document.querySelector(".login-form__input--password").value;

  login(email, password);
});


const userLists = []; //Tutaj zapisane zostaną listy użytkownika po sfetchowaniu.

async function login(email, password) {
  const loginResponse = await postLogin(`http://localhost:3000/login`, {
    email: email,
    password: password
  });
  console.log(loginResponse);
  if (loginResponse.ok) {
    document
      .querySelector(".login-screen")
      .classList.add("login-screen--hidden");
    document
      .querySelector(".main-screen")
      .classList.remove("main-screen--hidden");

      getLists()
        .then(lists => userLists.push(...lists))
        .then(console.log('Fetching user lists done.'))
        .then(console.log(userLists))
  }
}

function postLogin(url, data) {
  console.log(url, data);

  return fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include", // Don't forget to specify this if you need cookies
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

async function getLists(){
  return fetch('http://localhost:3000/user/lists', {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(data => data.json())
}

