// cell number
let cellnr = 1;

// 8 rows
for (let r = 0; r < 8; r++) {
    // foreach row 8 cells
    for (let c = 0; c < 8; c++) {

        // create cell, add classes needed, append cell to the board
        const cell = document.createElement('div');
        cell.className = 'cell ' + ((r + c) % 2 === 0 ? 'light-square ' : 'dark-square ') + cellnr;
        document.querySelector('.board').appendChild(cell);

        // increment cell number
        cellnr++;
    }
}