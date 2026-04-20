document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskCluster = document.getElementById('task-cluster');
    const noTasksMsg = document.getElementById('no-tasks-msg');

    // --- Orb Colors Palette ---
    const orbColors = [
        '#ff5722', '#ff9800', '#ffc107', '#ffeb3b', // Oranges/Yellows
        '#cddc39', '#8bc34a', '#4caf50',           // Greens
        '#00bcd4', '#03a9f4', '#2196f3',           // Blues
        '#3f51b5', '#673ab7', '#9c27b0',           // Purples/Indigos
        '#e91e63', '#f44336'                       // Pinks/Reds
    ];

    // --- Load Tasks ---
    loadTasks();

    // --- Event Listeners ---
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addOrb();
    });

    taskCluster.addEventListener('click', handleOrbActions);

    // --- Functions ---

    function getRandomColor() {
        return orbColors[Math.floor(Math.random() * orbColors.length)];
    }

    function addOrb(taskData = null, fromLoad = false) {
        const taskText = taskData ? taskData.text : taskInput.value.trim();
        const taskId = taskData ? taskData.id : `orb-${Date.now()}`;
        const isCompleted = taskData ? taskData.completed : false;
        const orbColor = taskData ? taskData.color : getRandomColor();

        if (!taskText) return; // Don't add empty tasks

        const orb = document.createElement('div');
        orb.classList.add('task-orb');
        orb.dataset.id = taskId; // Assign unique ID
        orb.style.setProperty('--orb-color', orbColor); // Set custom property for color

        if (isCompleted) {
            orb.classList.add('completed');
        }

        // Orb Glow Element
        const glow = document.createElement('div');
        glow.classList.add('orb-glow');

        // Task Text Span
        const textSpan = document.createElement('span');
        textSpan.classList.add('task-text');
        textSpan.textContent = taskText;

        // Orb Actions Div
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('orb-actions');

        // Complete Button
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.title = isCompleted ? "Mark Incomplete" : "Mark Complete";
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.title = "Delete Task";
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>'; // Using 'times' for a different look

        // Append elements
        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(deleteBtn);
        orb.appendChild(glow); // Add glow first (rendered behind)
        orb.appendChild(textSpan);
        orb.appendChild(actionsDiv);

        // Append orb to cluster
        taskCluster.appendChild(orb);

        // Only clear input and save if it's a new task, not from load
        if (!fromLoad) {
             taskInput.value = '';
             saveTasks();
        }

        updateNoTasksMessage();

         // If adding from load, skip the spawn animation by removing it after a tick
         if (fromLoad) {
            requestAnimationFrame(() => {
                orb.style.animation = 'none'; // Prevent re-animation on load
            });
        }
    }

    function handleOrbActions(e) {
        const target = e.target;
        const orb = target.closest('.task-orb');
        if (!orb) return; // Clicked outside an orb

        // Complete Action
        if (target.closest('.complete-btn')) {
            orb.classList.toggle('completed');
             // Update title
            const completeBtn = orb.querySelector('.complete-btn');
            completeBtn.title = orb.classList.contains('completed') ? "Mark Incomplete" : "Mark Complete";
            saveTasks();
        }
        // Delete Action
        else if (target.closest('.delete-btn')) {
            deleteOrb(orb);
        }
    }

    function deleteOrb(orb) {
         // Add deleting class for animation
        orb.classList.add('deleting');

        // Remove after animation
        orb.addEventListener('animationend', () => {
             if(orb.parentNode) { // Check if still in DOM
                orb.remove();
                saveTasks();
                updateNoTasksMessage();
            }
        }, { once: true });
    }


    function saveTasks() {
        const orbs = [];
        taskCluster.querySelectorAll('.task-orb:not(.deleting)').forEach(orb => {
            orbs.push({
                id: orb.dataset.id,
                text: orb.querySelector('.task-text').textContent,
                completed: orb.classList.contains('completed'),
                color: orb.style.getPropertyValue('--orb-color')
            });
        });
        localStorage.setItem('taskNebulaTasks', JSON.stringify(orbs));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem('taskNebulaTasks');
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(task => addOrb(task, true)); // Pass true for fromLoad
        }
        updateNoTasksMessage();
    }

    function updateNoTasksMessage() {
        const taskOrbs = taskCluster.querySelectorAll('.task-orb:not(.deleting)');
        if (taskOrbs.length === 0) {
            noTasksMsg.classList.remove('hidden');
             taskCluster.style.alignContent = 'center'; // Center message vertically if empty
        } else {
            noTasksMsg.classList.add('hidden');
             taskCluster.style.alignContent = 'flex-start'; // Reset alignment
        }
    }

});