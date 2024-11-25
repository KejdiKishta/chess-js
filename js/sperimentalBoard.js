//* CREATE BOARD
// 8 rows
for (let r = 8; r >= 1; r--) {     // from chart '8' to chart '1', the chessboard rows
    for (let c = 97; c <= 104; c++) {     // from 'a' to 'h', the chessboard columns
        const col = String.fromCharCode(c);     // get column as character
        
        // create cell
        const cell = document.createElement('div');
        
        // cell color pattern
        cell.className = 'cell ' + ((r + c) % 2 === 0 ? 'light-square ' : 'dark-square ') + (c === 97 || r === 1 ? 'position-relative' : '');
        
        // set coordinates
        cell.setAttribute('row', r);
        cell.setAttribute('col', col);
        
        // Append cell to board
        document.querySelector('.board').appendChild(cell);
        
        // to add notations
        if (c === 97) {     // add row notation (numbers)
            const notation = document.createElement('span');
            notation.className = 'notation-numbers';
            notation.innerHTML = r;
            cell.appendChild(notation);
        }
        
        if (r === 1) {     // add column notation (letters)
            const notation = document.createElement('span');
            notation.className = 'notation-letters';
            notation.innerHTML = col;
            cell.appendChild(notation);
        }
    }
}


//* CREATE PIECES INITIAL POSITION
// rows
for (let r = 8; r >= 1; r--) {     // from chart '8' to chart '1', the chessboard rows
    for (let c = 97; c <= 104; c++) {     // from 'a' to 'h', the chessboard columns
        const col = String.fromCharCode(c);     // get column as character
        
        // class with the piece img
        let pieceClass;

        // Define piece type
        // row 8
        if (r === 8) {
            if (col === 'a' || col === 'h') pieceClass = 'black rook';
            else if (col === 'b' || col === 'g') pieceClass = 'black knight';
            else if (col === 'c' || col === 'f') pieceClass = 'black bishop';
            else if (col === 'd') pieceClass = 'black queen';
            else if (col === 'e') pieceClass = 'black king';
        }
        // Row 7
        else if (r === 7) { 
            pieceClass = 'black pawn';
        }
        // Row 1
        else if (r === 1) {
            if (col === 'a' || col === 'h') pieceClass = 'white rook';
            else if (col === 'b' || col === 'g') pieceClass = 'white knight';
            else if (col === 'c' || col === 'f') pieceClass = 'white bishop';
            else if (col === 'd') pieceClass = 'white queen';
            else if (col === 'e') pieceClass = 'white king';
        }
        // Row 2
        else if (r === 2) {
            pieceClass = 'white pawn';
        }

        // If there's a piece class, create the piece
        if (pieceClass) {
            const piece = document.createElement('div');
            piece.className = pieceClass;

            // Add the piece to the correct cell
            const cell = document.querySelector(`[row='${r}'][col='${col}']`);
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
                console.log(selectedPiece.classList + ' takes ' + cell.getAttribute('col') +  cell.getAttribute('row'));
            } else if (!piece) {
                cell.insertBefore(selectedPiece, cell.firstChild);
                console.log(selectedPiece.classList + ' moves to ' + cell.getAttribute('col') +  cell.getAttribute('row'));
            }

            // Deseleziona il pezzo dopo lo spostamento
            selectedPiece = null;
        }
    });
});