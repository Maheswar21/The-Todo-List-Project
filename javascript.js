let inputEl = document.getElementById("inputEl");
let todoListContainer = document.getElementById("todoListContainer");
let addBtn = document.getElementById("addBtn");
let storeBtn = document.getElementById("storeBtn");

function getTheKeyFromLocalStorage(){
   let storedKey = JSON.parse(localStorage.getItem("storedTodoList"));
   if(storedKey === null){
    return [];
   }
   else{
    return storedKey;
   }
}

let todoList = getTheKeyFromLocalStorage();
function addNewTodo(){
    let userTodo = inputEl.value.trim();
     
    if(userTodo === ""){
        alert("Enter Your Todo");
        return;
    }

    let newTodo = {
        todo:userTodo,
        uniqueId:crypto.randomUUID(),
        isChecked:false
    };

    generateTodo(newTodo);
    todoList.push(newTodo);
    inputEl.value = "";
}

 inputEl.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            addNewTodo();
        }
    });

function storeInLocalStorage(){
   let storedTodoList = JSON.stringify(todoList);
   localStorage.setItem("storedTodoList", storedTodoList);
}

addBtn.onclick = function(){
   addNewTodo();
};

storeBtn.onclick = function(){
    storeInLocalStorage();
};

function checkboxIsClicked(checkboxId, labelId, myTodoId,labelConatinerId){
    let checkboxEl = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    let labelConatinerBackground = document.getElementById(labelConatinerId);

    labelElement.classList.toggle("checked");
    labelConatinerBackground.classList.toggle("label-container-background");

    let todoIndex = todoList.findIndex(eachTodo => "myTodo" + eachTodo.uniqueId === myTodoId);
   
    let storedTodoObject = todoList[todoIndex];
    if(storedTodoObject.isChecked === true){
        storedTodoObject.isChecked = false;
    }
    else{
        storedTodoObject.isChecked = true;
    }
}

function generateTodo(eachTodo){
    let checkboxId = "checkbox" + eachTodo.uniqueId;
    let labelId = "labelEL" + eachTodo.uniqueId;
    let myTodoId = "myTodo" + eachTodo.uniqueId;
    let labelConatinerId = "labelContainer" + eachTodo.uniqueId;

    let listItem = document.createElement("li");
    listItem.id = myTodoId;
    listItem.classList.add("d-flex", "flex-row", "todo-list-item");
    todoListContainer.appendChild(listItem);

    let inputEl2 = document.createElement("input");
    inputEl2.type = "checkbox";
    inputEl2.id = checkboxId;
    inputEl2.checked = eachTodo.isChecked;
    inputEl2.classList.add("checkbox");
    inputEl2.onclick = function (){
       checkboxIsClicked(checkboxId, labelId, myTodoId, labelConatinerId);
    };

    listItem.appendChild(inputEl2);

    let labelConatiner = document.createElement("div");
    labelConatiner.id = labelConatinerId;
    labelConatiner.classList.add("label-container", "d-flex", "flex-row");
    listItem.appendChild(labelConatiner);

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.id = labelId;
    labelEl.textContent = eachTodo.todo;
    if(eachTodo.isChecked === true){
        labelEl.classList.add("checked");
    }
    labelEl.classList.add("label-el");
    labelConatiner.appendChild(labelEl);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-container");
   

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function(){
       todoListContainer.removeChild(listItem);
       let index = todoList.findIndex(eachTodo => "myTodo" + eachTodo.uniqueId === myTodoId);
       todoList.splice(index, 1);
    };

    deleteContainer.appendChild(deleteIcon);
    labelConatiner.appendChild(deleteContainer);

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    listItem.appendChild(editButton);
    
    editButton.onclick = function () {

        let currentText = labelEl.textContent;

        let editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = currentText;

        if (labelEl.parentNode === labelConatiner){
            labelConatiner.replaceChild(editInput, labelEl);
        }

        editInput.focus();

        let isSaved = false;
        function save() {

            if(isSaved) return;
            isSaved = true;

            let updatedText = editInput.value.trim();

            if (updatedText === "") {
                updatedText = currentText;
            }

            labelEl.textContent = updatedText;

            let index = todoList.findIndex(eachTodo =>
                "myTodo" + eachTodo.uniqueId === myTodoId
            );

            if (index !== -1) {
                todoList[index].todo = updatedText;
            }

            if(editInput.parentNode === labelConatiner){
                labelConatiner.replaceChild(labelEl, editInput);
            }
        }

        editInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                save();
            }
    });

        editInput.addEventListener("blur", save);
    };
       
}

for(let eachTodo of todoList){
    generateTodo(eachTodo);
}









