const form = document.querySelector('form'); 
const modal = document.getElementById("modal");
const parent = document.getElementById("grid-parent");
const child = document.getElementById("grid-child");
const cssContent = document.getElementById('text-css-content');
const htmlContent = document.getElementById('text-html-content');
let mouseDown = 0;
let z = 0;
let inputs = form.querySelectorAll("input");
let gridData = {};
let gridArea = {};
let addDiv = 0;
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
                div.setAttribute('id', `div-${index}`);
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
    mouseDown = parseInt((target.split('-'))[1]);
})

parent.addEventListener('mouseup', (event) => {
    let target = event.target.getAttribute('id');
    if (target === 'parent') return;
    let mouseUp = parseInt((target.split('-'))[1]);
    let colSize = parseInt(gridData['grid-template-columns']);
    if (mouseDown > mouseUp) [mouseDown, mouseUp] = [mouseUp, mouseDown]

    let x0 = mouseDown % colSize || colSize;
    let x1 = (mouseUp % colSize || colSize) + 1;
    let y0 = Math.ceil(mouseDown / colSize);
    let y1 = Math.ceil(mouseUp / colSize) + 1;
    let div = document.createElement('div');
    if (x0 > x1 - 1) {
        let diff = x0 - x1 - 1;
        [x0, x1] = [x0 - diff, x1 + diff];
    }
    div.setAttribute('id', `.div${addDiv++}`);
    gridArea[`div${addDiv}`] = { 'grid-area': `${y0} / ${x0} / ${y1} / ${x1}`};
    div.style.border = 'dotted 1px yellow';
    div.style.gridArea= `${y0} / ${x0} / ${y1} / ${x1}`;
    div.style.backgroundColor = genRandomColor();
    div.style.zIndex = z++;
    div.style.cursor = 'pointer';
    div.style.top = 0;
    div.style.left = 0;    
    child.appendChild(div);
})

function setCssCode(){
    let p = document.createElement('span');
    p.textContent = ".parent"
    p.setAttribute('class', 'content-parent');
    cssContent.append(p, ' {');
    for (let item in gridData){
        let keySpan = document.createElement('span');
        let contSpan = document.createElement('span');
        
        keySpan.setAttribute('class', 'content-key');
        contSpan.setAttribute('class', 'content-value');
        keySpan.textContent = item;
        contSpan.textContent = gridData[item];
        
        cssContent.append(document.createElement('br'), keySpan, ': ', contSpan);
    }
    cssContent.append(document.createElement('br'), '}', document.createElement('br'), document.createElement('br'));
    for (let item in gridArea){
        let divIndex = document.createElement('span');
        let area = document.createElement('span');
        let position = document.createElement('span');
        
        divIndex.setAttribute('class', 'content-parent');
        area.setAttribute('class', 'content-key');
        position.setAttribute('class', 'content-value');
        
        divIndex.textContent = '.' + item;
        area.textContent = 'grid-area: ';
        position.textContent = (gridArea[item])['grid-area'];
        
        cssContent.append(divIndex, ': { ', area, position, ' }', document.createElement('br'));
    }
}

function setHtmlCode(){
    let divClass = document.createElement('span')
    
    divClass.setAttribute('class', 'content-value');
    divClass.textContent = 'class="parent"';
    
    htmlContent.append('<div ', divClass, '>', document.createElement('br'));
    for (let item in gridArea){
        let divItem = document.createElement('span');
        divItem.setAttribute('class', 'content-value');
        
        divItem.textContent = `class="${item}"`;
        htmlContent.append('<div ', divItem, '> </div>', document.createElement('br'));
    }    
    htmlContent.append('</div>');
}

form.addEventListener('submit', function(event) { 
    event.preventDefault();
    removeAllChildNodes(cssContent);
    removeAllChildNodes(htmlContent);
    modal.style.display = "flex";
    setCssCode();
    setHtmlCode();
});

function handleCloseModal() {
    modal.style.display = "none";
}

document.getElementById('reset-btn').addEventListener('click',(event) =>{
    event.preventDefault();
    removeAllChildNodes(child);
    gridArea = {};
    addDiv = 0;
    z = 0;
});


window.onclick = function(event) {
    if (event.target == modal) handleCloseModal()
}

document.getElementById('close-btn').addEventListener('click',(event) =>{
    event.preventDefault();
    handleCloseModal();
});

document.getElementById('switch-css').addEventListener('click',(event) =>{
    event.preventDefault();
    cssContent.style.display = 'block';
    htmlContent.style.display = 'none';
});

document.getElementById('switch-html').addEventListener('click',(event) =>{
    event.preventDefault();
    cssContent.style.display = 'none';
    htmlContent.style.display = 'block';
});