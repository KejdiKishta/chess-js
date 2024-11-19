//* CREATE BOARD
// object containing all cells
let cells = {};

// 8 rows
for (let r = 104; r >= 97; r--) {
    // from chart 'A' to chart 'H', the chessboard rows
    const row = String.fromCharCode(r);
    // 8 columns
    for (let c = 1; c <= 8; c++) {
        // save cell name to use it as a key 
        const cellName = row + c; 
        const cellClasses = 'cell ' + ((r + c) % 2 === 0 ? 'light-square ' : 'dark-square ') + (r === 97 || c === 1 ? 'position-relative' : '');

        // add the cell in the object
        cells[cellName] = {
            name: cellName,
            class: cellClasses,
            piece: {
                type: null,
                color: null
            },
            highlight: null,
        }
    }
}

// select board
const board = document.querySelector('.board');

for (let [key, value] of Object.entries(cells)) {
    // set attributes and classes
    const cell = document.createElement('div');
    cell.className = value.class;
    cell.setAttribute('data-name', key);

    // get object in case is needed
    cell.addEventListener('click', () => {
        const clickedCell = cells[key];
        console.log(clickedCell);
    });

    // create cell
    board.appendChild(cell);
}
