const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];

// Load saved tasks on page load
window.onload = () => {
    renderTasks();
};

// Add task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
});

// Render all tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item" + (task.completed ? " completed" : "");

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;
        span.addEventListener("click", () => toggleComplete(index));

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️";
        editBtn.className = "edit-btn";
        editBtn.title = "Edit";
        editBtn.addEventListener("click", () => editTask(index));

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "🗑️";
        deleteBtn.className = "delete-btn";
        deleteBtn.title = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(index));

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

// Delete task
function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("dailyTasks", JSON.stringify(tasks));
}