let divElement = document.createElement("div");
document.body.append(divElement);
divElement.className = "container";

let olElement = document.createElement("ol");
divElement.append(olElement);

function addToDo() {
  let textinput = document.querySelector("#input").value;
  if (!textinput) {
    alert("Eingabe ist leer!");
    return;
  }
  let liElement = document.createElement("li");
  olElement.append(liElement);
  liElement.innerText = textinput;

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  liElement.append(checkBox);

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "<img src='Delete.png' class='img'/>";
  liElement.append(deleteButton);
  deleteButton.className = "btn-del";

  let editButton = document.createElement("button");
  editButton.innerHTML = "<img src='edit.png' class='img'/>";
  editButton.className = "btn-edit";
  liElement.append(editButton);

  deleteButton.addEventListener("click", function () {
    liElement.remove();
  });
  editButton.addEventListener("click", function () {
    let newText = prompt("Neuen Text eingeben");
    liElement.innerText = newText;
    liElement.append(deleteButton);
    liElement.append(editButton);
  });
  document.querySelector("#input").value = "";
}
document.querySelector("#input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addToDo();
  }
});
document.querySelector("#submit").addEventListener("click", addToDo);

//code von einem früherigen projekt
