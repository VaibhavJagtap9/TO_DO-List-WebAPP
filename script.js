document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('priority');
    const todoList = document.getElementById('todo-list');
    const addTaskButton = document.getElementById('add-task-button');

    // Load tasks from local storage
    loadTodos();

    addTaskButton.addEventListener('click', () => {
        if (todoInput.value.trim() !== '') {
            addTodo(todoInput.value, prioritySelect.value);
            saveTodos();
            todoInput.value = '';
        }
    });

    function addTodo(task, priority) {
        const li = document.createElement('li');
        li.classList.add(priority);
        li.innerHTML = `
            <span class="task">${task}</span>
            <span class="priority">[${priority}]</span>
            <span class="complete">✔</span>
            <span class="edit">✎</span>
            <span class="delete">✖</span>
        `;

        // Mark task as completed
        li.querySelector('.complete').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        // Edit task
        li.querySelector('.edit').addEventListener('click', () => {
            const newTask = prompt('Edit task', task);
            if (newTask) {
                li.querySelector('.task').textContent = newTask;
                saveTodos();
            }
        });

        // Delete task
        li.querySelector('.delete').addEventListener('click', () => {
            todoList.removeChild(li);
            saveTodos();
        });

        todoList.appendChild(li);
    }

    function saveTodos() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(li => {
            tasks.push({
                task: li.querySelector('.task').textContent,
                priority: li.classList[0],
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(tasks));
    }

    function loadTodos() {
        const tasks = JSON.parse(localStorage.getItem('todos')) || [];
        tasks.forEach(task => addTodoWithCompletion(task.task, task.priority, task.completed));
    }

    function addTodoWithCompletion(task, priority, completed) {
        const li = document.createElement('li');
        li.classList.add(priority);
        if (completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            <span class="task">${task}</span>
            <span class="priority">[${priority}]</span>
            <span class="complete">✔</span>
            <span class="edit">✎</span>
            <span class="delete">✖</span>
        `;

        // Mark task as completed
        li.querySelector('.complete').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        // Edit task
        li.querySelector('.edit').addEventListener('click', () => {
            const newTask = prompt('Edit task', task);
            if (newTask) {
                li.querySelector('.task').textContent = newTask;
                saveTodos();
            }
        });

        // Delete task
        li.querySelector('.delete').addEventListener('click', () => {
            todoList.removeChild(li);
            saveTodos();
        });

        todoList.appendChild(li);
    }
});
