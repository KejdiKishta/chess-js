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
    let piece;

    // create piece
    if (c < 17 || c > 48) {
        piece = document.createElement('div');
    }
    
    if (piece) {
        // define piece type
        if (c === 1 || c === 8 || c === 57 || c === 64) {
            piece.className = (c === 1 || c === 8 ? 'white rook' : 'black rook');
        } else if (c === 2 || c === 7 || c === 58 || c === 63) { 
            piece.className = (c === 2 || c === 7 ? 'white knight' : 'black knight');
        } else if (c === 3 || c === 6 || c === 59 || c === 62) {
            piece.className = (c === 3 || c === 6 ? 'white bishop' : 'black bishop');
        } else if (c === 4 || c === 60) {
            piece.className = (c === 4 ? 'white king' : 'black king');
        }  else if (c === 5 || c === 61) {
            piece.className = (c === 5 ? 'white queen' : 'black queen')
        } else if ((c > 8 && c < 17) || (c > 48 && c < 57)) {
            piece.className = (c > 8 && c < 17 ? 'white pawn' : 'black pawn')
        }

        // add piece
        document.querySelector(`[data-cell='${c}']`).appendChild(piece);
    }
}

// select all pieces
const cells = document.querySelectorAll('.cell');
// variable for the piece to move
let selectedPiece;

cells.forEach(cell => {
    // event listener for all the cells
    cell.addEventListener('click', () => {
        // if we click a piece, we save it here
        const piece = cell.firstChild;

        // if there is a piece and we have not selected one yet, we select the piece
        if (piece && !selectedPiece) {
            selectedPiece = piece;
            console.log('piece selected');
        }
        // if we have already selected a piece and we select another cell different from the one selected
        else if (selectedPiece && (piece !== selectedPiece)) {
            // console.log(selectedPiece, piece);
            // if piece is null we simply move, if there is a opponent piece we capture
            if (piece && ((piece.classList.contains('black') && selectedPiece.classList.contains('white')) || (piece.classList.contains('white') && selectedPiece.classList.contains('black')))) {
                cell.removeChild(piece);
                cell.appendChild(selectedPiece);
                console.log('piece moved with capture');
            } else if (!piece) {
                cell.appendChild(selectedPiece);
                console.log('piece moved');
            }

            // Deseleziona il pezzo dopo lo spostamento
            selectedPiece = null;
        }
    });
});