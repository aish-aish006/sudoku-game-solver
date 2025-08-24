document.addEventListener('DOMContentLoaded', function () {
    const solveBtn = document.getElementById('solve-btn');
    const sudokuGrid = document.getElementById('sudoku-grid');

    function createGrid() {
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `cell-${i}-${j}`;
            input.maxLength = 1;

            // ✅ Real-time input validation
            input.addEventListener('input', () => {
                const val = input.value;

                // Allow empty input (for clearing)
                if (val === '') return;

                const num = parseInt(val);
                if (isNaN(num) || num < 1 || num > 9) {
                    alert('Invalid input! Please enter a number between 1 and 9.');
                    input.value = '';
                }
            });

            cell.appendChild(input);
            row.appendChild(cell);
        }
        sudokuGrid.appendChild(row);
    }
}


   function getBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            const input = document.getElementById(`cell-${i}-${j}`);
            const value = input.value;
            if (value === '') {
                row.push(0); // Empty cell
            } else {
                const num = parseInt(value);
                if (isNaN(num) || num < 1 || num > 9) {
                    alert(`Invalid input at row ${i + 1}, column ${j + 1}. Please enter a number between 1 and 9.`);
                    input.focus();
                    return null;
                }
                row.push(num);
            }
        }
        board.push(row);
    }
    return board;
}



        const isValid = (board, row, col, num) => {
            for (let j = 0; j < 9; j++) {
                if (board[row][j] === num) return false;
            }
            for (let i = 0; i < 9; i++) {
                if (board[i][col] === num) return false;
            }
            const startRow = Math.floor(row / 3) * 3;
            const startCol = Math.floor(col / 3) * 3;
            for (let i = startRow; i < startRow + 3; i++) {
                for (let j = startCol; j < startCol + 3; j++) {
                    if (board[i][j] === num) return false;
                }
            }
            return true;
        };

        const solve = () => {
            const empty = findEmpty(board);
            if (!empty) return true;
            const [row, col] = empty;

            for (let num = 1; num <= 9; num++) {
                if (isValid(board, row, col, num)) {
                    board[row][col] = num;
                    if (solve()) return true;
                    board[row][col] = 0;
                }
            }
            return false;
        };

        solve();
        return board;
    }

function getBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            const input = document.getElementById(`cell-${i}-${j}`);
            const val = input.value;

            if (val === "") {
                row.push(0); // empty cell
            } else if (/^[1-9]$/.test(val)) {
                row.push(parseInt(val));
            } else {
                alert(`Invalid input at row ${i + 1}, column ${j + 1}. Please enter a number between 1 and 9.`);
                input.value = "";
                input.focus();
                throw new Error("Aborting due to invalid input.");
            }
        }
        board.push(row);
    }
    return board;
}





    function setBoard(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const input = document.getElementById(`cell-${i}-${j}`);
                input.value = board[i][j] === 0 ? '' : board[i][j];
            }
        }
    }

solveBtn.addEventListener('click', () => {
    const board = getBoard();
    if (board === null) return; // Stop if invalid input
    const solvedBoard = solveSudoku(board);
    setBoard(solvedBoard);
});






    createGrid();
});
