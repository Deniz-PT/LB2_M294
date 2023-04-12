const taskList = document.getElementById("task-list");
const addTaskForm = document.getElementById("add-task-form");
const newTaskInput = document.getElementById("new-task-input");

let tasks = [];

function handleAddTaskSubmit(event) {
  event.preventDefault();

  const newTask = newTaskInput.value.trim();

  tasks.push(newTask);
  newTaskInput.value = "";
}

addTaskForm.addEventListener("submit", handleAddTaskSubmit);

async function getTasks() {
  const response = await fetch("http://localhost:3011/tasks", {
    method: "GET",
  });
  const json = await response.json();
  renderTasks(json);
}

async function deleteTask(id) {
  const response = await fetch(`http://localhost:3011/task/${id}`, {
    method: "DELETE",
  });
  const json = await response.json();

  console.log(json);
  getTasks();
}

async function addTask() {
  const title = newTaskInput.value;
  const response = await fetch("http://localhost:3011/tasks", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: title,
    }),
  });

  getTasks();
}

async function editTask(id) {
  const eingabe = prompt("geben sie ihren neue task ein");
  const response = await fetch(`http://localhost:3011/tasks`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({
      id: id,
      title: eingabe,
    }),
  });
  const json = await response.json();

  console.log(json);
  getTasks();
}

function renderTasks(tasks) {
  taskList.replaceChildren();

  //Array von Diego
  Array.from(tasks).forEach(function (item) {
    const liElement = document.createElement("li");
    liElement.innerText = item.title;
    liElement.classList.add("task");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<img  class="img"src="images/trash.png" alt="" />';
    deleteBtn.classList.add("deleteButton");
    deleteBtn.addEventListener("click", function () {
      deleteTask(item.id);
    });

    const putBtn = document.createElement("button");
    putBtn.innerHTML = '<img  class="img"src="images/edit.png" alt="" />';
    putBtn.classList.add("putButton");
    putBtn.addEventListener("click", function () {
      editTask(item.id);
    });

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    liElement.prepend(checkbox);
    liElement.append(putBtn);
    liElement.append(deleteBtn);

    taskList.append(liElement);
  });
}

// Simon hat mir wenig geholfen
async function checkLoggedIn() {
  const response = await fetch("http://localhost:3011/auth/cookie/status", {
    credentials: "include",
  });
  if (response.status == 401) {
    window.location.href = "login.html";
  }
}
checkLoggedIn();

// von Diego inspieriert
const title = document.getElementById("task");
async function getTask(id) {
  const response = await fetch("http://localhost:3011/task/" + id, {
    method: "GET",
    credentials: "include",
  });
  const task = await response.json();
  title.innerText = task.title;
}
const queryParams = new URLSearchParams(window.location.search);
getTask(queryParams.get("id"));
