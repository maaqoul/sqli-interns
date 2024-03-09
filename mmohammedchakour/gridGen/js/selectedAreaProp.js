// This function is used to get the selected areas css props

function selectedAreaProp() {
    const totalColumns = parseInt(document.getElementById('columns').value, 10);
    let cssCode = '';

    for (let selectionIndex = 1; selectionIndex <= 15; selectionIndex++) {
        const selectionClass = `selection-${selectionIndex}`;
        const selectedBoxes = document.querySelectorAll(`.${selectionClass}`);
        
        if (selectedBoxes.length === 0) {
            break;
        }

        let minRow = Infinity, maxRow = -Infinity, minCol = Infinity, maxCol = -Infinity;

        selectedBoxes.forEach(box => {
            const index = Array.prototype.indexOf.call(box.parentNode.children, box);
            const row = Math.floor(index / totalColumns) + 1;
            const col = (index % totalColumns) + 1;
            
            minRow = Math.min(minRow, row);
            maxRow = Math.max(maxRow, row);
            minCol = Math.min(minCol, col);
            maxCol = Math.max(maxCol, col);
        });

        cssCode +=` .div-${selectionIndex} { grid-area: ${minRow} / ${minCol} / ${maxRow + 1} / ${maxCol + 1}; }\n`;
    }

    return cssCode;
}

