import {$} from "@core/dom";

export const shouldResize = (target) => {
    return target.dataset.resize;
}

export const isCell = (event) => {
    let {target} = event;
    let tableElement = $(target);
    return tableElement.dataset.id;
}