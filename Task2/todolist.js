document.getElementById('createBoardBtn').addEventListener('click', createBoard);
document.getElementById('addTaskBtn').addEventListener('click', addTask);

let boards = JSON.parse(localStorage.getItem('boards')) || [];
let currentBoardIndex = null;

function renderBoards() {
    const boardList = document.getElementById('boardList');
    boardList.innerHTML = ''; 

    boards.forEach((board, index) => {
        const boardItem = document.createElement('li');
        boardItem.classList.add('board-item');
        boardItem.textContent = board.name;
        boardItem.addEventListener('click', () => switchBoard(index));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteBoard(index);
        });

        boardItem.appendChild(deleteBtn);
        boardList.appendChild(boardItem);
    });
}

function createBoard() {
    const boardName = document.getElementById('boardName').value.trim();
    if (boardName) {
        const newBoard = { name: boardName, tasks: [] };
        boards.push(newBoard);
        localStorage.setItem('boards', JSON.stringify(boards));
        renderBoards();
        document.getElementById('boardName').value = ''; 
    }
}

function deleteBoard(index) {
    boards.splice(index, 1);
    localStorage.setItem('boards', JSON.stringify(boards));
    renderBoards();
    document.getElementById('taskList').innerHTML = ''; 
    currentBoardIndex = null;
}

function switchBoard(index) {
    currentBoardIndex = index;
    document.getElementById('taskList').innerHTML = ''; 
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 

    if (currentBoardIndex !== null) {
        const currentBoard = boards[currentBoardIndex];
        currentBoard.tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(index));

            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
            toggleBtn.addEventListener('click', () => toggleTaskCompletion(index));

            taskItem.appendChild(deleteBtn);
            taskItem.appendChild(toggleBtn);
            taskList.appendChild(taskItem);
        });
    }
}

function addTask() {
    if (currentBoardIndex !== null) {
        const taskText = document.getElementById('taskInput').value.trim();
        if (taskText) {
            const newTask = { text: taskText, completed: false };
            boards[currentBoardIndex].tasks.push(newTask);
            localStorage.setItem('boards', JSON.stringify(boards));
            renderTasks();
            document.getElementById('taskInput').value = ''; 
        }
    } else {
        alert('Please select a board first!');
    }
}

function deleteTask(index) {
    boards[currentBoardIndex].tasks.splice(index, 1);
    localStorage.setItem('boards', JSON.stringify(boards));
    renderTasks();
}

function toggleTaskCompletion(index) {
    const currentBoard = boards[currentBoardIndex];
    currentBoard.tasks[index].completed = !currentBoard.tasks[index].completed;
    localStorage.setItem('boards', JSON.stringify(boards));
    renderTasks();
}
renderBoards();
