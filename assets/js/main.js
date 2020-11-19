const toDoInput = document.querySelector(".todo-input");
const addToDoBtn = document.querySelector(".add-todo-btn");
const toDoList = document.querySelector(".todo-list");
const editForm = document.querySelector(".edit-form");
const editInput = document.querySelector(".edit-input");
const editToDoBtn = document.querySelector(".edit-todo-btn");
const completeToDoList = document.querySelector(".completed-todo-list ");

let toDos = [];
let completedToDos = [];
let updatedToDoId;

// add todo
const generateRandomId = () => Math.ceil(Math.random() * 1000);

const addToDo = (id) => {
  let todoText = toDoInput.value;
  console.log(toDoInput.value);
  const newToDo = {
    id,
    todoText,
    isCompleted: false,
  };
  todoText.length !== 0 && toDos.push(newToDo);
  toDoInput.focus();

  console.log(toDos);
};

const addToDoListItem = (id) => {
  const toDoText = document.createElement("li");
  const toDoTextContent = document.createElement("span");
  toDoTextContent.textContent = toDoInput.value;
  toDoText.setAttribute("id", `${id}`);
  toDoText.setAttribute("draggable", true);

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
    console.log("updatedToDoId + "+updatedToDoId)
  });
  // toDoText.addEventListener("ondragstart", onDragStart)
  toDoText.appendChild(toDoTextContent);
  toDoText.appendChild(editBtn);
  toDoText.appendChild(completedBtn);
  toDoText.appendChild(deleteBtn);

  toDoInput.value.length > 0 && toDoList.appendChild(toDoText);
  // completeToDoList.addEventListener("ondragover", onDragOver);
  // completeToDoList.addEventListener("ondrop", onDrop);
};

const submitForm = (e) => {
  e.preventDefault();
  let id = generateRandomId();
  addToDo(id);
  addToDoListItem(id);
  console.log(toDos);
  toDoInput.value = ""; // clear input value
};

// remove from toDos array
const deleteToDo = (id) => {
  console.log("delete + " + id);
  //    toDos.filter((item) =>{return item !== id});
  // toDos.splice(id, 1);
  toDos = toDos.filter((item, index) => item.id != id);
  console.log("todos + ", toDos);
};

function deleteFromToDoList(item) {
  console.log(item);
  item.remove();
}

// remove todo
const deleteToDoItem = (e) => {
  let id = e.target.parentNode.id;
  console.log("e.target.parentNode.id + " + e.target.parentNode.id);
  deleteToDo(id);
  // let todoListItemDiv = document.querySelector("li");
  // todoListItemDiv.parentNode.removeChild(todoListItemDiv);
  deleteFromToDoList(e.target.parentNode);
  console.log("deleteToDoItem + ", toDos);
};

addToDoBtn.addEventListener("click", submitForm);

const completeToDo = (id) => {
  for (let i = 0; i < toDos.length; i++) {
    let element = toDos[i];
    if (element.id == id) {
      toDos[i].isCompleted = !toDos[i].isCompleted;
      // document.querySelector("li").id.className="completed"
      console.log(element);
      addClass(id);
    }
  }
  // addClass(id)
};

const addClass = (id) => {
  const todoList = document.querySelectorAll("li");
  for (let i = 0; i < todoList.length; i++) {
    const element = todoList[i];
    // console.log(element.id);
    if (element.id == id) {
      element.classList.add("completed");
    }
  }
};

const completeToDoItem = (e) => {
  let id = e.target.parentNode.parentNode.id;
  // const element = e.target.parentNode;
  completeToDo(id);
  // console.log("id+ " + toDoList.childNodes);
  // console.log("element+ " + element)
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

const updatedToDo = (id) => {
  console.log("updatedToDo + " + id);
};

//drag drop

// const todoList = document.querySelectorAll("li");

// for (var i = 0; i < todoList.length; i++) {
//   todoList[i].addEventListener('dragstart', function(e) {
//       e.dataTransfer.effectAllowed = 'move';
//       e.dataTransfer.setData('text', this.innerHTML);
//       elementDragged = this;
//   });
//   todoList[i].addEventListener('dragend', function(e) {
//       elementDragged = null;
//   });
// };

// let dropTodosDiv = document.querySelector(".completed-todo-list");
// dropTodosDiv.addEventListener('dragover', function(e) {
//   if (e.preventDefault) {
//       e.preventDefault();
//   }
//   e.dataTransfer.dropEffect = 'move';
//   return false;
// });

// dropTodosDiv.addEventListener('dragleave', function(e) {
//   this.className = "";
// });
// data transfere id'ni vermek

// dropTodosDiv.addEventListener('drop', function(e) {
//   if (e.preventDefault) e.preventDefault();
//   if (e.stopPropagation) e.stopPropagation();
//   // complete(1);
//   // this.innerHTML += "" + e.dataTransfer.getData('text');
//   // document.querySelector('#drag-elements').removeChild(elementDragged);
//   // elementDragged = null;
//   // var data = ev.dataTransfer.getData("text");
//   // thisdiv = ev.target;
//   // document.getElementById(data).insertBefore(thisdiv);
//   // return false;

// });

///////////////
// const onDragStart=(e)=>{
// e.dataTransfer.setData("text/plain",e.target.id);
// e.currentTarget.style.backgroundColor="yellow";
// console.log("test")
// }

// const onDragOver=(e)=>{
//   e.preventDefault();
// }

// const onDrop=(e)=>{
// const id =e.dataTransfer.getData('text');
// const draggableElement = document.getElementById(id);
// const dropzone = e.target;
// dropzone.appendChild(draggableElement);
// e.target.clearData();
// }

// const todoList = document.querySelectorAll("li");
// for (var i = 0; i < todoList.length; i++) {
//   todoList[i].addEventListener('dragstart', function(e) {
//       e.dataTransfer.effectAllowed = 'move';
//       e.dataTransfer.setData('text', this.innerHTML);
//       elementDragged = this;
//   });
//   todoList[i].addEventListener('dragend', function(e) {
//       elementDragged = null;
//   });
// };
