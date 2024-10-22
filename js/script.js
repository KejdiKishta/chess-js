// // cell number
// let cellnr = 64;

// //* CREATE BOARD
// // 8 rows
// for (let r = 0; r < 8; r++) {
//     // foreach row 8 cells
//     for (let c = 0; c < 8; c++) {

//         // create cell, add classes needed, append cell to the board
//         const cell = document.createElement('div');
//         cell.className = 'cell ' + ((r + c) % 2 === 0 ? 'light-square' : 'dark-square');
//         cell.setAttribute('data-cell', cellnr);
//         document.querySelector('.board').appendChild(cell);

//         // increment cell number
//         cellnr--
//     }
// }

//* CREATE BOARD
// 8 rows
for (let r = 72; r >= 65; r--) {
    // from chart 'A' to chart 'H', the chessboard rows
    const row = String.fromCharCode(r);
    // 8 columns
    for (let c = 1; c <= 8; c++) {
        // create cell
        const cell = document.createElement('div');
        // cell color pattern
        cell.className = 'cell ' + ((r + c) % 2 === 0 ? 'light-square ' : 'dark-square ') //to add notations + (r === 65 || c === 1 ? 'position-relative' : '');
        
        // set coordinates
        cell.setAttribute('row', r);
        cell.setAttribute('col', c);
        
        // Append cell to board
        document.querySelector('.board').appendChild(cell);

        //to add notations
        // if (r === 65 || c === 1) {
        //     const notation = document.createElement('span');
        //     notation.className = 'position-absolute start-0 bottom-0';
            
        // }
    }
}

//* CREATE PIECES INITIAL POSITION
// rows
for (let r = 72; r >= 65; r--) {
    const row = String.fromCharCode(r);
    
    // columns
    for (let c = 1; c <= 8; c++) {
        // class with the piece img
        let pieceClass;

        // Define piece type
        // row H
        if (r === 72) {
            if (c === 1 || c === 8) pieceClass = 'black rook';
            else if (c === 2 || c === 7) pieceClass = 'black knight';
            else if (c === 3 || c === 6) pieceClass = 'black bishop';
            else if (c === 4) pieceClass = 'black queen';
            else if (c === 5) pieceClass = 'black king';
        }
        // Row G
        else if (r === 71) { 
            pieceClass = 'black pawn';
        }
        // Row A
        else if (r === 65) {
            if (c === 1 || c === 8) pieceClass = 'white rook';
            else if (c === 2 || c === 7) pieceClass = 'white knight';
            else if (c === 3 || c === 6) pieceClass = 'white bishop';
            else if (c === 4) pieceClass = 'white queen';
            else if (c === 5) pieceClass = 'white king';
        }
        // Row B
        else if (r === 66) {
            pieceClass = 'white pawn';
        }

        // If there's a piece class, create the piece
        if (pieceClass) {
            const piece = document.createElement('div');
            piece.className = pieceClass;

            // Add the piece to the correct cell
            const cell = document.querySelector(`[row='${r}'][col='${c}']`).appendChild(piece);
        }
    }
}

//* MOVE AND CAPTURE
// select all pieces
const cells = document.querySelectorAll('.cell');
// variable for the piece to move
let selectedPiece;
let allowedMoves;

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
            // if piece is null we simply move, if there is a opponent piece we capture
            if (piece && ((piece.classList.contains('black') && selectedPiece.classList.contains('white')) || (piece.classList.contains('white') && selectedPiece.classList.contains('black')))) {
                cell.removeChild(piece);
                cell.appendChild(selectedPiece);
                console.log(selectedPiece.classList + ' captured ' + piece.classList);
            } else if (!piece) {
                cell.appendChild(selectedPiece);
                console.log(selectedPiece.classList + ' moved');
            }

            // Deseleziona il pezzo dopo lo spostamento
            selectedPiece = null;
        }
    });
});