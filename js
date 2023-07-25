const addTaskBtn = document.getElementById('addTaskBtn');
const taskDialog = document.getElementById('taskDialog');
const taskForm = document.getElementById('taskForm');
const cancelBtn = document.getElementById('cancelBtn');
const inProgressTasks = document.getElementById('inProgressTasks');
const completedTasks = document.getElementById('completedTasks');

addTaskBtn.addEventListener('click', () => {
  taskDialog.showModal();
});

cancelBtn.addEventListener('click', () => {
  taskDialog.close();
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('title');
    const description = document.getElementById('description').value;
    const assignee = document.getElementById('assignee').value;
  
    // Get the trimmed value of the title and check its length
    const title = titleInput.value.trim();
    if (title.length > 50) {
      alert('Title cannot exceed 50 characters!');
      return; // Don't proceed if the title is too long
    }
  
    if (description.length > 250) {
        alert('Description cannot exceed 250 characters!');
        return; // Don't proceed if the description is too long
      }
    const task = { title, description, assignee, completed: false };
    addTaskToLocalStorage(task);
    taskDialog.close();
    displayTasks();
  });
  

function addTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
  inProgressTasks.innerHTML = '';
  completedTasks.innerHTML = '';
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <strong>${task.title}</strong><br>
      Description: ${task.description}<br>
      Assignee: ${task.assignee}<br>
      <button onclick="markAsCompleted(${index})">Mark as Completed</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    if (task.completed) {
      taskItem.classList.add('completed');
      completedTasks.appendChild(taskItem);
    } else {
      inProgressTasks.appendChild(taskItem);
    }
  });
}

function markAsCompleted(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[index].completed = true;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

displayTasks();
