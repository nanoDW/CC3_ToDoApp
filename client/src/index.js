import "./style/style.css";

document.querySelector(".btn--login").addEventListener("click", () => {
  event.preventDefault();

  const email = document.querySelector(".login-form__input--email").value;
  const password = document.querySelector(".login-form__input--password").value;

  login(email, password);
  
});

async function login(email, password) {
  const loginResponse = await postLogin(`http://localhost:3000/login`, {
    email: email,
    password: password
  })
  console.log(loginResponse)
  if (loginResponse.ok) {
    document.querySelector(".login-screen").classList.add("login-screen--hidden");
    document
      .querySelector(".main-screen")
      .classList.remove("main-screen--hidden");
  }
}

function postLogin(url, data) {
  console.log(url, data);
  
  return fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: 'include', // Don't forget to specify this if you need cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    })
}