function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        let li = document.createElement("li");
        li.innerHTML = '${taskInput.value} <button onclick="removeTask(this)">X</button>;'
        taskList.appendChild(li);
        taskInput.value = "";
    }
}

function removeTask(task) {
    task.parentElement.remove();
}