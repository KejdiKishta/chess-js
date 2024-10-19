// cell number
let cellnr = 64;

//* CREATE BOARD
// 8 rows
for (let r = 0; r < 8; r++) {
    // foreach row 8 cells
    for (let c = 0; c < 8; c++) {

        // create cell, add classes needed, append cell to the board
        const cell = document.createElement('div');
        cell.className = 'cell ' + ((r + c) % 2 === 0 ? 'light-square' : 'dark-square');
        cell.setAttribute('data-cell', cellnr);
        document.querySelector('.board').appendChild(cell);

        // increment cell number
        cellnr--
    }
}

//* CREATE PIECES INITIAL POSITION
for (let c = 1; c <= 64; c++) {
    const piece = document.createElement('div');
    
    if (c === 1 || c === 8 || c === 57 || c === 64) {
        piece.textContent = 'rook'; 
        document.querySelector(`[data-cell='${c}']`).appendChild(piece);
    } else if (c === 2 || c === 7 || c === 58 || c === 63) {
        piece.textContent = 'knight'; 
        document.querySelector(`[data-cell='${c}']`).appendChild(piece);
    } else if (c === 3 || c === 6 || c === 59 || c === 62) {
        piece.textContent = 'bishop'; 
        document.querySelector(`[data-cell='${c}']`).appendChild(piece);
    } else if (c === 4 || c === 60) {
        piece.textContent = 'king'; 
        document.querySelector(`[data-cell='${c}']`).appendChild(piece);
    }  else if (c === 5 || c === 61) {
        piece.textContent = 'queen'; 
        document.querySelector(`[data-cell='${c}']`).appendChild(piece);
    } else if ((c > 8 && c < 17) || (c > 48 && c < 57)) {
        piece.textContent = 'pawn'; 
        document.querySelector(`[data-cell='${c}']`).appendChild(piece);
    }
}