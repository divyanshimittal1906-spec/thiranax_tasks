const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", addTask);

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        renderTasks(btn.dataset.filter);
    });
});

function addTask(){

    if(taskInput.value.trim() === "") return;

    const task = {
        id: Date.now(),
        text: taskInput.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";
}

function renderTasks(filter = "all"){

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(filter === "active"){
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(filter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">
                <button onclick="toggleTask(${task.id})">
                    ✓
                </button>

                <button onclick="editTask(${task.id})">
                    Edit
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(id){

    tasks = tasks.map(task =>
        task.id === id
        ? {...task, completed: !task.completed}
        : task
    );

    saveTasks();

    renderTasks();
}

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
}

function editTask(id){

    const newText = prompt("Edit Task");

    if(!newText) return;

    tasks = tasks.map(task =>
        task.id === id
        ? {...task, text:newText}
        : task
    );

    saveTasks();

    renderTasks();
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}