function generate() {
    const columns = document.getElementById('columns').value;
    const rows = document.getElementById('rows').value;
    const gap = document.getElementById('gap').value;
    const result = document.getElementById('result');
    const code = document.getElementById('code');

    result.style.display = 'grid';
    result.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    result.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    result.style.gap = `${gap}px`;
    result.innerHTML = '';

    for (let i = 0; i < columns * rows; i++) {
        const textArea = document.createElement('div');
        textArea.style.backgroundColor = '#f0f0f0';
        textArea.innerText = 'div ' + (i + 1);
        result.appendChild(textArea);
    }

    code.value = `/* Grid Container */
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    gap: ${gap}px;
    `;
};

let drag = false;
let startRow, startCol, endRow, endCol;

const result = document.getElementById('result');
const gridItems = [];

function initDivs() {
    const result = document.getElementById('result');

    result.style.display = 'grid';
    result.style.gridTemplateColumns = `repeat(4, 1fr)`;
    result.style.gridTemplateRows = `repeat(4, 1fr)`;
    result.style.gap = `0px`;

    result.innerHTML = '';
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const item = document.createElement('div');
            item.className = 'grid-item';
            item.innerText = ``;
            item.dataset.row = row;
            item.dataset.column = col;
            result.appendChild(item);
            gridItems.push(item); 
        }
    }
}

function generateCss() {
    const selectedItems = gridItems.filter(item => item.classList.contains('selected'));
    console.log("selectedItems : ",selectedItems);
    if (selectedItems.length === 0) return '';

    let minRow = Infinity, minCol = Infinity, maxRow = -1, maxCol = -1;
  
    selectedItems.forEach(item => {
        console.log("item.dataset.column:",item.dataset.column);
        const row = parseInt(item.dataset.row, 10);
        const col = parseInt(item.dataset.column, 10);
        minRow = Math.min(minRow, row);
        minCol = Math.min(minCol, col);
        maxRow = Math.max(maxRow, row);
        maxCol = Math.max(maxCol, col);
    });

    console.log("minCol :", minCol);
    console.log("maxRow :",maxRow);
    console.log("minRow :",minRow);
    console.log("maxCol :",maxCol);

    const selectedColumns = maxCol - minCol + 1;
    console.log("selectedColumns",selectedColumns);

    const selectedRows = maxRow - minRow + 1;
    console.log("selectedRows",selectedRows);

    const css = `
    /* Grid Container */
    .container {
        display: grid;
        grid-template-columns: repeat(${selectedColumns}, 1fr);
        grid-template-rows: repeat(${selectedRows}, 1fr);
        gap: 0;
    }`;

    const gridArea = `${minRow + 1} / ${minCol + 1} / ${maxRow + 2} / ${maxCol + 2}`;
    const selectedAreaCSS = `
    .selected-area { 
        grid-area: ${gridArea}; 
    }`;

    const myCss = `${css}\n${selectedAreaCSS}\n`;
    document.getElementById('code').value = myCss;

    return myCss;
}

function onMouseDown(e) {
    drag = true;
    document.body.style.cursor = 'grab';
    document.body.style.userSelect = 'none';
    startRow = e.pageX - result.offsetLeft;
    startCol = e.pageY - result.offsetTop;
    gridItems.forEach(item => item.classList.remove('selected'));
}

function onMouseMove(e) {
    if (!drag) return;
    document.body.style.cursor = 'grabbing';
    endRow = e.pageX - result.offsetLeft;
    endCol = e.pageY - result.offsetTop;

    const rect = {
        left: Math.min(startRow, endRow),
        top: Math.min(startCol, endCol),
        right: Math.max(startRow, endRow),
        bottom: Math.max(startCol, endCol)
    };

    gridItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const relativeItemRect = {
            left: itemRect.left - result.offsetLeft,
            top: itemRect.top - result.offsetTop,
            right: itemRect.right - result.offsetLeft,
            bottom: itemRect.bottom - result.offsetTop
        };
        if (rect.left < relativeItemRect.right && rect.right > relativeItemRect.left &&
            rect.top < relativeItemRect.bottom && rect.bottom > relativeItemRect.top) {
            item.classList.add('selected');
        }
    });
}

function onMouseUp() {
    if (drag) {
        generateCss();
        drag = false;
    } else {
        const code = document.getElementById('code');
        code.innerHTML = '';
    }
}

// Touch
function onTouchStart(e) {
    e.preventDefault();
    drag = true;
    startRow = e.touches[0].clientX - result.offsetLeft;
    startCol = e.touches[0].clientY - result.offsetTop;
    gridItems.forEach(item => item.classList.remove('selected'));
}

function onTouchMove(e) {
    if (!drag) return;
    e.preventDefault();
    endRow = e.touches[0].clientX - result.offsetLeft;
    endCol = e.touches[0].clientY - result.offsetTop;
    const rect = {
        left: Math.min(startRow, endRow),
        top: Math.min(startCol, endCol),
        right: Math.max(startRow, endRow),
        bottom: Math.max(startCol, endCol)
    };

    gridItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const relativeItemRect = {
            left: itemRect.left - result.offsetLeft,
            top: itemRect.top - result.offsetTop,
            right: itemRect.right - result.offsetLeft,
            bottom: itemRect.bottom - result.offsetTop
        };
        if (rect.left < relativeItemRect.right && rect.right > relativeItemRect.left &&
            rect.top < relativeItemRect.bottom && rect.bottom > relativeItemRect.top) {
            item.classList.add('selected');
        }
    });
}

function onTouchEnd(e) {
    if (drag) {
        generateCss();
        drag = false;
    } else {
        const code = document.getElementById('code');
        code.innerHTML = '';
    }
}


document.addEventListener('DOMContentLoaded', function () {
    initDivs();
    result.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    // For touch
    result.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
});