import {ExcelComponent} from "@core/ExcelComponent";
import {capitalize} from "@core/utils";
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
    static className = "excel__formula"

    value = ""

    constructor($root, options) {
        super($root, {
            name: "Formula",
            listeners: ["input", "keydown"],
            ...options
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        super.init();

        this.formula = this.$root.find("#formula");

        this.$on("table:select", (element) => {
            this.formula.textContentSetter(element.textContent);
        });

        this.$on("table:input", (element) => {
            this.formula.textContentSetter(element.textContent);
        })
    }

    onInput(event) {
        let element = $(event.target);
        this.value = element.textContent;
        this.$emit("formula:input", element.textContent);
    }

    onKeydown(event) {

        let keys = ["Enter", "Tab"];

        let {key} = event;

        if (keys.includes(key)) {
            event.preventDefault();
            this.$emit("formula:done", this.value);
        }
    }
}