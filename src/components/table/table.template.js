
const CODES = {
    A: 65,
    Z: 90
}

function createCell(content, index) {
    return `
        <div data-index=${index} class="cell" contenteditable></div>
    `
}

function createColumn(content, index) {
    return `
        <div data-index=${index} class="column" data-type="resizable">
            ${content}
            <div class="column__resize" data-resize="column"></div>
        </div>
    `
}

function createRowResize(index) {
    if (index) {
        return `<div data-resize="row" class="row-resize"></div>`
    } else {
        return "";
    }
}

function createRow(content, index) {
    return `
        <div data-type="resizable" class="row">
            <div class="row-info">
                ${index}
                ${createRowResize(index)}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    let letter = CODES.A + index;
    return String.fromCharCode(letter);
}

export function createTable(rowsCount = 15, ) {
    const columnsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const columns = new Array(columnsCount)
        .fill("")
        .map(toChar)
        .map(createColumn)
        .join("")

    rows.push(createRow(columns, ""));

    for (let i = 0; i < rowsCount; i++) {

        let index = i + 1;

        const cells = new Array(columnsCount)
            .fill("")
            .map(createCell)
            .join("")

        let row = createRow(cells, index);
        rows.push(row);
    }

    return rows.join("")
}