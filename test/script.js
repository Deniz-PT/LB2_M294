const taskList = document.getElementById("task-list");
const addTaskForm = document.getElementById("add-task-form");
const newTaskInput = document.getElementById("new-task-input");

let tasks = [];

function renderTaskList() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task}</span>
      <div>
        <button class="edit-task-btn" data-task-index="${index}">Bearbeiten</button>
        <button class="delete-task-btn" data-task-index="${index}">Löschen</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  const editTaskBtns = document.querySelectorAll(".edit-task-btn");
  editTaskBtns.forEach((btn) => {
    btn.addEventListener("click", handleEditTaskClick);
  });

  const deleteTaskBtns = document.querySelectorAll(".delete-task-btn");
  deleteTaskBtns.forEach((btn) => {
    btn.addEventListener("click", handleDeleteTaskClick);
  });
}

function handleAddTaskSubmit(event) {
  event.preventDefault();

  const newTask = newTaskInput.value.trim();
  if (newTask === "") {
    alert("Bitte geben Sie eine Aufgabe ein.");
    return;
  }

  tasks.push(newTask);
  newTaskInput.value = "";
  renderTaskList();
}

function handleEditTaskClick(event) {
  const taskIndex = event.target.dataset.taskIndex;
  const taskText = tasks[taskIndex];
  const newTaskText = prompt("Bearbeiten Sie die Aufgabe:", taskText);
  if (newTaskText === null) {
    return;
  }
  tasks[taskIndex] = newTaskText.trim() === "" ? taskText : newTaskText.trim();
  renderTaskList();
}

function handleDeleteTaskClick(event) {
  const taskIndex = event.target.dataset.taskIndex;
  tasks.splice(taskIndex, 1);
  renderTaskList();
}

addTaskForm.addEventListener("submit", handleAddTaskSubmit);

renderTaskList();
