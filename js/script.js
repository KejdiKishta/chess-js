// object containing all cells
let cells = {};

// we save a cell when selected
let selectedCellKey = null;

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

    // select and move pieces
    cell.addEventListener('click', () => {
        // key of the object and element in the DOM
        select(key, cell);
    });

    // create cell
    board.appendChild(cell);
}

//* FUNCTIONS

function select(key, cell) {
    const clickedCell = cells[key];

    // if we havent selected yet a cell and it contains a piece
    if (selectedCellKey === null && clickedCell.piece) {
        selectedCellKey = key;
        cell.classList.add('selected');
        console.log(key + ' selected');
    } else if (selectedCellKey !== null) {
        // key of the selected cell, key of the second cell
        movePiece(selectedCellKey, key);
        selectedCellKey = null;
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    }
}

function movePiece(fromCellKey, toCellKey) {
    const fromCell = cells[fromCellKey];
    const toCell = cells[toCellKey];

    // if there is a piece in the cell we want to move
    if (toCell.piece) {
        // if the pieces have the same color the move is invalid
        if (toCell.piece.color === fromCell.piece.color) {
            console.log("You cant capture your own pieces");
            return;
        } else {
            // select cell in DOM
            const toElement = document.querySelector(`[data-name="${toCellKey}"]`);
            // select piece
            const capturedPiece = toElement.querySelector('div');

            // if there is a piece in the destination cell remove it
            if (capturedPiece) {
                toElement.removeChild(capturedPiece);
            }

            console.log(`Captured ${toCell.piece.color} ${toCell.piece.type} on ${toCellKey}`);
        }
    }

    // update the cells object
    toCell.piece = fromCell.piece;
    fromCell.piece = null;

    // update DOM
    const fromElement = document.querySelector(`[data-name="${fromCellKey}"]`);
    const toElement = document.querySelector(`[data-name="${toCellKey}"]`);
    const pieceElement = fromElement.querySelector('div');

    if (pieceElement) {
        fromElement.removeChild(pieceElement);
        toElement.appendChild(pieceElement);
    }

    // Update piece status
    toCell.piece.hasMoved = true;

    console.log(`Moved ${toCell.piece.color} ${toCell.piece.type} from ${fromCellKey} to ${toCellKey}`);
}
