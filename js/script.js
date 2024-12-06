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

        // valid moves function
        const validMoves = getValidMoves(key);
        validMoves.forEach(moveKey => {
            const targetCell = document.querySelector(`[data-name="${moveKey}"]`);
            targetCell.classList.add('moves');
        });
    } else if (selectedCellKey !== null) {
        // key of the selected cell, key of the second cell
        movePiece(selectedCellKey, key);
        selectedCellKey = null;
        document.querySelectorAll('.cell').forEach(el => el.classList.remove('selected', 'moves'));
    }   
}

function movePiece(fromCellKey, toCellKey) {
    const fromCell = cells[fromCellKey];
    const toCell = cells[toCellKey];

    // take valid moves
    const validMoves = getValidMoves(fromCellKey);

    // if valid moves doesn't include the key
    if (!validMoves.includes(toCellKey)) {
        console.log("Invalid move");
        return;
    }

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

// argument is the cell name
function getValidMoves(cellKey) {

    // get the cell from the object
    const cell = cells[cellKey];
    // check any error
    if (!cell.piece) return [];

    //save the piece
    const piece = cell.piece;
    // get the col and row coordinates separated
    const [col, row] = [cellKey.charAt(0), parseInt(cellKey.charAt(1))];
    // directions that a piece can take
    const directions = [];
    // possible moves
    const moves = [];

    switch (piece.type) {
        case 'pawn':
            // if white piece move +1 if black -1 because it moves from the end to the start of the board
            const direction = piece.color === 'white' ? 1 : -1;

            // if the the cell next to the pawn is empty add the cell to the moves array
            // example pawn in e2 -> cells[col=e row=2(row)+1(direction)]
            if (!cells[`${col}${row + direction}`]?.piece) {
                moves.push(`${col}${row + direction}`);
                // if the piece hasn't moved yet. push the 2 cell move
                if (!piece.hasMoved && !cells[`${col}${row + 2 * direction}`]?.piece) {
                    moves.push(`${col}${row + 2 * direction}`);
                }
            }
            // control diagonals
            for (let adjacentCol of [-1, 1]) {
                // we move to the adjacent col, we add 1 or -1 to the charcode of the current col
                // if 'e' we iterate 'd' and 'f'
                const targetCol = String.fromCharCode(col.charCodeAt(0) + adjacentCol);
                // if 'e2' we have 'd3' and 'f3'
                const targetCell = cells[`${targetCol}${row + direction}`];
                //if there is an opponent piece we add the move
                if (targetCell?.piece && targetCell.piece.color !== piece.color) {
                    moves.push(`${targetCol}${row + direction}`);
                }
            }
            break;

        case 'rook':
            directions.length = 0;
            //               right -  left  -  up  -  down
            directions.push([1, 0], [-1, 0], [0, 1], [0, -1]);
            break;

        case 'bishop':
            directions.length = 0;
            //            rightup - leftdown - rightdown - leftup
            directions.push([1, 1], [-1, -1], [1, -1], [-1, 1]);
            break;

        case 'queen':
            directions.length = 0;
            //             right -  left  -   up   - down - rightup - leftdown - rightdown - leftup
            directions.push([1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]);
            break;

        case 'king':
            directions.length = 0;
            //             right -  left  -   up   - down - rightup - leftdown - rightdown - leftup
            directions.push([1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]);
            // foreach move same controls as the other pieces
            for (const [dx, dy] of directions) {
                const targetCol = String.fromCharCode(col.charCodeAt(0) + dx);
                const targetRow = row + dy;
                const targetCell = cells[`${targetCol}${targetRow}`];
                if (targetCell && (!targetCell.piece || targetCell.piece.color !== piece.color)) {
                    moves.push(`${targetCol}${targetRow}`);
                }
            }
            return moves;

        case 'knight':
            directions.length = 0;
            const knightMoves = [
                [2, 1], [2, -1], [-2, 1], [-2, -1],
                [1, 2], [1, -2], [-1, 2], [-1, -2],
            ];
            // foreach move of the knight
            for (const [dx, dy] of knightMoves) {
                // select the col
                const targetCol = String.fromCharCode(col.charCodeAt(0) + dx);
                // select the row
                const targetRow = row + dy;
                // final cell
                const targetCell = cells[`${targetCol}${targetRow}`];
                // if the cell exists and it doesn't contain a piece with the same color add the move 
                if (targetCell && (!targetCell.piece || targetCell.piece.color !== piece.color)) {
                    moves.push(`${targetCol}${targetRow}`);
                }
            }
            return moves;
    }

    // Add logic for rook, bishop, and queen to handle linear movement
    for (const [dx, dy] of directions) {
        let targetCol = col;
        let targetRow = row;
        // infinite cicle, it ends only when we reach the break line
        while (true) {
            targetCol = String.fromCharCode(targetCol.charCodeAt(0) + dx);
            targetRow += dy;

            const targetCell = cells[`${targetCol}${targetRow}`];
            if (!targetCell) break; // ends the cicle

            // if empty cell add move
            if (!targetCell.piece) {
                moves.push(`${targetCol}${targetRow}`);
            } else {
                // if there is a opponent piece add move
                if (targetCell.piece.color !== piece.color) {
                    moves.push(`${targetCol}${targetRow}`);
                }
                break; // ends the cicle
            }
        }
    }

    return moves;
}
