export function capitalize(value) {
    let firstLetter = value[0].toUpperCase();
    return firstLetter + value.slice(1, value.length);
}