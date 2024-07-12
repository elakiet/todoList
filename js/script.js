class Task {
    constructor(title, description, dueDate = null, completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate; // Optional due date
        this.completed = completed;
    }
}

class ToDoList {
    constructor() {
        this.tasks = [];
        this.loadTasksFromStorage(); // Load tasks from local storage
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasksToStorage();
        this.renderTasks();
    }

    editTask(index, newTask) {
        this.tasks[index] = newTask;
        this.saveTasksToStorage();
        this.renderTasks();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasksToStorage();
        this.renderTasks();
    }

    toggleTaskCompletion(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasksToStorage();
        this.renderTasks();
    }

    // ... (Local Storage methods below)

    saveTasksToStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    loadTasksFromStorage() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
    }

    renderTasks() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // Clear existing tasks

        this.tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = task.title;

            if (task.completed) {
                listItem.classList.add("completed");
            }

            // Add event listeners for editing, deleting, and marking complete
            listItem.addEventListener("click", () => {
                this.toggleTaskCompletion(index);
            });

            // ... (Add event listeners for editing and deleting)

            taskList.appendChild(listItem);
        });
    }
}

// Initialize the to-do list
const toDoList = new ToDoList();

// Get the DOM elements
const newTaskInput = document.getElementById("newTaskInput");
const addTaskButton = document.getElementById("addTaskButton");

// Add task event listener
addTaskButton.addEventListener("click", () => {
    const newTaskTitle = newTaskInput.value;
    if (newTaskTitle) {
        const newTask = new Task(newTaskTitle);
        toDoList.addTask(newTask);
        newTaskInput.value = ""; // Clear input field
    }
});