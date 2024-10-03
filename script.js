document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = {
            text: taskText,
            completed: false,
            dateAdded: new Date().toLocaleString()
        };
        renderTask(task);
        taskInput.value = '';
    }
}

function renderTask(task) {
    const pendingTasksList = document.getElementById('pendingTasks');
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>${task.text} (Added: ${task.dateAdded})</span>
        <div>
            <button onclick="markComplete(this)">Complete</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    pendingTasksList.appendChild(taskItem);
}

function markComplete(button) {
    const taskItem = button.parentElement.parentElement;
    const completedTasksList = document.getElementById('completedTasks');
    
    taskItem.querySelector('span').classList.add('completed');
    completedTasksList.appendChild(taskItem);
    button.textContent = 'Undo';
    button.onclick = function() { undoComplete(this); };
}

function undoComplete(button) {
    const taskItem = button.parentElement.parentElement;
    const pendingTasksList = document.getElementById('pendingTasks');

    taskItem.querySelector('span').classList.remove('completed');
    pendingTasksList.appendChild(taskItem);
    button.textContent = 'Complete';
    button.onclick = function() { markComplete(this); };
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
}