import {ExcelComponent} from "@core/ExcelComponent";
import {capitalize} from "@core/utils";

export class Formula extends ExcelComponent {
    static className = "excel__formula"

    constructor($root) {
        super($root, {
            name: "Formula",
            listeners: ["input", "click"]
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    onClick(event) {
        console.log(event);
    }

    onInput(event) {
        console.log(this.$root)
        console.log("Formula", event);
    }
}