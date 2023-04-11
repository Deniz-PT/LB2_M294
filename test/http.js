const tasksElement = document.getElementById("task-list");

async function getTasks() {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "GET",
  });
  const json = await response.json();

  renderTasks(json);
}

async function addTask() {
  const title = prompt("Was soll im Task stehen?");

  const response = await fetch("http://localhost:3000/task/" + tasknr, {
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

function renderTasks(tasks) {
  tasksElement.replaceChildren();

  Array.from(tasks).forEach(function (item) {
    const liElement = document.createElement("li");
    liElement.innerText = item.title;
    tasksElement.append(liElement);
  });
}
