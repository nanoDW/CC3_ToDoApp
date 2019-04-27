import "./style/style.css";
import "./style/zwicon.css";

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
  });
  console.log(loginResponse);
  if (loginResponse.ok) {
    document
      .querySelector(".login-screen")
      .classList.add("login-screen--hidden");
    document
      .querySelector(".main-screen")
      .classList.remove("main-screen--hidden");

    getLists();
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

async function getLists() {
  await fetch("http://localhost:3000/user/lists", {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => data.json())
    .then(lists => console.log(lists));
}

/*
Jak sterować wyglądem:

Przełączenie z logowania na ekran główny:

    document.querySelector(".login-screen").classList.add("login-screen--hidden");
    document.querySelector(".main-screen").classList.remove("main-screen--hidden");


Wyświetlenie nowej listy - template html:

        <div class="list">
          <div class="list__header" style="background-color: ****tutaj kolor**** ">   <----stwierdziłem, że chyba najwygodniej będzie kolor wrzucać jako inline style
            <h2 class="list__description">  ***nazwa listy***   </h2>
            <button class="btn btn--new-item">
              <i class="zwicon-plus-circle"></i>
            </button>
          </div>
          <ul class="list__items list__items--hidden">
            **************tu będą taski*********
          </ul>
        </div>


Nowy task - template html (wrzucamy między tagi <ul> ) - po kliknięciu w button .btn--new-item pojawia się niewypełniony task - zamiast nazwy ma pusty input:

            <li class="item">
              <input
                type="checkbox"
                name=""
                id=""
                class="checkbox checkbox--item"
              />
              <p class="item__description item__description--hidden"></p>
              <input type="text" class="item__edit" placeholder="Task description"/>
              <button class="btn btn--edit">
                <i class="zwicon-edit-square"></i>
              </button>
              <button class="btn btn--delete">
                <i class="zwicon-trash"></i>
              </button>
            </li>

Zatwierdzenie taska - input znika i w jego miejsce pojawia się tekst:

    document.querySelector(".item__edit").classList.add("item__edit--hidden");
    document.querySelector(".item__description").classList.remove("item__description--hidden");
    document.querySelector(".item__description").innerText = " ***Nazwa taska***  ";
   

Zwijanie/rozwijanie listy (po kliknięciu na div .list__header):

    document.querySelector(".list__items").classList.toggle("list__items--hidden");


Task zrobiony (po ustawieniu "checked" na checkboxie):

    document.querySelector(".item__description").classList.add("item__description--checked");


Edycja taska (nazwa taska znika i w jej miejscu pojawia się input z wypełnioną obecną nazwą taska):

    document.querySelector(".item__description").classList.add("item__description--hidden");
    document.querySelector(".item__edit").classList.remove("item__edit--hidden");
    document.querySelector(".item__edit").value = "  ****Obecna nazwa taska****   ";


Włączenie ekranu nowej listy:

    document.querySelector(".new-list").classList.add("new-list--active");

    (analogicznie po zatwierdzeniu usuwamy tą klasę i czyścimy inputy)
    (mam jeszcze problem ze stylowaniem tych radio input z kolorami - jak ogarnę to tu dopiszę)

*/
