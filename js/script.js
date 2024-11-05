// class for pieces
class ChessPiece {
    // constructor with piece type, color and if it has been moved
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.hasMoved = false;
    }

    // when we move the piece, call this method to chande the condition from false to true
    markAsMoved() {
        this.hasMoved = true;
    }

    // get classes
    getPieceClass() {
        return `${this.color} ${this.type}`;
    }
}

// cell class
class ChessCell {
    // constructor with coordinates and color of the cell
    constructor(row, col, color) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.piece = null;
    }

    // function to put pieces in the cells
    setPiece(piece) {
        this.piece = piece;
    }

    // preparing cells
    render() {
        const cellElement = document.createElement('div');
        cellElement.className = `cell ${this.color} position-relative`;
        cellElement.setAttribute('data-row', this.row);
        cellElement.setAttribute('data-col', this.col);

        // if there is a piece we append it in the cell
        if (this.piece) {
            const pieceElement = document.createElement('div');
            pieceElement.className = this.piece.getPieceClass();
            cellElement.appendChild(pieceElement);
        }

        // letter notation
        if (this.row === 1) {
            const notation = document.createElement('span');
            notation.className = 'notation-letters';
            notation.innerHTML = this.col;
            cellElement.appendChild(notation);
        }

        // number notations
        if (this.col === 'a') {
            const notation = document.createElement('span');
            notation.className = 'notation-numbers';
            notation.innerHTML = this.row;
            cellElement.appendChild(notation);
        }

        return cellElement;
    }
}

// create chessboard
function createChessBoard() {
    const rows = 8;
    const columns = 8;
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const boardElement = document.querySelector('.board');
    
    // set up with arrays, the keys are the rows
    const pieceSetup = {
        8: ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
        7: Array(8).fill('pawn'),
        2: Array(8).fill('pawn'),
        1: ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
    };

    // foreach row 8 column
    for (let r = rows; r > 0; r--) {
        // foreach column
        for (let c = 0; c < columns; c++) {
            // we alternate light and dark square 
            const color = (r + c) % 2 === 0 ? 'light-square' : 'dark-square';
            // call the class with row, column and cell color
            const cell = new ChessCell(r, letters[c], color);

            // if r is an existing key in pieceSetup we take the cooresponding piece, else the piece is null
            const pieceType = pieceSetup[r] ? pieceSetup[r][c] : null;
            // define the color of the piece
            if (pieceType) {
                const pieceColor = r > 4 ? 'black' : 'white';
                // create a class piece with type and color
                const piece = new ChessPiece(pieceType, pieceColor);
                // add the piece to the cell
                cell.setPiece(piece);

                console.log('Piece:', piece);
            }

            console.log('Cell:', cell);

            // append the cell in the board
            boardElement.appendChild(cell.render());
        }
    }
}

// call the function to add the board
createChessBoard();
