//* CREATE BOARD
// 8 rows
for (let r = 104; r >= 97; r--) {
    // from chart 'A' to chart 'H', the chessboard rows
    const row = String.fromCharCode(r);
    // 8 columns
    for (let c = 1; c <= 8; c++) {
        // create cell
        const cell = document.createElement('div');
        // cell color pattern
        cell.className = 'cell ' + ((r + c) % 2 === 0 ? 'light-square ' : 'dark-square ') + (r === 97 || c === 1 ? 'position-relative' : '');
        
        // set coordinates
        cell.setAttribute('row', r);
        cell.setAttribute('col', c);
        
        // Append cell to board
        document.querySelector('.board').appendChild(cell);

        //to add notations
        if (c === 1) {
            const notation = document.createElement('span');
            notation.className = 'notation-letters';
            notation.innerHTML = row;
            cell.appendChild(notation);
        }

        if (r === 97) {
            const notation = document.createElement('span');
            notation.className = 'notation-numbers';
            notation.innerHTML = c;
            cell.appendChild(notation);
        }
    }
}

//* CREATE PIECES INITIAL POSITION
// rows
for (let r = 104; r >= 97; r--) {
    const row = String.fromCharCode(r);
    
    // columns
    for (let c = 1; c <= 8; c++) {
        // class with the piece img
        let pieceClass;

        // Define piece type
        // row H
        if (r === 104) {
            if (c === 1 || c === 8) pieceClass = 'black rook';
            else if (c === 2 || c === 7) pieceClass = 'black knight';
            else if (c === 3 || c === 6) pieceClass = 'black bishop';
            else if (c === 4) pieceClass = 'black queen';
            else if (c === 5) pieceClass = 'black king';
        }
        // Row G
        else if (r === 103) { 
            pieceClass = 'black pawn';
        }
        // Row A
        else if (r === 97) {
            if (c === 1 || c === 8) pieceClass = 'white rook';
            else if (c === 2 || c === 7) pieceClass = 'white knight';
            else if (c === 3 || c === 6) pieceClass = 'white bishop';
            else if (c === 4) pieceClass = 'white queen';
            else if (c === 5) pieceClass = 'white king';
        }
        // Row B
        else if (r === 98) {
            pieceClass = 'white pawn';
        }

        // If there's a piece class, create the piece
        if (pieceClass) {
            const piece = document.createElement('div');
            piece.className = pieceClass;

            // Add the piece to the correct cell
            const cell = document.querySelector(`[row='${r}'][col='${c}']`);
            cell.insertBefore(piece, cell.firstChild);
        }
    }
}

//* MOVE AND CAPTURE
// select all pieces
const cells = document.querySelectorAll('.cell');
// variable for the piece to move
let selectedPiece;

cells.forEach(cell => {
    // event listener for all the cells
    cell.addEventListener('click', (event) => {

        let piece = null;
        
        // if on click we dont select a piece (black or white class) then we 
        if (event.target.classList.contains('black') || event.target.classList.contains('white')) {
            piece = cell.firstChild;
        }
        // if we click a piece, we save it here

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
                cell.insertBefore(selectedPiece, cell.firstChild);
                console.log(selectedPiece.classList + ' takes ' + String.fromCharCode(parseInt(cell.getAttribute('row'))) + cell.getAttribute('col'));
            } else if (!piece) {
                cell.insertBefore(selectedPiece, cell.firstChild);
                console.log(selectedPiece.classList + ' moves to ' + String.fromCharCode(parseInt(cell.getAttribute('row'))) + cell.getAttribute('col'));
            }

            // Deseleziona il pezzo dopo lo spostamento
            selectedPiece = null;
        }
    });
});