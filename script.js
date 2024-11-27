// Retrieve the task list from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');

// Add task to the task list
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    saveTasks(tasks);
    renderTasks(tasks);
    taskInput.value = ''; // Clear input
  }
});

// Render tasks from localStorage
function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => editTask(index));

    li.appendChild(editBtn);
    taskList.appendChild(li);
  });
}

// Edit task functionality
function editTask(index) {
  const tasks = getTasks();
  const newTaskText = prompt('Edit Task:', tasks[index].text);
  if (newTaskText) {
    tasks[index].text = newTaskText;
    saveTasks(tasks);
    renderTasks(tasks);
  }
}

// Get tasks from localStorage
function getTasks() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks on page load
function loadTasks() {
  const tasks = getTasks();
  renderTasks(tasks);
}
