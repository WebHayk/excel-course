class Dom {
    constructor(selector) {
        this.element = typeof selector == "string" ? document.querySelector(selector) : selector;
    }

    html(html = "") {
        if (typeof html == "string") {
            this.element.innerHTML = html;
            return this;
        }
        return this.element.outerHTML.trim();
    }

    clear() {
        this.html("");
        return this;
    }

    on(eventType, callback) {
        this.element.addEventListener(eventType, callback);
    }

    remove(eventType, callback) {
        this.element.removeEventListener(eventType, callback);
    }

    append(node) {
        if (node instanceof Dom) {
            this.element.append(node.element);
        } else {
            this.element.append(node);
        }

        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes = "") => {
    let element = document.createElement(tagName);
    if (classes) {
        element.classList.add(classes);
    }

    return $(element);
}