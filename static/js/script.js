async function loadTasks() {
    try {
        const response = await fetch('/tasks');
        const tasks = await response.json();

        document.querySelectorAll('.tasks').forEach(column => column.innerHTML = '');
        tasks.forEach(task => renderTask(task));
    } catch (error) {
        console.error('Error loading tasks:', error);
        alert('Error loading tasks: ' + error.message);
    }
}

function renderTask(task) {
    const column = document.querySelector(`#${task.status.replace(' ', '-')}-tasks`);
    if (!column) return;

    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.draggable = true;
    taskCard.id = task.ID;
    taskCard.innerHTML = `
        <h6>${task.title}</h6>
        <p class="text-muted small">${task.description}</p>
        <div class="d-flex justify-content-between align-items-center">
            <span class="badge bg-secondary">${task.status}</span>
            <div>
                <button class="btn btn-sm btn-outline-primary" onclick="openEditModal(${task.ID})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.ID})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;

    taskCard.addEventListener('dragstart', drag);
    column.appendChild(taskCard);
}

function allowDrop(ev) {
    ev.preventDefault();
    const column = ev.target.closest('.tasks');
    if (column) column.style.background = '#F3F4F6';
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.opacity = '0.5';
}

async function drop(ev) {
    ev.preventDefault();
    const column = ev.target.closest('.tasks');
    if (column) column.style.background = '#F9FAFB';

    const taskId = ev.dataTransfer.getData("text");
    const newStatus = column.id.split('-')[0];

    try {
        await updateTaskStatus(taskId, newStatus);
        await loadTasks();
    } catch (error) {
        alert('Error updating task status: ' + error.message);
    }
}

async function createTask(taskData) {
    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

async function updateTaskStatus(taskId, newStatus) {
    try {
        const response = await fetch(`/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update task status');
        }
    } catch (error) {
        console.error('Error updating task status:', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', loadTasks);

async function handleAddTask(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const taskData = {
        title: form.title.value,
        description: form.description.value,
        status: form.status.value
    };

    try {
        const newTask = await createTask(taskData);
        renderTask(newTask);
        $('#addTaskModal').modal('hide');
        form.reset();
        form.classList.remove('was-validated');
    } catch (error) {
        alert('Error creating task: ' + error.message);
    }
}

async function openEditModal(taskId) {
    try {
        const response = await fetch(`/tasks/${taskId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch task');
        }

        const task = await response.json();
        const form = document.getElementById('editTaskForm');
        form.id.value = task.ID;
        form.title.value = task.title;
        form.description.value = task.description;
        form.status.value = task.status.toLowerCase();
        $('#editTaskModal').modal('show');
    } catch (error) {
        alert('Error loading task: ' + error.message);
    }
}

async function handleEditTask(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const taskData = {
        title: form.title.value,
        description: form.description.value,
        status: form.status.value
    };

    try {
        await fetch(`/tasks/${form.id.value}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });

        $('#editTaskModal').modal('hide');
        form.classList.remove('was-validated');
        await loadTasks();
    } catch (error) {
        alert('Error updating task: ' + error.message);
    }
}

async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
        await loadTasks();
    } catch (error) {
        alert('Error deleting task: ' + error.message);
    }
}