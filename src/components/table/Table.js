import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {tableResizerHelper} from "@/components/table/table.helper";

export class Table extends ExcelComponent {
    static className = "excel__table"

    constructor($root) {
        super($root, {
            name: "Table",
            listeners: ["mousedown"]
        });
    }

    toHTML() {
        return createTable(20)
    }

    onMousedown(event) {
        tableResizerHelper(event, this.$root);
    }
}