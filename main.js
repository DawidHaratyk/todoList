const addTaskBtn = document.querySelector('.add-btn');
const input = document.querySelector('.box-input');
const notification = document.querySelector('.notification');
const tasksContainer = document.querySelector('.tasks-container');
const box = document.querySelector('.box');
const currentTasksNumber = document.querySelector('.counter');

let taskCounter = 0;

const showNotification = (text, backgroundColor) => {
    notification.innerHTML = text;
    notification.classList.add(`${backgroundColor}`);
    setTimeout(() => {
        notification.innerHTML = '';
        notification.classList.remove(`${backgroundColor}`);
    }, 2000);
}

const addTask = (e) => {
    e.preventDefault();

    const inputValue = input.value;

    if (!inputValue) {
        showNotification('The input is empty!', 'red-bgc');
    } else {
        showNotification('The task has been added!', 'green-bgc');
        const divContainer = document.createElement('div');
        divContainer.innerHTML = `<div class="task-content">
        <p class="task">- ${inputValue}</p>
        <button class="remove-btn">Remove task</button>
        <i class="far fa-heart heart-icon"></i>
        <i class="fas fa-heart red-heart"></i>
        </div>`;
        tasksContainer.appendChild(divContainer);

        const removeTaskBtn = document.querySelectorAll('.remove-btn');
        removeTaskBtn.forEach(btn => {
            btn.addEventListener('click', removeTask);
        })

        if (taskCounter === 0) {
            const removeBtnContainer = document.createElement('div');
            removeBtnContainer.classList.add('remove-btn-container');
            box.appendChild(removeBtnContainer);
            removeBtnContainer.innerHTML = `<div class="btn-container">
            <button class="remove-all">Remove all</button>
            </div>`;

            const removeBtn = document.querySelector('.remove-all');
            removeBtn.addEventListener('click', removeAllTasks);
        }

        taskCounter++;
        if (taskCounter > 11) {
            addTaskBtn.removeEventListener('click', addTask);
            addTaskBtn.addEventListener('click', setDefaultBehaviour);
        }
        currentTasksNumber.textContent = taskCounter;

        const heartIcons = document.querySelectorAll('.heart-icon');
        heartIcons.forEach(heart => {
            heart.addEventListener('click', showRedHeart);
        })

        const redHeartIcons = document.querySelectorAll('.red-heart');
        redHeartIcons.forEach(heart => {
            heart.addEventListener('click', showEmptyHeart);
        })
        
    }
    input.value = '';
}

const removeTask = (e) => {
    showNotification('The task has been removed!', 'green-bgc');

    const task = e.target.parentElement.parentElement;
    task.innerHTML = '';
    taskCounter--;
    currentTasksNumber.textContent = taskCounter;

    if (taskCounter === 0) {
        const removeBtnContainer = document.querySelector('.remove-btn-container');
        box.removeChild(removeBtnContainer);
    }

    if (taskCounter < 12) {
        addTaskBtn.addEventListener('click', addTask);
    }
}

const removeAllTasks = (e) => {
    showNotification('All tasks has been removed!', 'green-bgc');

    tasksContainer.innerHTML = '';
    taskCounter = 0;
    currentTasksNumber.textContent = taskCounter;
    const removeBtnContainer = document.querySelector('.remove-btn-container');
    box.removeChild(removeBtnContainer);

    if (taskCounter < 12) {
        addTaskBtn.addEventListener('click', addTask);
    }
}

const showRedHeart = (e) => {
    const taskContent = e.target.previousElementSibling.previousElementSibling.textContent;
    showNotification(`You liked the (${taskContent}) task`, 'green-bgc');

    e.target.style.display = "none";
    e.target.nextElementSibling.style.display = "block";
}

const showEmptyHeart = (e) => {
    const taskContent = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    showNotification(`You unliked the (${taskContent}) task`, 'green-bgc');

    e.target.style.display = "none";
    e.target.previousElementSibling.style.display = "block";
}

const setDefaultBehaviour = (e) => {
    e.preventDefault();
    showNotification('Unfortunately the maximum number of tasks is 12!', 'red-bgc');
}

addTaskBtn.addEventListener('click', addTask);