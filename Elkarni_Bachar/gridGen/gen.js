const formElement = document.getElementById("form");
const grid = document.querySelector(".gridBoard");
const showcase = document.querySelector(".gridShowcase");
const inputs = formElement.querySelectorAll("input");
const submit = formElement.querySelector('button[type="submit"]');
const reset = formElement.querySelector('button[type="reset"]');
const panel = document.getElementById("panel");
const codePanel = document.querySelector(".genCode");
const codeInnerPanel = document.querySelector(".codeInnerPanel")
const codeTextPanel = document.getElementById('code');
const codeSwitchBtn = document.getElementById("codeSwitch");
const closeCodeBtn = document.getElementById("codeClose");
const copyCodeBtn =  document.getElementById("codeCopy");

let startDiv = 0;
let endDiv = 0;
let div_Name_IdCounter = 1;

function genRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    color += "80"; // 50% opacity (alpha part of the hex number)
    return color;
}

const handleDivSelection = () => {
    const colsNumber = parseInt(inputs[0].value)
    const rowsNumber = parseInt(inputs[1].value)
    
    let colStart = 0, colEnd = 0, rowStart = 0, rowEnd = 0;
    if (startDiv > endDiv) [startDiv, endDiv] = [endDiv, startDiv]
    rowStart = Math.ceil(startDiv / rowsNumber);
    colStart = startDiv % colsNumber || colsNumber;
    rowEnd = Math.ceil(endDiv / rowsNumber);
    colEnd = endDiv % colsNumber || colsNumber;
    const showCaseItem = document.createElement("div");
    showCaseItem.style.backgroundColor = genRandomColor();
    showCaseItem.style.gridRowStart = `${rowStart}`;
    showCaseItem.style.gridRowEnd = `${rowEnd + 1}`
    showCaseItem.style.gridColumnStart = `${colStart}`
    showCaseItem.style.gridColumnEnd = `${colEnd + 1}`


    const name = document.createElement("p");
    name.innerText = `div ${div_Name_IdCounter}`
    showCaseItem.id = "showcase_"+div_Name_IdCounter;
    showCaseItem.appendChild(name)
    showcase.appendChild(showCaseItem)
    div_Name_IdCounter++;
    
    // create an entry in the formPanel
    const element = document.createElement("div");
    element.classList.add("element");
    const text = document.createElement("p");
    text.innerText = name.innerText;
    const btn = document.createElement("button");
    btn.setAttribute("data-id", showCaseItem.id)
    btn.innerText="remove";
    btn.addEventListener("click", (event)=>{
        removeShowcaseTile(event.target.getAttribute("data-id"));
        removePanelElement(element); 
    })
    element.appendChild(text);
    element.appendChild(btn);
    panel.appendChild(element);
}

const removeShowcaseTile = (id) => {
    const showcaseElement = document.getElementById(id)
    showcaseElement.remove()
}

const removePanelElement = (element) =>{
    //check if you are removing the last element or not
    if(panel.lastElementChild === element){
        element.remove();
        div_Name_IdCounter--;
        div_Name_IdCounter = elementText[elementText.length-1];
    }
    else{
        element.remove();
        div_Name_IdCounter = 1;
        for (let i = 0; i < panel.childNodes.length; i++) {
            panel.childNodes[i].childNodes[0].innerText = "div "+(div_Name_IdCounter)    
            showcase.childNodes[i].childNodes[0].innerText = "div "+(div_Name_IdCounter)
            div_Name_IdCounter++;
        }
    }
    const elementText = element.children[0].innerText.split("")
}

const resetGrids = ( ) => {
    showcase.innerHTML = ""
    grid.innerHTML = ""
}

const resetAll = () => {
    resetGrids();
    inputs[0].value = 5
    inputs[1].value = 5
    inputs[2].value = 0
    inputs[3].value = 0
    // manually triggering the change event
    inputs.forEach((input) => {
        const event = new Event("change");
        input.dispatchEvent(event);
    });
    createGridItems()

    //trigger panel reset
    panel.innerHTML="" 
    div_Name_IdCounter=1
}

const createGridItems = () => {
    grid.innerHTML = ""; // clears grid
    let idCounter = 1;
    // Creates new grid items based on input values
    for (let row = 0; row < inputs[1].value; row++) {
        for (let col = 0; col < inputs[0].value; col++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("boardItems");
            gridItem.id = idCounter;
            idCounter++;
            grid.appendChild(gridItem);
        }
    }

    //Creates an event listener to detect clicks and drags on each grid item
    const items = grid.querySelectorAll(".boardItems");
    items.forEach((item) => {
        item.addEventListener("mousedown", () => {
            startDiv = parseInt(item.id)
        });
        item.addEventListener("mouseup", () => {
            endDiv = parseInt(item.id);
            handleDivSelection()
        });
    });
}


const handleInputsChange = (event) => {
    switch (event.target.id) {
        case "cols":
            resetGrids();
            showcase.style.gridTemplateColumns = `repeat(${event.target.value}, 1fr)`;
            grid.style.gridTemplateColumns = `repeat(${event.target.value}, 1fr)`;
            break;
        case "rows":
            resetGrids();
            showcase.style.gridTemplateRows = `repeat(${event.target.value}, 1fr)`;
            grid.style.gridTemplateRows = `repeat(${event.target.value}, 1fr)`;
            break;
        case "colGaps":
            grid.style.columnGap = `${event.target.value}px`;
            showcase.style.columnGap = `${event.target.value}px`;
            break;
        case "rowGaps":
            grid.style.rowGap = `${event.target.value}px`;
            showcase.style.rowGap = `${event.target.value}px`;
            break;
        default:
            break;
    }
}

const genCssCode = () => {
    codeTextPanel.innerHTML = ""
    let cssBaseTemplate = `display: grid;\ngrid-template-columns: ${ showcase.style.gridTemplateColumns || "repeat(5,1fr)"};\ngrid-template-rows: ${showcase.style.gridTemplateRows || "repeat(5,1fr)"};\n`;
    let css = ""
    const GridChildren = showcase.childNodes;
    GridChildren.forEach((child)=>{        
        css += 
(`#${child.id} {
    grid-area: ${child.style.gridArea};
}`);
    })
    codeTextPanel.innerHTML = `<pre>${cssBaseTemplate+css}</pre>`;
}

const genHTMLCode = () =>{
    codeTextPanel.innerHTML = ""
    let text = "";
    const htmlElement = document.createElement("pre")
    const GridChildren = showcase.childNodes;
    GridChildren.forEach((child)=>{        
        text = child.outerHTML
        // Remove the style attribute from the HTML string
        text = text.replace(/ style="[^"]*"/g, '');
        // Directly add the formatted text with newlines
        htmlElement.textContent += text.replace(/(?<!p)>/g, ">\n");
    }) 
    codeTextPanel.appendChild(htmlElement);
}

const genCode = () => {
    const type = codeTextPanel.getAttribute("data-type");
    if(type == "css") 
        genCssCode()
    else if(type == "html")
        genHTMLCode()
}

const switchCode = () => {
    const type = codeTextPanel.getAttribute("data-type");
    codeTextPanel.setAttribute("data-type", type == "css"? "html" : "css");
    genCode();
    codeSwitchBtn.innerText = type !== "css"? "Show HTML" : "Show CSS";
    codeInnerPanel.children[0].innerText = type == "css" ? "HTML code" : "CSS code"
}

const closeCodePanel = ( ) => {
    codePanel.style.display = "none";
    codeTextPanel.innerHTML = ""
}

const copyCode = () => {
    const textToCopy = codeTextPanel.innerText;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Text copied to clipboard.');
        })
        .catch(err => {
            console.error('Unable to copy text to clipboard.', err);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    // Creates grid default items
    createGridItems();
    // Add event listeners for input changes
    inputs.forEach((input) => {
        input.addEventListener("change", handleInputsChange);
        input.addEventListener("change", createGridItems);
    });
    //Add event listeners for submit and reset
    formElement.addEventListener("submit",(event)=>{
        event.preventDefault()
    })
    reset.addEventListener("click",resetAll)
    submit.addEventListener("click",()=>{
        codePanel.style.display = "flex";
        codeTextPanel.setAttribute("data-type","css")
        genCode();
        codeSwitchBtn.innerText =  "Show HTML"
        codeInnerPanel.children[0].innerText = "CSS code" 
    })
    codeSwitchBtn.addEventListener("click",switchCode);
    closeCodeBtn.addEventListener("click",closeCodePanel);
    copyCodeBtn.addEventListener("click", copyCode);


    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            panel.style.display = panel.childElementCount > 0 ? "block" : "none"
          }
        });
      });
      
      observer.observe(panel, { childList: true });
})