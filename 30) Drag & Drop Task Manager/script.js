function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    task.ondragstart = drag;
    task.textContent = taskText;

    document.getElementById("todo").appendChild(task);
    taskInput.value = "";
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let draggedElement = event.dataTransfer.getData("text");
    let draggedTask = document.getElementById(draggedElement);

    if (!draggedTask) {
        draggedTask = document.createElement("div");
        draggedTask.className = "task";
        draggedTask.draggable = true;
        draggedTask.ondragstart = drag;
        draggedTask.textContent = event.dataTransfer.getData("text/plain");
    }
    
    event.target.appendChild(draggedTask);
}