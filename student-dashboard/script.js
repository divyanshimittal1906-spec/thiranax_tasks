// Dark Mode
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// ----------------------
// Task Manager
// ----------------------
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    taskList.innerHTML = "";

    let completed = 0;

    tasks.forEach((task, index) => {

        if (task.completed) completed++;

        const li = document.createElement("li");

        li.innerHTML = `
            <span style="${task.completed ? 'text-decoration:line-through;' : ''}">
                ${task.text}
            </span>

            <div>
                <button onclick="toggleTask(${index})">✓</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    document.getElementById("task-count").textContent = tasks.length;
    document.getElementById("completed-count").textContent = completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", () => {

    if (taskInput.value.trim() === "") return;

    tasks.push({
        text: taskInput.value,
        completed: false
    });

    taskInput.value = "";

    renderTasks();
});

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// ----------------------
// Weather
// ----------------------
const weatherBtn = document.getElementById("weatherBtn");
const cityInput = document.getElementById("cityInput");

weatherBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }
});

async function getWeather(city) {

    try {

        document.getElementById("cityName").textContent = "Loading...";

        const response = await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        const data = await response.json();

        document.getElementById("cityName").textContent =
            city.charAt(0).toUpperCase() + city.slice(1);

        document.getElementById("temperature").textContent =
            `Temperature: ${data.current_condition[0].temp_C} °C`;

        document.getElementById("humidity").textContent =
            `Humidity: ${data.current_condition[0].humidity}%`;

        document.getElementById("condition").textContent =
            `Condition: ${data.current_condition[0].weatherDesc[0].value}`;
        document.getElementById("wind").textContent =
    `Wind Speed: ${data.current_condition[0].windspeedKmph} km/h`;

    } catch (error) {
        alert("Unable to fetch weather data");
    }
}

// ----------------------
// Notes Section
// ----------------------
const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {

    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {

        const div = document.createElement("div");
        div.classList.add("note");

        div.innerHTML = `
            <p>${note}</p>
            <button onclick="deleteNote(${index})">
                Delete
            </button>
        `;

        notesContainer.appendChild(div);
    });

    document.getElementById("notes-count").textContent = notes.length;

    localStorage.setItem("notes", JSON.stringify(notes));
}

saveNoteBtn.addEventListener("click", () => {

    if (noteInput.value.trim() === "") return;

    notes.push(noteInput.value);

    noteInput.value = "";

    renderNotes();
});

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

// Initial Render
renderTasks();
renderNotes();