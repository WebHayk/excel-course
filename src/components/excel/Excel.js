import {$} from "@core/dom";
import {Emitter} from "@core/Emitter";

export class Excel {
    constructor(selector, options) {
        this.$element = $(selector);
        this.components = options.components || [];
        this.emitter = new Emitter()
    }

    getRoot() {
        const $root = $.create("div", "excel");

        const componentOptions = {
            emitter: this.emitter
        };

        this.components = this.components.map(Component => {
            let componentParentElement = $.create("div", Component.className);
            let componentInstance = new Component(componentParentElement, componentOptions);
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

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}