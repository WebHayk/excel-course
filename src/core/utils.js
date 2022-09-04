export function capitalize(value) {
    let firstLetter = value[0].toUpperCase();
    return firstLetter + value.slice(1, value.length);
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end];
    }

    return new Array(end - start + 1)
        .fill("")
        .map((_, index) => start + index)
}