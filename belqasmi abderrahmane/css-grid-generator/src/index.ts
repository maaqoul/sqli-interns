import { grid, codeContent } from "./classes";
import { modal } from "./button-event";

const form = document.querySelector('form');
let inputs = form!.querySelectorAll("input");
let mouseDown = 0;
export let z = 0;
let gridData : {[key: string]: string} = {};
export let gridArea :  {[key: string]: {[key: string]: string}} = {};
export let addDiv = 0;

inputs.forEach((input: HTMLInputElement) => input.addEventListener('input', () => {
    gridData[input.name] = input.value;
    if (input.name !== 'row-gap' && input.name !== 'column-gap'){
        grid.clearParent();
        grid.setParentStyle(input.name, `repeat(${parseInt(input.value)}, 1fr)`);
        grid.setChildStyle(input.name, `repeat(${parseInt(input.value)}, 1fr)`);
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
                div.style.zIndex = '998';
                div.style.cursor = 'pointer'
                grid.appendToParent(div);
            }
        }
    }
    else
    {
        let val = input.value;
        if (val === undefined) val = '0';
        grid.setParentStyle(input.name, val + 'px');
        grid.setChildStyle(input.name, val + 'px');
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
    let target = (event.target! as HTMLElement).getAttribute('id') || '';
    if (target.slice(0, 3) !== 'div') return;
    mouseDown = parseInt((target!.split('-'))[1]);
})

parent.addEventListener('mouseup', (event: MouseEvent) => {
    let target = (event.target! as HTMLElement).getAttribute('id') || '';
    if (target.slice(0, 3) !== 'div') return;
    let mouseUp = parseInt((target!.split('-'))[1]);
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
    console.log('grid-area', `${y0} / ${x0} / ${y1} / ${x1}`)
    gridArea[`div${addDiv}`] = { 'grid-area': `${y0} / ${x0} / ${y1} / ${x1}`};
    div.style.border = 'dotted 1px yellow';
    div.style.gridArea= `${y0} / ${x0} / ${y1} / ${x1}`;
    div.style.backgroundColor = genRandomColor();
    div.style.zIndex = (z++).toString();
    div.style.cursor = 'pointer';
    div.style.top = '0';
    div.style.left = '0';    
    grid.appendToChild(div);
})

function setCssCode(){
    let p = document.createElement('span');
    p.textContent = ".parent"
    p.setAttribute('class', 'content-parent');
    codeContent.appendToCss(p, ' {');
    for (let item in gridData){
        let keySpan = document.createElement('span');
        let contSpan = document.createElement('span');
        
        keySpan.setAttribute('class', 'content-key');
        contSpan.setAttribute('class', 'content-value');
        keySpan.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;' + item;
        contSpan.textContent = gridData[item];
        
        codeContent.appendToCss(document.createElement('br'), keySpan, ': ', contSpan);
    }
    codeContent.appendToCss(document.createElement('br'), '}', document.createElement('br'), document.createElement('br'));
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
        
        codeContent.appendToCss(divIndex, ': { ', area, position, ' }', document.createElement('br'));
    }
}

function setHtmlCode(){
    let divClass = document.createElement('span')
    
    divClass.setAttribute('class', 'content-value');
    divClass.textContent = 'class="parent"';
    
    codeContent.appendToHtml('<div ', divClass, '>', document.createElement('br'));
    for (let item in gridArea){
        let divItem = document.createElement('span');
        let span = document.createElement('span');

        divItem.setAttribute('class', 'content-value');
        span.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
        divItem.textContent = `class="${item}"`;

        span.append('<div ', divItem, '> </div>', document.createElement('br'));
        codeContent.appendToHtml(span);
    }    
    codeContent.appendToHtml('</div>');
}

form!.addEventListener('submit', function(event) { 
    event.preventDefault();
    codeContent.clearCssContent()
    codeContent.clearHtmlContent()
    modal!.style.display = "flex";
    setCssCode();
    setHtmlCode();
});

document.getElementById('reset-btn')!.addEventListener('click',(event) =>{
    event.preventDefault();
    grid.clearChild();
    gridArea = {};
    addDiv = 0;
    z = 0;
});