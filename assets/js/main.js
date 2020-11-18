const toDoInput = document.querySelector(".todo-input");
const addToDoBtn = document.querySelector(".add-todo");
const toDoList = document.querySelector(".todo-list");

let toDos = [];
let completedToDos = [];


// add todo
const generateRandomId=()=>Math.ceil(Math.random()*1000);

const addToDo = (id) => {
  let todoText = toDoInput.value
  console.log(toDoInput.value);
  const newToDo={
      id,
      todoText,
      isCompleted:false
  }
  todoText.length !== 0 &&
    toDos.push(newToDo);
    toDoInput.focus();

  console.log(toDos);
};

const addToDoListItem=(id)=>{
    // const toDoListItem = document.createElement("div");
    // toDoListItem.className = "todo-list-item";
    // toDoListItem.setAttribute("id", `${id}`)
  const toDoText = document.createElement("li");
  toDoText.textContent = toDoInput.value;
  toDoText.setAttribute("id", `${id}`)

  // completed btn
  const completedBtn = document.createElement("button");
  completedBtn.className = "complete-todo";
  const completedBtnIcon = document.createElement("i");
  completedBtnIcon.className = "icon-check-circle-solid";
  // delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-todo";
//   const deleteBtnIcon = document.createElement("i");
//   deleteBtnIcon.className = "icon-trash-alt-regular";
deleteBtn.textContent="x"
  deleteBtn.addEventListener("click", deleteToDoItem)

    completedBtn.appendChild(completedBtnIcon);
//   deleteBtn.appendChild(deleteBtnIcon);

//   toDoListItem.appendChild(toDoText);
//   toDoListItem.appendChild(completedBtn);
//   toDoListItem.appendChild(deleteBtn);
toDoText.appendChild(completedBtn);
toDoText.appendChild(deleteBtn)

//   toDoInput.value.length > 0 && toDoList.appendChild(toDoListItem);
toDoInput.value.length > 0 && toDoList.appendChild(toDoText);
}


const submitForm =(e)=>{
    e.preventDefault();
    let id = generateRandomId();
    addToDo(id);
    addToDoListItem(id);
    console.log(toDos);
    toDoInput.value = ""; // clear input value
}



// remove from toDos array
const deleteToDo = (id) => {
    console.log("delete + "+id)
//    toDos.filter((item) =>{return item !== id});
// toDos.splice(id, 1);
toDos =toDos.filter((item, index) => item.id != id);
console.log("todos + ", toDos)
 
};

function deleteFromToDoList(item) {
    console.log(item);
    item.remove();
  }

// remove todo
const deleteToDoItem=(e)=>{
let id= e.target.parentNode.id;
console.log("e.target.parentNode.id + "+e.target.parentNode.id)
deleteToDo(id);
// let todoListItemDiv = document.querySelector("li");
// todoListItemDiv.parentNode.removeChild(todoListItemDiv);
deleteFromToDoList(e.target.parentNode)
console.log("deleteToDoItem + ", toDos)
}

addToDoBtn.addEventListener("click", submitForm);