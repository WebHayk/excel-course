import {$} from "@core/dom";
import {range} from "@core/utils";

const columnResizerHelper = ($root, parentIndex, parentCoordinates, value) => {
    return $root.findAll(`[data-col="${parentIndex}"]`)
        .forEach(element => {
            let parentElement = $(element);
            parentElement.css({
                width: `${parentCoordinates.width + value}`
            });
        })
}

const rowResizerHelper = ($parent, parentCoordinates, value) => {
    return $parent.css({
        height: `${parentCoordinates.height + value}`
    });
}

export const tableResizerHelper = (event, $root) => {
    let {target} = event;

    if (target.dataset.resize) {
        let $resizer = $(target);
        let $parent = $resizer.closest('[data-type="resizable"]');
        let parentCoordinates = $parent.getCoordinates();
        let parentIndex = $parent.dataset.col;
        let type = event.target.dataset.resize;
        let sideProp = type === "column" ? "bottom" : "right";

        let value;

        $resizer.css({
            opacity: 1,
            [sideProp]: "-5000px"
        })

        document.onmousemove = event => {
            if (type === "column") {
                let pageRight = event.pageX;
                value = pageRight - parentCoordinates.right;
                $resizer.css({
                    right: -value + "px"
                });
            } else {
                let pageTop = event.pageY;
                value = pageTop - parentCoordinates.bottom;
                $resizer.css({
                    bottom: -value + "px"
                });
            }
        }

        document.onmouseup = () => {
            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            });

            if (type === "column") {
                columnResizerHelper($root, parentIndex, parentCoordinates, value);
            } else {
                rowResizerHelper($parent, parentCoordinates, value);
            }

            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

export const tableSelectionHelper = (event, $target, selection, $root) => {
    if (event.shiftKey) {
        const target = $target.id(true);
        const current = selection.current.id(true);

        const cols = range(current.col, target.col);
        const rows = range(current.row, target.row);

        const ids = cols.reduce((acc, col) => {
            rows.forEach(row => acc.push(`${row}:${col}`));
            return acc;
        }, []);

        let cells = ids.map(id => $root.find(`[data-id="${id}"]`));
        selection.selectGroup(cells);
    } else {
        selection.select($target);
    }
}

function cellSelectionTransform(row, col, $root, selection) {

    let updatedCell = $root.find(`[data-id="${row}:${col}"]`);

    if (updatedCell.currentElement) {
        selection.select(updatedCell);
        updatedCell.focus();
    }
}

export const tableCellsSelectionTransformHelper = async (event, $root, selection) => {
    let {which, target, shiftKey} = event;
    let element = $(target);

    let {row, col} = element.id(true);

    let arrowUpWhich = 38;
    let arrowDownWhich = 40;
    let arrowLeftWhich = 37;
    let arrowRightWhich = 39;
    let enterWhich = 13;

    let updatedRow;
    let updatedCol;

    if (which === enterWhich && shiftKey) {
        return true;
    }

    switch (which) {
        case arrowUpWhich:
            updatedRow = row - 1;
            cellSelectionTransform(updatedRow, col, $root, selection);
            break
        case arrowDownWhich:
            updatedRow = row + 1;
            cellSelectionTransform(updatedRow, col, $root, selection);
            break
        case arrowLeftWhich:
            updatedCol = col - 1;
            cellSelectionTransform(row, updatedCol, $root, selection);
            break
        case arrowRightWhich:
            updatedCol = col + 1;
            cellSelectionTransform(row, updatedCol, $root, selection);
            break
        case enterWhich:
            if (!shiftKey) {
                event.preventDefault();
                updatedRow = row + 1;
                cellSelectionTransform(updatedRow, col, $root, selection);
            }
    }
}