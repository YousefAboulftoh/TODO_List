let inputTask = document.querySelector(`.input-task`)
let addBtn = document.querySelector(`.add`)
let tasksContainer = document.querySelector(`.tasks-container`)


let arrayOfTasks = [];

if (localStorage.getItem(`tasks`)) {
    arrayOfTasks = JSON.parse(localStorage.getItem(`tasks`))
}

getDataFromLocalStorage()

addBtn.onclick = function () {
    if (inputTask.value !== "") {
        addTaskToArray(inputTask.value)
        inputTask.value = "";
    }
}
document.addEventListener(`keydown`, e => {
    if (e.key === "Enter") {
        if (inputTask.value !== "") {
            addTaskToArray(inputTask.value)
            inputTask.value = "";
        }
    }
})

document.addEventListener(`click`, e => {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.parentElement.remove()
        deleteElementFromLocalStorage(e.target.parentElement.parentElement.getAttribute(`data-id`))
    }
    if (e.target.classList.contains(`done`)) {
        checkCompleted(e.target.parentElement.parentElement.getAttribute(`data-id`))
        e.target.parentElement.parentElement.classList.toggle(`done`)

    }
})

function addTaskToArray(taskValue) {
    tasksContainer.innerHTML = "";
    let task = {
        id: Date.now(),
        title: taskValue,
        completed: false
    }
    // Add Task To Array
    arrayOfTasks.push(task)
    // Add Task To Page
    addTaskToPageForm(arrayOfTasks)
    // Add arrayOfTasks To LocalStorage
    addTasksToLocalStorage(arrayOfTasks)
}

function addTaskToPageForm(arrayOfTasks) {
    // Create Main Task Div
    arrayOfTasks.forEach(task => {
        let taskDiv = document.createElement(`div`)
        taskDiv.className = `task`
        taskDiv.setAttribute(`data-id`, task.id)
        if (task.completed) {
            taskDiv.className = `task done`
        }
        let content = document.createElement(`div`)
        content.className = "content"
        content.appendChild(document.createTextNode(task.title))
        taskDiv.appendChild(content)
        let links = document.createElement(`div`)
        let del = document.createElement(`span`)
        del.className = "del"
        del.appendChild(document.createTextNode(`Delete`))
        links.appendChild(del)
        let done = document.createElement(`span`)
        done.className = "done"
        done.appendChild(document.createTextNode(`Done`))
        links.appendChild(done)
        taskDiv.appendChild(links)
        tasksContainer.appendChild(taskDiv)
    })
}


function addTasksToLocalStorage(arrayOfTasks) {
    localStorage.setItem(`tasks`, JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage() {
    let data = localStorage.getItem(`tasks`)
    if (data) {
        let tasks = JSON.parse(data)
        addTaskToPageForm(tasks)
    }
}
function deleteElementFromLocalStorage(taskId) {
    arrayOfTasks = arrayOfTasks.filter(task => task.id != taskId)
    addTasksToLocalStorage(arrayOfTasks)
}

function checkCompleted(taskId) {
    arrayOfTasks.forEach((task) => {
        if (task.id == taskId) {
            task.completed === false ? task.completed = true : task.completed = false
        }
    })
    addTasksToLocalStorage(arrayOfTasks)
}