// Array to store tasks
let tasks = [];
let currentIndex = 0;

// Function to add task
function addTask(event) {
  event.preventDefault();
  
  // Get task input value
  const taskInput = document.getElementById('taskInput');
  const taskValue = taskInput.value.trim();
  
  // Get due date value
  const dueDate = document.getElementById('dueDate').value;
  
  if (taskValue !== '') {
    // Create task object
    const task = {
      id: Date.now(),
      name: taskValue,
      dueDate: dueDate,
      completed: false
    };
    
    // Add task to array
    tasks.push(task);
    
    // Clear input field
    taskInput.value = '';
    document.getElementById('dueDate').value = '';
    
    // Display tasks
    displayOneTask();
  }
}

// Function to display one task at a time
function displayOneTask() {
  const taskDisplay = document.getElementById('taskDisplay');
  taskDisplay.innerHTML = '';
  
  const task = tasks[currentIndex];
  if (task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleCompleted(task.id));
    taskDiv.appendChild(checkbox);
    
    // Create task name
    const taskName = document.createElement('span');
    taskName.textContent = task.name;
    taskDiv.appendChild(taskName);
    
    // Create due date
    const dueDate = document.createElement('span');
    dueDate.textContent = task.dueDate ? ` - Due Date: ${task.dueDate}` : '';
    taskDiv.appendChild(dueDate);
    
    taskDisplay.appendChild(taskDiv);
  } else {
    taskDisplay.textContent = 'No more tasks';
  }
}

// Function to toggle task completion
function toggleCompleted(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  
  displayOneTask();
}

// Function to show next task
function showNextTask() {
  currentIndex++;
  if (currentIndex >= tasks.length) {
    currentIndex = 0; // Loop back to the beginning
  }
  displayOneTask();
}

// Event listener for form submission
document.getElementById('taskForm').addEventListener('submit', addTask);

// Display the first task initially
displayOneTask();