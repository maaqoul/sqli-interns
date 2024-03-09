const parent = document.getElementsByClassName('parent')[0];

var gridAreas = [];

var row = document.getElementById('row').value;
var column = document.getElementById('column').value;
var gapRow = document.getElementById('gap-row').value;
var gapColumn = document.getElementById('gap-column').value;

var start = [];
var end = [];

var html = '';
var css = '';
var isHtml = false;

const getRandomColor = () => {
    const red = Math.floor(Math.random() * 250);
    const green = Math.floor(Math.random() * 250);
    const blue = Math.floor(Math.random() * 250);

    return `rgb(${red}, ${green}, ${blue})`;
}

const applyColor = (divs) => {
    let color = getRandomColor();
    divs.forEach(div => {
        div.style.backgroundColor = color;
    });
}

const gridArea = (i, j, k, l) => {
    const gridArea = i + ' / ' + j + ' / ' + (k + 1) + ' / ' + (l + 1);
    gridAreas.push(gridArea);
}

function getDivsBetween(start, end) {
    const minRow = Math.min(start[0], end[0]);
    const maxRow = Math.max(start[0], end[0]);
    const minCol = Math.min(start[1], end[1]);
    const maxCol = Math.max(start[1], end[1]);

    const divs = [];
    for (let i = minRow; i <= maxRow; i++) {
        for (let j = minCol; j <= maxCol; j++) {
            const div = document.getElementById('div' + i + ',' + j);
            if (div) {
                divs.push(div);
            }
        }
    }
    return divs;
}

const handleMouseDown = (i, j) => {
    start = [];
    end = [];
    start = [i, j];
};

const handleMouseUp = (i, j, div) => {
    let gridAreaDivs = [];
    end = [i, j];

    if (start[0] == end[0] && start[1] == end[1]) {
        gridAreaDivs.push(div);
    } else {
        getDivsBetween(start, end).forEach(divBet => {
            gridAreaDivs.push(divBet);
        });
    }

    gridArea(start[0], start[1], end[0], end[1]);
    applyColor(gridAreaDivs);
};

const createDivs = () => {
    parent.innerHTML = '';

    parent.style.gridTemplateColumns = `repeat(${column}, 1fr)`;
    parent.style.gridTemplateRows = `repeat(${row}, 1fr)`;

    for (let i = 1; i <= row; i++) {
        for (let j = 1; j <= column; j++) {
            let iDiv = document.createElement('div');
            iDiv.id = 'div' + i + ',' + j;
            iDiv.className = "child";

            parent.appendChild(iDiv);

            iDiv.addEventListener('mousedown', () => handleMouseDown(i, j));

            iDiv.addEventListener('mouseup', () => handleMouseUp(i, j, iDiv));
        }
    }
};

createDivs();

document.getElementById('row').addEventListener('input', function () {
    gridAreas = [];
    row = document.getElementById('row').value;
    createDivs();
});

document.getElementById('column').addEventListener('input', function () {
    gridAreas = [];
    column = document.getElementById('column').value;
    createDivs();
});

document.getElementById('gap-row').addEventListener('input', function () {
    gapRow = document.getElementById('gap-row').value;
    parent.style.gridRowGap = gapRow + "px";
});

document.getElementById('gap-column').addEventListener('input', function () {
    gapColumn = document.getElementById('gap-column').value;
    parent.style.gridColumnGap = gapColumn + "px";
});

const showCode = () => {
    css = `\n <span class="selector">.parent</span> {
        <span class="attribute">display</span>: <span class="value">grid</span>;
        <span class="attribute">grid-template-columns</span>: <span class="value">repeat(${column}, 1fr)</span>;
        <span class="attribute">grid-template-rows</span>: <span class="value">repeat(${row}, 1fr)</span>;
        <span class="attribute">grid-column-gap</span>: <span class="value">${gapColumn}px</span>;
        <span class="attribute">grid-row-gap</span>: <span class="value">${gapRow}px</span>;\n}
    <span></span>
    `;

    html = `\n<<span class="selector">div</span> <span class="attribute">class</span>="<span class="value">.parent</span>">`;

    gridAreas.forEach((div, i) => {
        css += `\n<span class="selector">.div${i + 1}</span> { <span class="attribute">grid-area</span>: <span class="value">${div}</span>; }`;
        html += `\n\t&lt;<span class="selector">div</span> <span class="attribute">class</span>="<span class="value">.div${i + 1}</span>"&gt; &lt;/<span class="selector">div</span>&gt;`;
    });

    html += `\n&lt;/<span class="selector">div</span>&gt;`;

    document.getElementById("code").innerHTML = css;
    openPopup();
}

const switchCode = () => {
    if (!isHtml) {
        htmlCode();
    } else {
        cssCode();
    }
}

const htmlCode = () => {
    const btn = document.getElementsByClassName('html-css')[0];
    document.getElementById("code").innerHTML = html;
    isHtml = true;
    btn.textContent = 'Show CSS';
}

const cssCode = () => {
    const btn = document.getElementsByClassName('html-css')[0];
    document.getElementById("code").innerHTML = css;
    isHtml = false;
    btn.textContent = 'Show HTML';
}

const openPopup = () => {
    var popup = document.getElementById("popup");

    var closeBtn = popup.querySelector(".close");

    popup.style.display = "block";

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
        cssCode();
    });
};

window.addEventListener("click", function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
        cssCode();
    }
});

const reset = () => {
    gridAreas = [];
    for (let i = 1; i <= row; i++) {
        for (let j = 1; j <= column; j++) {
            document.getElementById('div' + i + ',' + j).style.backgroundColor = '';
        }
    }
}