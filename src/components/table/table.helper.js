import {$} from "@core/dom";

const columnResizerHelper = ($root, parentIndex, parentCoordinates, value) => {
    return $root.findAll(`[data-index="${parentIndex}"]`)
        .forEach(element => {
            let parentElement = $(element);
            parentElement.css({
                width: `${parentCoordinates.width + value}`
            });
        })
}

const rowResizerHelper = ($parent, parentCoordinates, value) => {
    return $parent.css({
        height: `${parentCoordinates.height + value}`
    });
}

export const tableResizerHelper = (event, $root) => {
    let {target} = event;

    if (target.dataset.resize) {
        let $resizer = $(target);
        let $parent = $resizer.closest('[data-type="resizable"]');
        let parentCoordinates = $parent.getCoordinates();
        let parentIndex = $parent.dataset.index;
        let type = event.target.dataset.resize;
        let sideProp = type === "column" ? "bottom" : "right";

        let value;

        $resizer.css({
            opacity: 1,
            [sideProp]: "-5000px"
        })

        document.onmousemove = event => {
            if (type === "column") {
                let pageRight = event.pageX;
                value = pageRight - parentCoordinates.right;
                $resizer.css({
                    right: -value + "px"
                });
            } else {
                let pageTop = event.pageY;
                value = pageTop - parentCoordinates.bottom;
                $resizer.css({
                    bottom: -value + "px"
                });
            }
        }

        document.onmouseup = () => {
            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            });

            if (type === "column") {
                columnResizerHelper($root, parentIndex, parentCoordinates, value);
            } else {
                rowResizerHelper($parent, parentCoordinates, value);
            }

            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}
