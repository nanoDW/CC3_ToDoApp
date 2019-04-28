import "./style/style.css";
import "./style/zwicon.css";

const userLists = []; //Tutaj zapisane zostaną listy użytkownika po sfetchowaniu.

if (document.cookie) {
  hideLogin();
  fetchLists();
}

document.querySelector(".btn--login").addEventListener("click", () => {
  event.preventDefault();

  const email = document.querySelector(".login-form__input--email").value;
  const password = document.querySelector(".login-form__input--password").value;

  login(email, password);
});

document.querySelector(".btn--new-list").addEventListener("click", () => {
  event.preventDefault();
  document.querySelector(".new-list").classList.add("new-list--active");
  console.log('new list added')
});

async function login(email, password) {
  const loginResponse = await postLogin(`http://localhost:3000/login`, {
    email: email,
    password: password
  });
  console.log(loginResponse);
  if (loginResponse.ok) {
    hideLogin();
    fetchLists();
  }
}

async function fetchLists() {
  const getListsResponse = await getLists()
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(lists => userLists.push(...lists));

  console.log("Lists of current user: ", userLists);
  displayLists(userLists);
}

function displayLists(userLists) {
  const listsWrapper = document.querySelector(".lists-wrapper");
  userLists.forEach(list => {
    const tasks = [...list.tasks];
    let tasksHTML = "";
    tasks.forEach(task => {
      tasksHTML += `
        <li class="item" data-taskid="${task._id}">
          <input type="checkbox" name="" class="checkbox checkbox--item" />
          <p class="item__description">${task.name}</p>
          <button class="btn btn--edit">
            <i class="zwicon-edit-square"></i>
          </button>
          <button class="btn btn--delete">
            <i class="zwicon-trash"></i>
          </button>
        </li>
        `;
    });
    const displayedList = `
    <div class="list" data-listid="${list._id}">
      <div class="list__header" style="background-color:${list.color}">
        <h2 class="list__description">${list.name}</h2>

        <button class="btn btn--delete-list">
          <i class="zwicon-trash"></i>
        </button>
        <button class="btn btn--new-item">
          <i class="zwicon-plus-circle"></i>
        </button>
      </div>
    <ul class="list__items list__items--hidden">
      ${tasksHTML}
    </ul>
    </div>
    `;
    listsWrapper.innerHTML += displayedList;
  });
  deleteListEventListener();
  editTaskEventListener()
}

function hideLogin() {
  document.querySelector(".login-screen").classList.add("login-screen--hidden");
  document
    .querySelector(".main-screen")
    .classList.remove("main-screen--hidden");
}

function showLogin() {
  document
    .querySelector(".login-screen")
    .classList.remove("login-screen--hidden");
  document.querySelector(".main-screen").classList.add("main-screen--hidden");
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

function getLists() {
  return fetch("http://localhost:3000/user/lists", {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function postList(name, color) {
  return fetch(`http://localhost:3000/user/lists`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      color: color
    })
  });
  //przykład: const postListResponse = postList('newlist','newColor');
}

function putList(listId, name, color) {
  return fetch(`http://localhost:3000/user/lists/${listId}`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      color: color
    })
  });
  //przykład: const putListResponse = await putList('5cc595c9b273b022d1d6bc8b', 'newer list', 'never color');
}

function deleteList(listId) {
  return fetch(`http://localhost:3000/user/lists/${listId}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
  //przykład: const deleteListResponse = await deleteList('5cc575a8d39f43b7d1ec3091');
}

function postTask(name, list, deadline) {
  return fetch(`http://localhost:3000/user/tasks`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      list: list,
      deadline: deadline
    })
  });
  //przykład: const postTaskResponse = await postTask('newTask', 'someList', '2019-04-30');
}

function putTask(taskId, name, list, deadline) {
  return fetch(`http://localhost:3000/user/tasks/${taskId}`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      list: list,
      deadline: deadline
    })
  });
  //przykład: const putTaskResponse = await putTask('5cc5bd3013e35113c455be5e', 'newer Task 500', 'someList', '2019-05-06');
}

function deleteTask(taskId) {
  return fetch(`http://localhost:3000/user/tasks/${taskId}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
  //przykład: const deleteTaskResponse = await deleteTask('5cc5bd3013e35113c455be5e');
}

function deleteListEventListener(){
  document.querySelectorAll('.btn--delete-list')
    .forEach(input => input.addEventListener('click', e => {
      e.preventDefault();
      const listId = e.target.parentNode.parentNode.parentNode.getAttribute("data-listid");
      if (confirm("Are you sure you want to delete this list?")) {
        const index = userLists.findIndex(obj => obj._id === listId);
        userLists.splice(index, 1);
        deleteList(listId);
        document.querySelector(".lists-wrapper").innerHTML = '';
        displayLists(userLists);
      }
    }));
}
//unfinished #Ola
function editTaskEventListener() {
  document.querySelectorAll('.btn--edit')
    .forEach(input => input.addEventListener('click', e => {
      e.preventDefault();

      document.querySelector(".item__description").classList.add("item__description--hidden");
      document.querySelector(".item__edit").classList.remove("item__edit--hidden");

      const taskId = e.target.parentNode.parentNode.getAttribute("data-taskid");

      if (confirm("Are you sure?")) {
        const index = userLists.tasks.findIndex(obj => obj._id === taskId);
        
        putTask(taskId);
        document.querySelector(".lists-wrapper").innerHTML = '';
        displayLists(userLists);
      }
    }));
}

// logging out
document.querySelector(".btn--logout").addEventListener("click", () => {
  document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.querySelector(".lists-wrapper").innerHTML = "";
  userLists.splice(0, userLists.length);
  showLogin();
});

/*
Jak sterować wyglądem:

Przełączenie z logowania na ekran główny:

    document.querySelector(".login-screen").classList.add("login-screen--hidden");
    document.querySelector(".main-screen").classList.remove("main-screen--hidden");


Wyświetlenie nowej listy - template html:

        <div class="list">
          <div class="list__header" style="background-color: ****tutaj kolor**** ">   <----stwierdziłem, że chyba najwygodniej będzie kolor wrzucać jako inline style
            <h2 class="list__description">  ***nazwa listy***   </h2>
            <button class="btn btn--delete-list">
                <i class="zwicon-trash"></i>
            </button>
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

    document.querySelector(".new-list").classList.add(".new-list--active");

    (analogicznie po zatwierdzeniu usuwamy tą klasę i czyścimy inputy)
    (mam jeszcze problem ze stylowaniem tych radio input z kolorami - jak ogarnę to tu dopiszę)

*/
