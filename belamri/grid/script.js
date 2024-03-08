/* elements */ 
const containerElem = document.getElementById("container")
const codeWrapperElem = document.getElementById("codeWrapper")
const codePopupElem = document.getElementById("codePopup")
const displayCodeButtonElem = document.getElementById('displayCodeButton')
const rowsElem = document.getElementById("rows")
const columsElem = document.getElementById("columns")
const cgapElem = document.getElementById("cgap")
const rgapElem = document.getElementById("rgap")
const heightsElem = document.getElementById('heights')
const widthsElem = document.getElementById('widths')


/* variables */ 
let rows = 5, columns = 5, cgap = 0, rgap = 0;
let start;
let divsCount = 1, divs = []
let showingHtml = false

/* elements */ 
window.addEventListener('load', () => {
    rowsElem.addEventListener('input', (e) => (rows = e.target.value = e.target.value >= 0 ? e.target.value < 20 ? e.target.value : 20 : 0, render()))
    columsElem.addEventListener('input', (e) => (columns = e.target.value = e.target.value >= 0 ? e.target.value : 0, render()))
    cgapElem.addEventListener('input', (e) => (cgap = e.target.value = e.target.value >= 0 ? e.target.value : 0, updateGaps()))
    rgapElem.addEventListener('input', (e) => (rgap = e.target.value = e.target.value >= 0 ? e.target.value : 0, updateGaps()))
    render()
})

/* functions */ 
const displayCode = () => {
    if (showingHtml) {
        displayCSS()
        displayCodeButtonElem.innerHTML = "Show HTML"
        return
    }
    showingHtml = true
    displayHTML()
}

const displayHTML = () => {
    let code = 
`
&lt;<span style="color:#ffea18;">div</span> <span style="color:#f8a384;">class="parent"</span>&gt;
`
    divs.forEach((div, i) => {
        code += `   &lt;<span style="color:#ffea18;">div</span> <span style="color:#f8a384;">class="div${i + 1}"</span>&gt &lt;/<span style="color:#ffea18;">div</span>&gt\n`    
    })
    code += `&lt;/<span style="color:#ffea18;">div</span>&gt;`
    codePopupElem.style.display = 'block'
    codeWrapperElem.innerHTML = code
    displayCodeButtonElem.innerHTML = "Show CSS"
}

const displayCSS = () => {
    showingHtml = false
    let code = 
`
<span style="color:yellow;">.parent</span> {
    <span style="color:#5FD4BF;">display</span>: <span style="color:#EE9D7F;">grid</span>;
    <span style="color:#5FD4BF;">grid-template-columns</span>: <span style="color:#EE9D7F;">${getGridTemplateColumns()}</span>;
    <span style="color:#5FD4BF;">grid-template-rows</span>: <span style="color:#EE9D7F;">${getGridTemplateRows()}</span>;
    <span style="color:#5FD4BF;">grid-column-gap</span>: <span style="color:#EE9D7F;">${cgap}px</span>;
    <span style="color:#5FD4BF;">grid-row-gap</span>: <span style="color:#EE9D7F;">${rgap}px</span>;
}
`
    divs.forEach((div, i) => {
        code += `<span style="color:yellow;">.div${i + 1}</span> { <span style="color:#5FD4BF;">grid-area</span>: <span style="color:#EE9D7F;">${div}</span>; }\n`
    })
    codePopupElem.style.display = 'block'
    codeWrapperElem.innerHTML = code
}

const closePopup = () => {
    codePopupElem.style.display = 'none'
}

const reset = () => {
    rows = 5, columns = 5, cgap = 0, rgap = 0, divsCount = 1, divs = []
    rowsElem.value = 5, columsElem.value = 5, rgapElem.value = 0, cgapElem.value = 0
    render()
}

const deleteAll = () => {
    while (containerElem.firstChild)
        containerElem.removeChild(containerElem.firstChild);
    while (heightsElem.firstChild)
        heightsElem.removeChild(heightsElem.firstChild);
    while (widthsElem.firstChild)
        widthsElem.removeChild(widthsElem.firstChild);
}

const addToGrid = (end) => {
    if (start[0] > end[0]) {
        let tmp = start[0]
        start[0] = end[0]
        end[0] = tmp
    }
    if (start[1] > end[1]) {
        let tmp = start[1]
        start[1] = end[1] 
        end[1] = tmp
    }
    divs.push((start[1] + 1) + " / " + (start[0] + 1) + " / " + (end[1] + 2) + " / " + (end[0] + 2))
    const randomColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')'
    let span = document.createElement('span');
    span.className = 'divNumber'
    span.innerHTML = '.div' + divsCount++
    document.querySelector(`[data-pos="${start[0]},${start[1]}"]`).appendChild(span)
    for (let i = start[0]; i <= end[0]; i++) {
        for (let j = start[1]; j <= end[1]; j++) {
            document.querySelector(`[data-pos="${i},${j}"]`).style.backgroundColor = randomColor
        }
    }
}

const addHeights = (rows) => {
    for (let i = 0; i < rows; i++) {
        const div = document.createElement('div');
        div.className = "inputWrapper";
        containerElem.appendChild(div);
        const input = document.createElement("input");
        input.addEventListener('change', (e) => {
            container.style.gridTemplateColumns = getGridTemplateColumns()
            container.style.gridTemplateRows = getGridTemplateRows()
            container.style.columnGap = cgap + 'px'
            container.style.rowGap = rgap + 'px'
        })
        input.setAttribute('row', i)
        input.type = "text";
        input.value = "1fr";
        div.appendChild(input);
        heightsElem.appendChild(div)
    }
}

const addWidhts = (columns) => {
    for (let i = 0; i < columns; i++) {
        const div = document.createElement('div');
        div.className = "inputWrapper";
        containerElem.appendChild(div);
        const input = document.createElement("input");
        input.addEventListener('change', (e) => {
            container.style.gridTemplateColumns = getGridTemplateColumns()
            container.style.gridTemplateRows = getGridTemplateRows()
            container.style.columnGap = cgap + 'px'
            container.style.rowGap = rgap + 'px'
        })
        input.setAttribute('column', i)
        input.type = "text";
        input.value = "1fr";
        div.appendChild(input);
        widthsElem.appendChild(div)
    }
}

const addChildren = (rows, columns) => {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const div = document.createElement('div');
            div.className = 'child';
            div.setAttribute('data-pos', j + "," + i)
            div.addEventListener('mousedown', () => (start = [j, i]))
            div.addEventListener('mouseup', () => addToGrid([j, i]))
            containerElem.appendChild(div);
        }
    }
}

const updateGaps = () => {
    container.style.columnGap = cgap + 'px';
    container.style.rowGap = rgap + 'px';
}

const renderLengths = () => {
}

const getGridTemplateColumns = () => {
    let k = 0
    const arr = Array.from(document.querySelectorAll('[column]'))
    if (!arr.length)
        return
    const elems = [Array(arr[0].value)]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].value == elems[k][0])
            elems[k].push(arr[i].value)
        else
            elems[++k] = [arr[i].value]
    }
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].length > 1)
            elems[i] = `repeat(${elems[i].length}, ${elems[i][0]})`
        else
            elems[i] = elems[i][0]
    }
    return elems.join(' ');
}

const getGridTemplateRows = () => {
    let k = 0
    const arr = Array.from(document.querySelectorAll('[row]'))
    if (!arr.length)
        return
    const elems = [Array(arr[0].value)]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].value == elems[k][0])
            elems[k].push(arr[i].value)
        else
            elems[++k] = [arr[i].value]
    }
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].length > 1)
            elems[i] = `repeat(${elems[i].length}, ${elems[i][0]})`
        else
            elems[i] = elems[i][0]
    }
    return elems.join(' ');
}

const render = () => {
    divs = []
    deleteAll()
    addChildren(rows, columns)
    addHeights(rows)
    addWidhts(columns)
    const gridTemplateColumns = getGridTemplateColumns()
    const gridTemplateRows = getGridTemplateRows()
    container.style.gridTemplateColumns = gridTemplateColumns
    container.style.gridTemplateRows = gridTemplateRows
    container.style.columnGap = cgap + 'px'
    container.style.rowGap = rgap + 'px'
}
