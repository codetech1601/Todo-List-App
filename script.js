const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clr-btn"),
taskBox = document.querySelector(".task-box");

let editId;
let isEditedTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn =>
  {
btn.addEventListener("click",()=>{
  document.querySelector("span.active").classList.remove("active");
  btn.classList.add("active");
  showTodo(btn.id);
});
  });

function showTodo(filter){
    let lit="";
    if(todos)
    {
todos.forEach((todo,id) => {
  let isCompleted = todo.status == "completed" ? "checked" : "";
  if(filter==todo.status || filter=="all"){
    lit=lit+` <li class="task">
    <label for="${id}">
     <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
       <p class="${isCompleted}">${todo.name}</p>
    </label>
    <div class="settings">
      <i onClick="showMenu(this)" class="uil uil-ellipsis-h"></i>
      <ul class="task-menu">
        <li onclick='editTask(${id},"${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
        <li onclick='deleteTask(${id},"${filter}")'><i class="uil uil-trash"></i>Delete</li>
      </ul>
    </div>
  </li>`;
  }
});
    }
taskBox.innerHTML=lit || `<span>you dont have any task here</span>`;
let checkTask = taskBox.querySelectorAll(".task");
!checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");


}
showTodo("all");


function showMenu(selectedTask)
{
let taskMenu = selectedTask.parentElement.lastElementChild;
taskMenu.classList.add("show");
document.addEventListener("click",e=>{
  if(e.target.tagName!="I" || e.target !=selectedTask){
    taskMenu.classList.remove("show");
  }
})
}

function editTask(taskId,taskName)
{
  editId=taskId;
  isEditedTask=true;
  taskInput.value=taskName;
  taskInput.focus();
    taskInput.classList.add("active");
}


function deleteTask(deletedId,filter)
{
  isEditedTask = false;
  todos.splice(deletedId,1);
  localStorage.setItem("todo-list",JSON.stringify(todos));
  showTodo(filter);
}

clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo()
});

function updateStatus(selectedTask){
  let taskName = selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked)
  {
taskName.classList.add("checked");
   todos[selectedTask.id].status="completed";
  }
  else{
    taskName.classList.remove("checked");
    todos[selectedTask.id].status="pending";
  }
  localStorage.setItem("todo-list",JSON.stringify(todos));
}

taskInput.addEventListener("keyup",e => {
let userTask = taskInput.value.trim();
if(e.key=="Enter" && userTask){
if(!isEditedTask){
  todos = !todos ? [] : todos;
        let taskInfo={name: userTask, status:"pending"};
   todos.push(taskInfo);
    
  }
  else{
    isEditedTask=false;
    todos[editId].name=userTask;
  }
    taskInput.value="";
   
   localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
}
});