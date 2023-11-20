const addTask = document.querySelector(".create"),
    clearTasks = document.querySelector(".remove-all"),
    taskInput = document.querySelector("#taskInput"),
    tasksList = document.querySelector("#tasksList"),
    failedTask = document.querySelector("#tasksList");



addTask.addEventListener("click", addNewTask);
clearTasks.addEventListener("click", removeAll);
tasksList.addEventListener("click", removeTask);
tasksList.addEventListener("click", MarkDone);

class Task{
    constructor(taskName, taskDate, taskPriority,) {
        this.taskName = taskName;
        this.taskDate = taskDate;
        this.taskPriority = taskPriority;
    }
}

const ToDoList = Array();

//Добавить задачу
function addNewTask(event){
    event.preventDefault();
    //Записываем имя таски
    const taskName = taskInput.value
    //Вычисляем приоритет таски в зависимости от выбранной опции
    const taskPriority = document.getElementById("selectPriority").value
    let eventPriorityStyle;
    switch(taskPriority){
        case "Высокий": 
            eventPriorityStyle = "high";
            break;
        case "Средний": 
            eventPriorityStyle = "medium";
            break;
        case "Низкий": 
            eventPriorityStyle = "low";
            break;
    }
    if (taskInput.value == ''){
        alert("Необходимо ввести текст задачи");
        return
    }
    const date = "2023-11-20T00:00Z";
    const task = new Task(taskName, date, taskPriority)
    ToDoList.push(task);

    ToDoList.forEach(function (el){
        if (el.taskName === taskName) {
            const taskElement = `
        <li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${task.taskName}</span>
            <span class="task-priority ${eventPriorityStyle}">Приоритет: ${task.taskPriority}</span>
            <span class="mark-failed"></span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                 <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="failed" class="btn-action">
                    <img src="./img/cross.svg" alt="Failed" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/trash.svg" alt="Delete" width="18" height="18">
                </button>
            </div>
        </li>
        `;
            tasksList.insertAdjacentHTML("beforeend", taskElement);
        }else{

        }
    })
    if (tasksList.childElementCount > 1){
        const emptyList = document.querySelector("#emptyList");
        emptyList.classList.add('none');
    }
    taskInput.value = "";
    console.log(ToDoList);
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
        if (parentNode.childNodes[5].innerHTML == '' ){
            taskItem.classList.add('task-title--done');
            let cancelDate = new Date();
            parentNode.querySelector('.mark-failed').append(`Выполнено в ${cancelDate.getHours()}:${cancelDate.getMinutes()} ${cancelDate.getDay()+3}/${cancelDate.getMonth() + 1}/${cancelDate.getFullYear()} `);
        }
    }  
}
//Удалить все задачи
function removeAll(event){
    event.preventDefault();
    if (event.target.className == 'btn btn-primary  btn-lg remove-all'){
        let parentNode = document.querySelector('#tasksList');
        const childNode = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
        </li>`;
        while(parentNode.firstChild){
            parentNode.removeChild(parentNode.firstChild);
        }
        parentNode.insertAdjacentHTML("afterbegin", childNode);
    }
}
// Пометить задачу, как отмененную
function failTask(event){
    const parentNode = event.target.closest('.list-group-item'),
        markAsFailed = parentNode.querySelector('.mark-failed'),
        firstElement = parentNode.childNodes[1],
        completeCheck = firstElement.classList.contains('task-title--done');
    let cancelDate = new Date();
    if(event.target.dataset.action == 'failed' && markAsFailed.innerHTML == '' && completeCheck === false){
        parentNode.querySelector('.mark-failed').append(`Отменено в ${cancelDate.getHours()}:${cancelDate.getMinutes()} ${cancelDate.getDay() + 3}/${cancelDate.getMonth() + 1}/${cancelDate.getFullYear()} `);
        const taskItem = parentNode.querySelector('.task-title');
        taskItem.classList.add('task-title--done');
    }
}




