//const form = document.querySelector("#form");
const addTask = document.querySelector(".create");
const clearTasks = document.querySelector(".remove-all");


const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");


//form.addEventListener("submit", addNewTask)
addTask.addEventListener("click", addNewTask);
clearTasks.addEventListener("click", removeAll);
tasksList.addEventListener("click", removeTask);
tasksList.addEventListener("click", MarkDone);

//Добавить задачу
function addNewTask(event){
    event.preventDefault();
    if (taskInput.value == ''){
        alert("Необходимо ввести текст задачи");
        return
    }
    const taskName = taskInput.value;
    const taskElement = `
        <li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${taskName}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                 <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>
        `;
        tasksList.insertAdjacentHTML("beforeend", taskElement);
        
    


    if (tasksList.childElementCount > 1){
        emptyList.classList.add('none');
    }
    
    taskInput.value = "";
}
// Удалить одну задачу
function removeTask(event){
    if (event.target.dataset.action == 'delete'){
        const parentNode = event.target.closest('.list-group-item');
        parentNode.remove();
        if (tasksList.childElementCount == 1){
            emptyList.classList.remove('none');
        }
    }
}
//Пометить задачу как готовую
function MarkDone(event){
    if (event.target.dataset.action == 'done'){
        const parentNode = event.target.closest('.list-group-item');
        const taskItem = parentNode.querySelector('.task-title');
        taskItem.classList.toggle('task-title--done');
    }
}
//Удалить все задачи
function removeAll(event){
    if (event.target.className == 'btn btn-primary  btn-lg remove-all'){


    }
}
