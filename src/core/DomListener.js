import {capitalize} from "@core/utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error("Not provided $root")
        }
        this.listeners = listeners;
        this.$root = $root;
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            let eventName = eventListenerNameCreator(capitalize(listener));
            this[eventName] = this[eventName].bind(this);
            this.$root.on(listener, this[eventName]);
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            let eventName = eventListenerNameCreator(capitalize(listener));
            this.$root.remove(eventName, this[eventName]);
        })
    }
}

function eventListenerNameCreator(listener) {
    return "on" + listener;
}