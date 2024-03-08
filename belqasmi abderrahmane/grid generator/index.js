const form = document.querySelector('form'); 
const modal = document.getElementById("modal");
const parent = document.getElementById("grid-parent");
const child = document.getElementById("grid-child");
const cssContent = document.getElementById('text-css-content');
const htmlContent = document.getElementById('text-html-content');
let mouseDown = 0;
let z = 1;
let inputs = form.querySelectorAll("input");
let gridData = {};
let gridArea = {};
let addDiv = 1;
function removeAllChildNodes(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

inputs.forEach(input => input.addEventListener('input', () => {
    gridData[input.name] = input.value;
    if (input.name !== 'row-gap' && input.name !== 'column-gap'){
        removeAllChildNodes(parent);
        parent.style[input.name] = `repeat(${parseInt(input.value)}, 1fr)`
        child.style[input.name] = `repeat(${parseInt(input.value)}, 1fr)`
        let colSize = gridData['grid-template-columns'];
        let rowSize = gridData['grid-template-rows'];
        let index = 1;
        if (colSize === undefined || rowSize === undefined)
            return;
        for (let i = 0 ; i < parseInt(rowSize); i++) {
            for (let j = 0 ; j < parseInt(colSize); j++, index++){
                let div = document.createElement('div');
                div.setAttribute('id', `div${index}`);
                div.style.border = 'dotted 1px yellow';
                div.style.backgroundColor = 'transparent'
                div.style.zIndex = 998;
                div.style.cursor = 'pointer'
                parent.appendChild(div);
            }
        }
    }
    else
    {
        let val = input.value;
        if (val === undefined) val = 0;
        parent.style[input.name] = val + 'px';
        child.style[input.name] = val + 'px';
    }
}))

function genRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    color += "80";
    return color;
}

parent.addEventListener('mousedown', (event) => {
    let target = event.target.getAttribute('id');
    if (target === 'parent') return;
    mouseDown = parseInt((target.split('v'))[1]);
})

parent.addEventListener('mouseup', (event) => {
    let target = event.target.getAttribute('id');
    if (target === 'parent') return;
    let mouseUp = parseInt((target.split('v'))[1]);
    let colSize = parseInt(gridData['grid-template-columns']);
    if (mouseDown > mouseUp) [mouseDown, mouseUp] = [mouseUp, mouseDown]
    let x0 = mouseDown % colSize || colSize;
    let x1 = (mouseUp % colSize || colSize) + 1;
    let y0 = Math.ceil(mouseDown / colSize);
    let y1 = Math.ceil(mouseUp / colSize) + 1;
    let div = document.createElement('div');
    div.setAttribute('id', `.div${addDiv}`);
    gridArea[`div${addDiv}`] = { 'grid-area': `${y0} / ${x0} / ${y1} / ${x1}`};
    div.style.border = 'dotted 1px yellow';
    div.style.gridArea= `${y0} / ${x0} / ${y1} / ${x1}`;
    div.style.backgroundColor = genRandomColor();
    div.style.zIndex = z;
    div.style.cursor = 'pointer';
    div.style.top = 0;
    div.style.left = 0;    
    addDiv++;
    z++;
    console.log(`${y0} / ${x0} / ${y1} / ${x1}`)
    child.appendChild(div);
})

function setCssCode(){
    let p = document.createElement('span');
    let closeP = document.createElement('span');
    p.textContent = ".parent {"
    closeP.textContent = "}"
    p.setAttribute('class', 'content-parent');
    closeP.setAttribute('class', 'content-parent');
    cssContent.appendChild(p);
    for (let item in gridData){
        let span = document.createElement('span');
        let keySpan = document.createElement('span');
        let contSpan = document.createElement('span');
        
        span.appendChild(document.createElement('br'));
        keySpan.setAttribute('class', 'content-key');
        contSpan.setAttribute('class', 'content-value');
        keySpan.textContent = item + ': ';
        contSpan.textContent = gridData[item];

        span.appendChild(keySpan);
        span.appendChild(contSpan);
        cssContent.appendChild(span);
    }
    cssContent.appendChild(document.createElement('br'));
    cssContent.appendChild(closeP);
    cssContent.appendChild(document.createElement('br'));
    cssContent.appendChild(document.createElement('br'));
    for (let item in gridArea){
        let span = document.createElement('span');
        let divIndex = document.createElement('span');
        let divIndexClose = document.createElement('span');
        let area = document.createElement('span');
        let position = document.createElement('span');
        
        divIndex.setAttribute('class', 'content-parent');
        divIndexClose.setAttribute('class', 'content-parent');
        area.setAttribute('class', 'content-key');
        position.setAttribute('class', 'content-value');
        
        divIndex.textContent = item + " { ";
        area.textContent = 'grid-area: ';
        position.textContent = (gridArea[item])['grid-area'];
        divIndexClose.textContent = " }";
        
        span.appendChild(divIndex);
        span.appendChild(area);
        span.appendChild(position);
        span.appendChild(divIndexClose);
        cssContent.append(span);
        cssContent.appendChild(document.createElement('br'));
    }
    let button = document.createElement('button');
    button.setAttribute('class', 'switch');
    button.setAttribute('id', 'switch-html');
    button.textContent = 'Show Html Code';
    cssContent.appendChild(button);
    button.addEventListener('click',(event) =>{
        event.preventDefault();
        cssContent.style.display = 'none';
        htmlContent.style.display = 'block';
    });
}
function setHtmlCode(){
    let div = document.createElement('span')
    let divClass = document.createElement('span')

    div.setAttribute('class', 'content-parent');
    divClass.setAttribute('class', 'content-value');
    div.textContent = 'div';
    divClass.textContent = 'class="parent"';

    htmlContent.append('<');
    htmlContent.appendChild(div);
    htmlContent.appendChild(divClass);
    htmlContent.append('>');
    htmlContent.append(document.createElement('br'));
    for (let item in gridArea){
        let divItem = document.createElement('span');
        let span = document.createElement('span');
        divItem.setAttribute('class', 'content-value');

        divItem.textContent = `class="${item}"`;
        span.append('<');
        span.appendChild(div);
        span.appendChild(divItem);
        span.append('> ');
        span.append('</');
        span.appendChild(div);
        span.append('>');
        span.append(document.createElement('br'));
        htmlContent.appendChild(span);
    }    
    htmlContent.append('</');
    htmlContent.appendChild(div);
    htmlContent.append('>'); 
    let button = document.createElement('button');
    button.setAttribute('class', 'switch');
    button.setAttribute('id', 'switch-css');
    button.textContent = 'Show Css Code';
    htmlContent.appendChild(button);
    button.addEventListener('click',(event) =>{
        event.preventDefault();
        cssContent.style.display = 'block';
    htmlContent.style.display = 'none';
    });
}

form.addEventListener('submit', function(event) { 
    event.preventDefault();
    removeAllChildNodes(cssContent);
    removeAllChildNodes(htmlContent);
    modal.style.display = "flex";
    setCssCode();
    setHtmlCode();
});

document.getElementById('reset-btn').addEventListener('click',(event) =>{
    event.preventDefault();
    removeAllChildNodes(child);
    gridArea = {};
});

function handleCloseModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) handleCloseModal()
}

document.getElementById('close-btn').addEventListener('click',(event) =>{
    event.preventDefault();
    handleCloseModal();
});
