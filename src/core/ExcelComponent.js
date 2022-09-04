import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.emitter = options.emitter;
        this.unsubscribers = [];

        this.prepare();
    }

    prepare() {}

    init() {
        this.initDOMListeners();
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(listener => {
            listener();
        })
    }
}