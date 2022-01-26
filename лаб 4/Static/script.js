function initBoard() {
    let board  = document.getElementById('board');
    for (i = 0; i < 9; i++) {
        let boardCall = document.createElement('div');
        boardCall.classList.add('cell');
        board.append(boardCall);
    }
    return board;
}

function checkWinner() {
    let cells = document.querySelectorAll('.cell');
    let row, column, diag1, diag2;
    for (i = 0 ; i < 3 ; i++) {
        row =  (cells[i * 3].innerHTML != '');
        column = (cells[i].innerHTML != '');
        diag1 = (cells[0].innerHTML != '');
        diag2 = (cells[2].innerHTML != '');
        for (j = 0; j < 2; j++) {
            row = row && (cells[i * 3 + j].innerHTML) == (cells[i * 3 + j + 1].innerHTML);
            column = column && (cells[j * 3 + i].innerHTML) == (cells[(j + 1) * 3 + i].innerHTML);
            diag1 = diag1 && (cells[j * 3 + j].innerHTML) == (cells[(j + 1) * 3 + j + 1].innerHTML);
            diag2 = diag2 && (cells[j * 3 + 2 - j].innerHTML) == (cells[(j + 1) * 3 + 2 - (j + 1)].innerHTML);
        }
            

        if (row || column || diag1 || diag2) return true;
    }
}

let turn = 0;
let counter = 0;
let flag = true;

function clickHandler(event) {
    counter++;
    if (event.target.className == 'cell') {
        if (event.target.innerHTML != '') 
            showMessage ('Клетка уже занята', 'error');
        else if (flag){
            event.target.innerHTML = turn == 0 ? 'x' : 'o';
            turn = (turn + 1) % 2;
        } else 
            showMessage('Игра закончена', 'error')
    }

    let winner = checkWinner();
    
    if (winner) {
        flag = false;
        win = turn == 0 ? 'O' : 'X';
        showMessage (win + ' выиграл!!!', 'success');
    } else if (counter == 9) 
        showMessage ('Ничья', 'success');
}

function newGame() {
    let cells = document.querySelectorAll('.cell');
    for (i = 0; i < 9; i++)
        cells[i].innerHTML = '';
    turn = 0;
    counter = 0;
    flag = true;
}

function showMessage(msg, category){
    let msgContainer = document.querySelector('.message');
    let msgElement = document.createElement('div');
    msgElement.innerHTML = msg;
    msgElement.classList.add('msg');
    msgElement.classList.add(category);
    msgContainer.append(msgElement);
    setTimeout(() => msgElement.remove(), 2000);
}

window.onload = function() {
    let board = initBoard();
    board.onclick = clickHandler;
    let btn  = document.getElementById('btn-new-game').onclick = newGame;
}