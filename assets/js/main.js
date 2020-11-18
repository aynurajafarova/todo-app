const toDoInput = document.querySelector(".todo-input");
const addToDoBtn = document.querySelector(".add-todo");
const toDoList = document.querySelector(".todo-list");
const editForm = document.querySelector(".edit-form");
const editInput = document.querySelector(".edit-input")

let toDos = [];
let completedToDos = [];
let className = ""

// add todo
const generateRandomId = () => Math.ceil(Math.random() * 1000);

const addToDo = (id) => {
  let todoText = toDoInput.value
  console.log(toDoInput.value);
  const newToDo = {
    id,
    todoText,
    isCompleted: false
  }
  todoText.length !== 0 &&
    toDos.push(newToDo);
  toDoInput.focus();

  console.log(toDos);
};

const addToDoListItem = (id) => {
  // const toDoListItem = document.createElement("div");
  // toDoListItem.className = "todo-list-item";
  // toDoListItem.setAttribute("id", `${id}`)
  const toDoText = document.createElement("li");
  toDoText.textContent = toDoInput.value;
  toDoText.setAttribute("id", `${id}`)
  // toDoText.setAttribute("class", `${isCompleted ? "completed" : ""}`)
  toDoText.className = className;
  // completed btn
  const completedBtn = document.createElement("button");
  completedBtn.className = "complete-todo";
  const completedBtnIcon = document.createElement("i");
  completedBtnIcon.className = "icon-check-circle-solid";
  // completedBtn.textContent="~"
  // delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-todo";
  //   const deleteBtnIcon = document.createElement("i");
  //   deleteBtnIcon.className = "icon-trash-alt-regular";
  deleteBtn.textContent = "x"
  deleteBtn.addEventListener("click", deleteToDoItem)

  completedBtn.appendChild(completedBtnIcon);
  completedBtn.addEventListener("click", completeToDoItem);
  //   toDoText.addEventListener("click",(event)=>{
  //     let elementClicked = event.target;
  // elementClicked.textContent="assd"
  // elementClicked.style.display="none";
  // editForm.style.display="block";
  // console.log("test");
  // toDoText.textContent=editInput.value

  //   })
  //   deleteBtn.appendChild(deleteBtnIcon);

  //   toDoListItem.appendChild(toDoText);
  //   toDoListItem.appendChild(completedBtn);
  //   toDoListItem.appendChild(deleteBtn);
  toDoText.addEventListener("click", editToDoItem)
  toDoText.appendChild(completedBtn);
  toDoText.appendChild(deleteBtn)

  //   toDoInput.value.length > 0 && toDoList.appendChild(toDoListItem);
  toDoInput.value.length > 0 && toDoList.appendChild(toDoText);
}

const submitForm = (e) => {
  e.preventDefault();
  let id = generateRandomId();
  addToDo(id);
  addToDoListItem(id);
  console.log(toDos);
  toDoInput.value = ""; // clear input value
}

// remove from toDos array
const deleteToDo = (id) => {
  console.log("delete + " + id)
  //    toDos.filter((item) =>{return item !== id});
  // toDos.splice(id, 1);
  toDos = toDos.filter((item, index) => item.id != id);
  console.log("todos + ", toDos)
};

function deleteFromToDoList(item) {
  console.log(item);
  item.remove();
}

// remove todo
const deleteToDoItem = (e) => {
  let id = e.target.parentNode.id;
  console.log("e.target.parentNode.id + " + e.target.parentNode.id)
  deleteToDo(id);
  // let todoListItemDiv = document.querySelector("li");
  // todoListItemDiv.parentNode.removeChild(todoListItemDiv);
  deleteFromToDoList(e.target.parentNode)
  console.log("deleteToDoItem + ", toDos)
}

addToDoBtn.addEventListener("click", submitForm);

const completeToDo = (id) => {
  for (let i = 0; i < toDos.length; i++) {
    let element = toDos[i];
    if (element.id == id) {
      toDos[i].isCompleted = !toDos[i].isCompleted;
      // document.querySelector("li").id.className="completed"
      console.log(element);
      addClass(id)
    }
  }
  // addClass(id)
}

const addClass = (id) => {
  const todoList = document.querySelectorAll("li");
  for (let i = 0; i < todoList.length; i++) {
    const element = todoList[i];
    // console.log(element.id);
    if (element.id == id) {
       element.classList.add("completed") 
      } 

  }
}


const completeToDoItem = (e) => {
  let id = e.target.parentNode.parentNode.id;
  // const element = e.target.parentNode;
  completeToDo(id);
  // console.log("id+ " + toDoList.childNodes);
  // console.log("element+ " + element)
}

const editToDo = (id) => {
  for (let i = 0; i < toDos.length; i++) {
    const element = toDos[i];
    if (element.id == id) {
      // let elementClicked = event.target;
      // elementClicked.textContent="assd"
      toDoText.style.display = "none";
      editForm.style.display = "block";
      // console.log("test");
      toDoText.textContent = editInput.value
      console.log("id++ " + id)
    }
  }
}

const editToDoItem = (e) => {
  let id = e.target.id;
  editToDo(id);
  // console.log("id+ "+id)
  editToDoList(e.target)
}

const editToDoList = (item) => {
  console.log(item);
  toDos.push({ item });
}