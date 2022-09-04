export class TableSelection {

    static className = "selected"

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear();
        this.group.push($el);
        $el.focus();
        this.current = $el;
        $el.addClass(TableSelection.className);
    }

    clear() {
        this.group.forEach(el => el.removeClass(TableSelection.className));
        this.group = [];
    }

    selectGroup(cells = []) {
        this.clear();
        this.group = cells;
        this.group.forEach(cell => cell.addClass("selected"));
    }
}