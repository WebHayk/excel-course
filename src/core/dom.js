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

    get dataset() {
        return this.element.dataset;
    }

    findAll(selector) {
        return this.element.querySelectorAll(selector);
    }

    on(eventType, callback) {
        this.element.addEventListener(eventType, callback);
    }

    remove(eventType, callback) {
        this.element.removeEventListener(eventType, callback);
    }

    closest(selector) {
        return $(this.element.closest(selector));
    }

    getCoordinates() {
       return  this.element.getBoundingClientRect()
    }

    append(node) {
        if (node instanceof Dom) {
            this.element.append(node.element);
        } else {
            this.element.append(node);
        }

        return this;
    }

    css(styles = {}, selector = null,) {

        let element = selector ? selector : this.element;

        if (Object.keys(styles).length) {
            for (let key in styles) {
                let style = styles[key];

                console.log(style);

                if (typeof style == "string" && parseInt(style) && !style.includes("px")) {
                    element.style[key] = style + "px";
                } else {
                    element.style[key] = style;
                }
            }
        }
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