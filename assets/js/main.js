const toDoInput = document.querySelector(".todo-input");
const addToDoBtn = document.querySelector(".add-todo-btn");
const toDoList = document.querySelector(".todo-list");
const editForm = document.querySelector(".edit-form");
const editInput = document.querySelector(".edit-input");
const editToDoBtn = document.querySelector(".edit-todo-btn");
const completedToDoList = document.querySelector(".completed-todo-list ");

let toDos = [];
let completedToDos = [];
let updatedToDoId;

// add todo
const generateRandomId = () => Math.ceil(Math.random() * 1000);

const addToDo = (id) => {
  let todoText = toDoInput.value;
  const newToDo = {
    id,
    todoText,
    isCompleted: false,
  };
  todoText.length !== 0 && toDos.push(newToDo);
  toDoInput.focus();
};

const addToDoListItem = (id, isCompleted) => {
  const toDoText = document.createElement("li");
  const toDoTextContent = document.createElement("span");
  toDoTextContent.textContent = toDoInput.value;
  toDoText.setAttribute("id", `${id}`);
  toDoText.setAttribute("draggable", "true");
  toDoText.addEventListener("dragstart", (e) =>
    e.dataTransfer.setData("item", e.target.id)
  );
  toDoText.addEventListener("dragover", (e) => e.preventDefault());

  // complete todo button
  const completedBtn = document.createElement("button");
  completedBtn.className = "complete-todo";
  const completedBtnIcon = document.createElement("i");
  completedBtnIcon.className = "icon-check-circle-solid";
  completedBtn.appendChild(completedBtnIcon);
  completedBtn.addEventListener("click", completeToDoItem);

  // delete todo button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-todo";
  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", deleteToDoItem);

  // edit form button
  editToDoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    editToDo(id);
    editForm.style.display = "none";
  });

  // edit todo button
  const editBtn = document.createElement("button");
  editBtn.className = "edit-todo-btn icon-pen-solid";

  // opens edit form
  editBtn.addEventListener("click", (e) => {
    editToDoItem(id, toDoTextContent.textContent);
    updatedToDoId = e.target.parentNode.id;
  });
  toDoText.appendChild(toDoTextContent);
  toDoText.appendChild(editBtn);
  toDoText.appendChild(completedBtn);
  toDoText.appendChild(deleteBtn);

  toDoInput.value.length > 0 && toDoList.appendChild(toDoText);
};

const addtoDoSubmitForm = (e) => {
  e.preventDefault();
  let id = generateRandomId();
  addToDo(id);
  addToDoListItem(id, false);
  console.log(toDos);
  toDoInput.value = ""; // clear input value
};

addToDoBtn.addEventListener("click", addtoDoSubmitForm);

// remove from toDos array
const deleteToDo = (id) => {
  toDos = toDos.filter((item, index) => item.id != id);
};

const deleteFromToDoList = (item) => {
  item.remove();
};

// remove todo
const deleteToDoItem = (e) => {
  let id = e.target.parentNode.id;
  deleteToDo(id);
  deleteFromToDoList(e.target.parentNode);
};

// complete todo
const completeToDoItem = (e) => {
  let id = e.target.parentNode.parentNode.id;
  completeToDo(id);
};

const completeToDo = (id) => {
  toDos.forEach((todo) => {
    if (todo.id == id) todo.isCompleted = !todo.isCompleted;
    let toDoListItem = document.getElementById(`${todo.id}`);
    if (todo.isCompleted) {
      toDoListItem.className = "completed";
      completedToDoList.appendChild(toDoListItem)
    } else {
      toDoListItem.className = "";
      toDoList.appendChild(toDoListItem)
    }
  });
};

// edit todo
const editToDo = (id) => {
  if (updatedToDoId == id) {
    let updatedToDo = document.getElementById(`${id}`);
    let content = updatedToDo.querySelector("span");
    content.textContent = editInput.value;
  }
};

const editToDoItem = (id, text) => {
  editForm.style.display = "flex";
  editInput.focus();
  editInput.value = text;
};

//drag drop
const dropToList = (e, list) => {
  const id = parseInt(e.dataTransfer.getData("item"));

  toDos.forEach((todo) => {
    if (todo.id === id) {
      let toDoListItem = document.getElementById(`${todo.id}`);
      if (list == toDoList) {
        todo.isCompleted = false;
        toDoListItem.className = "";
      } else if (list == completedToDoList) {
        todo.isCompleted = true;
        toDoListItem.className = "completed";
      }
    }
  });
  list.appendChild(document.getElementById(`${id}`));
};

completedToDoList.addEventListener("dragover", (e) => e.preventDefault());
toDoList.addEventListener("dragover", (e) => e.preventDefault());
//drag to right side
completedToDoList.addEventListener("drop", (e) =>
  dropToList(e, completedToDoList)
);
//drag to left side
toDoList.addEventListener("drop", (e) => dropToList(e, toDoList));
