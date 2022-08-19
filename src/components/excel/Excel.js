import {$} from "@core/dom";

export class Excel {
    constructor(selector, options) {
        this.$element = $(selector);
        this.components = options.components || [];
    }

    getRoot() {
        const $root = $.create("div", "excel");

        this.components = this.components.map(Component => {
            let componentParentElement = $.create("div", Component.className);
            let componentInstance = new Component(componentParentElement);
            componentParentElement.html(componentInstance.toHTML());
            $root.append(componentParentElement);
            return componentInstance;
        });

        return $root;
    }

    render() {
        this.$element.append(this.getRoot());

        this.components.forEach(component => {
            component.init();
        });
    }
}