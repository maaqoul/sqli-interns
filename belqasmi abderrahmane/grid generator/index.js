const form = document.querySelector('form'); 
const modal = document.getElementById("modal");
const parent = document.getElementById("parent");
const child = document.getElementById("child");
const content = document.getElementById('text-content');
let mouseDown = 0;
let z = 1;
let inputs = form.querySelectorAll("input");
let arr = {};
let addDiv = 1;
function removeAllChildNodes(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

inputs.forEach(input => input.addEventListener('input', () => {
    arr[input.name] = input.value;
    if (input.name !== 'row-gap' && input.name !== 'column-gap'){
        removeAllChildNodes(parent);
        parent.style[input.name] = `repeat(${parseInt(input.value)}, 1fr)`
        child.style[input.name] = `repeat(${parseInt(input.value)}, 1fr)`
        let colSize = arr['grid-template-columns'];
        let rowSize = arr['grid-template-rows'];
        let index = 1;
        if (colSize === undefined || rowSize === undefined)
            return;
        for (let i = 0 ; i < parseInt(rowSize); i++) {
            for (let j = 0 ; j < parseInt(colSize); j++, index++){
                let div = document.createElement('div');
                div.setAttribute('id', `div${index}`);
                div.style.border = 'dotted 1px yellow';
                div.style.backgroundColor = '#2a0b57'
                div.style.cursor = 'pointer'
                parent.appendChild(div);
            }
        }
    }
    else
    {
        console.log(input.name + input.value)
        parent.style[input.name] = input.value + 'px';
        child.style[input.name] = input.value + 'px';
    }
}))

parent.addEventListener('mousedown', (event) => {
    let target = event.target.getAttribute('id');
    if (target === 'parent') return;
    mouseDown = parseInt((target.split('v'))[1]);
})

parent.addEventListener('mouseup', (event) => {
    let target = event.target.getAttribute('id');
    if (target === 'parent') return;
    let mouseUp = parseInt((target.split('v'))[1]);
    let colSize = parseInt(arr['grid-template-columns']);
    let x0;
    let x1;
    let y0 = 1;
    let y1 = 1;
    if (mouseDown > mouseUp) [mouseDown, mouseUp] = [mouseUp, mouseDown]
    while (mouseDown > colSize) {
        mouseDown -= colSize;
        y0++;
    }
    while (mouseUp > colSize) {
        mouseUp -= colSize;
        y1++;
    }
    x0 = Math.floor(mouseDown);
    x1 = Math.floor(mouseUp);
    y1++;
    x1++;
    let div = document.createElement('div');
    div.setAttribute('id', `child-div${addDiv}`);
    div.style.border = 'dotted 1px yellow';
    div.style.gridArea= `${y0} / ${x0} / ${y1} / ${x1}`;
    div.style.backgroundColor = 'black';
    div.style.zIndex = z;
    div.style.cursor = 'pointer';
    div.style.top = 0;
    div.style.left = 0;    
    addDiv++;
    z++;
    console.log(`${y0} / ${x0} / ${y1} / ${x1}`)
    child.appendChild(div);
})

form.addEventListener('submit', function(event) { 
    event.preventDefault();
    modal.style.display = "flex";
    content.textContent = JSON.stringify(arr);
});

function handleCloseModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) handleCloseModal()
  }