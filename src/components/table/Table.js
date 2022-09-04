import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {
    tableCellsSelectionTransformHelper,
    tableResizerHelper,
    tableSelectionHelper
} from "@/components/table/table.helper";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";
import {isCell, shouldResize} from "@/components/table/table.functions";

export class Table extends ExcelComponent {
    static className = "excel__table"

    constructor($root, options) {
        super($root, {
            name: "Table",
            listeners: ["mousedown", "keydown", "input"],
            ...options
        });
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();

        const firstCell = this.$root.find('[data-id="0:0"');
        this.selection.select(firstCell);
        this.$emit("table:select", this.selection.current);

        this.$on("formula:done", text => {
            let currentCell = this.selection.current;
            this.selection.select(currentCell);
        });

        this.$on("formula:input", text => {
            this.selection.current.textContentSetter(text);
        });
    }

    toHTML() {
        return createTable(20)
    }

    onMousedown(event) {
        if (shouldResize(event.target)) {
            tableResizerHelper(event, this.$root);
        } else if (isCell(event)) {
            const $target = $(event.target);
            tableSelectionHelper(event, $target, this.selection, this.$root);
        }
    }

    onKeydown(event) {
        tableCellsSelectionTransformHelper(event, this.$root, this.selection)
            .then(() => {
                this.$emit("table:select", this.selection.current);
            })
    }

    onInput(event) {
        this.$emit("table:input", $(event.target));
    }
}
