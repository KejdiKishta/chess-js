//* CREATE BOARD
// object containing all cells
let cells = {};

// class for pieces
class Piece {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.hasMoved = false;
    }
}

// initial position
const initialPieces = {
    // white pieces
    'a1': new Piece('rook', 'white'),
    'b1': new Piece('knight', 'white'),
    'c1': new Piece('bishop', 'white'),
    'd1': new Piece('queen', 'white'),
    'e1': new Piece('king', 'white'),
    'f1': new Piece('bishop', 'white'),
    'g1': new Piece('knight', 'white'),
    'h1': new Piece('rook', 'white'),
    'a2': new Piece('pawn', 'white'),
    'b2': new Piece('pawn', 'white'),
    'c2': new Piece('pawn', 'white'),
    'd2': new Piece('pawn', 'white'),
    'e2': new Piece('pawn', 'white'),
    'f2': new Piece('pawn', 'white'),
    'g2': new Piece('pawn', 'white'),
    'h2': new Piece('pawn', 'white'),
    
    // black pieces
    'a8': new Piece('rook', 'black'),
    'b8': new Piece('knight', 'black'),
    'c8': new Piece('bishop', 'black'),
    'd8': new Piece('queen', 'black'),
    'e8': new Piece('king', 'black'),
    'f8': new Piece('bishop', 'black'),
    'g8': new Piece('knight', 'black'),
    'h8': new Piece('rook', 'black'),
    'a7': new Piece('pawn', 'black'),
    'b7': new Piece('pawn', 'black'),
    'c7': new Piece('pawn', 'black'),
    'd7': new Piece('pawn', 'black'),
    'e7': new Piece('pawn', 'black'),
    'f7': new Piece('pawn', 'black'),
    'g7': new Piece('pawn', 'black'),
    'h7': new Piece('pawn', 'black'),
};

// 8 rows
for (let r = 8; r >= 1; r--) {
    // 8 columns
    for (let c = 97; c <= 104; c++) {
        // from chart 'A' to chart 'H', the chessboard rows
        const col = String.fromCharCode(c);

        // save cell name to use it as a key
        const cellName = col + r;
        const cellClasses = 'cell ' + ((r + c) % 2 === 0 ? 'light-square ' : 'dark-square ') + (r === 1 || c === 97 ? 'position-relative' : '');

        // piece
        const piece = initialPieces[cellName] || null;

        // add the cell in the object
        cells[cellName] = {
            name: cellName,
            class: cellClasses,
            piece: piece,
            highlight: null,
        };
    }
}

// select board
const board = document.querySelector('.board');

for (let [key, value] of Object.entries(cells)) {
    // set attributes and classes
    const cell = document.createElement('div');
    cell.className = value.class;
    cell.setAttribute('data-name', key);

    // add piece if exists
    if (value.piece) {
        const piece = document.createElement('div');
        piece.className = `${value.piece.color} ${value.piece.type}`;
        cell.appendChild(piece);
    }

    // get object in case is needed
    cell.addEventListener('click', () => {
        const clickedCell = cells[key];
        console.log(clickedCell);
    });

    // create cell
    board.appendChild(cell);
}