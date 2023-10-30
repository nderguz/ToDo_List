const addTask = document.querySelector(".create"),
    clearTasks = document.querySelector(".remove-all"),
    taskInput = document.querySelector("#taskInput"),
    tasksList = document.querySelector("#tasksList"),
    failedTask = document.querySelector("#tasksList");



addTask.addEventListener("click", addNewTask);
clearTasks.addEventListener("click", removeAll);
tasksList.addEventListener("click", removeTask);
tasksList.addEventListener("click", MarkDone);



const ToDoList = Array();


//Добавить задачу
function addNewTask(event){
    event.preventDefault();
    // Создаем объект с таской
    const ToDoItem = {};
    //Записываем имя таски
    ToDoItem.itemName = taskInput.value
    //Вычисляем приоритет таски в зависимости от выбранной опции
    ToDoItem.priority = document.getElementById("selectPriority").value;
    let eventPriorityStyle;
    switch(ToDoItem.priority){
        case "Высокий": 
            eventPriorityStyle = "high";
            ToDoItem.priorityStyle = eventPriorityStyle;
            break;
        case "Средний": 
            eventPriorityStyle = "medium";
            ToDoItem.priorityStyle = eventPriorityStyle;
            break;
        case "Низкий": 
            eventPriorityStyle = "low";
            ToDoItem.priorityStyle = eventPriorityStyle;
            break;
    }
    if (taskInput.value == ''){
        alert("Необходимо ввести текст задачи");
        return
    }
    ToDoList.push(ToDoItem);

    const taskElement = `
        <li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${ToDoItem.itemName}</span>
            <span class="task-priority ${eventPriorityStyle}">Приоритет: ${ToDoItem.priority}</span>
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




