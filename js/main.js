const addTask = document.querySelector(".create");
const clearTasks = document.querySelector(".remove-all");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const failedTask = document.querySelector("#tasksList");


addTask.addEventListener("click", addNewTask);
clearTasks.addEventListener("click", removeAll);
tasksList.addEventListener("click", removeTask);
tasksList.addEventListener("click", MarkDone);
failedTask.addEventListener("click", failTask);

//Добавить задачу
function addNewTask(event){
    event.preventDefault();
    const eventPriorityName = document.getElementById("selectPriority").value;
    let eventPriorityStyle;

    switch(eventPriorityName){
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
    const taskName = taskInput.value;
    const taskElement = `
        <li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${taskName}</span>
            <span class="task-priority ${eventPriorityStyle}">Приоритет: ${eventPriorityName}</span>
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
    if (tasksList.childElementCount > 1){
        const emptyList = document.querySelector("#emptyList");
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
        if (parentNode.childNodes[5].innerHTML == '' ){
            taskItem.classList.add('task-title--done');
            let cancelDate = new Date();
            parentNode.querySelector('.mark-failed').append(`Выполнено в ${cancelDate.getHours()}:${cancelDate.getMinutes()} ${cancelDate.getDay()+3}/${cancelDate.getMonth() + 1}/${cancelDate.getFullYear()} `);
        }else if (parentNode.childNodes[5].innerHTML !== '' ){
            parentNode.childNodes[5].innerHTML = '' ;
            taskItem.classList.remove('task-title--done');
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
    const parentNode = event.target.closest('.list-group-item');
    const markAsFailed = parentNode.querySelector('.mark-failed');
    const firstElement = parentNode.childNodes[1];
    const completeCheck = firstElement.classList.contains('task-title--done');
    let cancelDate = new Date();
    if(event.target.dataset.action == 'failed' && markAsFailed.innerHTML == '' && completeCheck === false){
        parentNode.querySelector('.mark-failed').append(`Отменено в ${cancelDate.getHours()}:${cancelDate.getMinutes()} ${cancelDate.getDay() + 3}/${cancelDate.getMonth() + 1}/${cancelDate.getFullYear()} `);
    }else if (event.target.dataset.action == 'failed' && markAsFailed.innerHTML !== ''  && completeCheck === false){
        parentNode.querySelector('.mark-failed').innerText = '';    
    }
}