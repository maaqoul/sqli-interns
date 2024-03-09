//thid is the function that assigns new class and color to the selected area of the grid

function createDynamicStyle(selectionClass) {
    const style = document.createElement("style");
    document.head.appendChild(style);
    const color = getRandomColor();
    style.sheet.insertRule(
        `.${selectionClass} { background-color: ${color} !important; }`,
        0
    );
}