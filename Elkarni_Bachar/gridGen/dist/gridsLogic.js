"use strict";
let startDiv = 0; //=> selected grid item (the starting tile)
let endDiv = 0; //=> selected grid item (the ending tile)
let div_Name_IdCounter = 1; //=> used to name the items on the showcase (div_1, div_2, div_3...) => the number part
//=> This handles the specification of an item within the showcase grid when selecting a starting and ending tiles
const handleTileSelection = () => {
    const colsNumber = parseInt(inputs[0].value);
    const rowsNumber = parseInt(inputs[1].value);
    /*
        ! calculating the grid area properties
    */
    let colStart = 0, colEnd = 0, rowStart = 0, rowEnd = 0;
    if (startDiv > endDiv)
        [startDiv, endDiv] = [endDiv, startDiv]; //=> Swapping the starting and ending positions to avoid negative number when substracting
    rowStart = Math.ceil(startDiv / rowsNumber);
    colStart = startDiv % colsNumber || colsNumber;
    rowEnd = Math.ceil(endDiv / rowsNumber);
    colEnd = endDiv % colsNumber || colsNumber;
    //=> creating and styling the new tile
    const showCaseItem = document.createElement("div");
    showCaseItem.style.backgroundColor = genRandomColor();
    showCaseItem.style.gridArea = `${rowStart}/${colStart}/${rowEnd + 1}/${colEnd + 1}`;
    //=> defining the name of the new tile
    const name = document.createElement("p");
    name.innerText = `div ${div_Name_IdCounter}`;
    showCaseItem.id = "showcase_" + div_Name_IdCounter;
    showCaseItem.appendChild(name);
    div_Name_IdCounter++; //=> Incrementing the tiles displayed innerText number
    if (showcase)
        showcase.appendChild(showCaseItem); //=> Adding the item to the showcase grid
    //=> create a reference entry for the selected element in the reference panel
    createItemReference(name.innerText, showCaseItem.id);
};
//=> This creates an entry inside the item reference panel
const createItemReference = (itemName, itemId) => {
    const element = document.createElement("div");
    element.classList.add("element");
    const text = document.createElement("p");
    text.innerText = itemName;
    const btn = document.createElement("button");
    btn.setAttribute("data-id", itemId);
    btn.innerText = "remove";
    btn.addEventListener("click", (event) => {
        const btnElement = event.target;
        removeShowcaseTile(btnElement.getAttribute("data-id"));
        removeItemReference(element);
    });
    element.appendChild(text);
    element.appendChild(btn);
    referencePanel.appendChild(element);
};
const removeShowcaseTile = (id) => {
    const showcaseElement = document.getElementById(id);
    showcaseElement.remove();
};
//=> This removes an entry from within the item reference panel
const removeItemReference = (item) => {
    const elementNum = item.children[0].innerText.split("").pop();
    //=> The conditional is used for both the cases when the removed element is the last in the reference list and alse when it's not
    if (referencePanel.lastElementChild === item) {
        item.remove();
        div_Name_IdCounter--;
    }
    else {
        item.remove();
        div_Name_IdCounter = parseInt(elementNum); //=> resets the counter to the deleted item's number
        //=> Updating the names of all the elements after the removed one
        for (let i = div_Name_IdCounter - 1; i < referencePanel.childNodes.length; i++) {
            referencePanel.childNodes[i].childNodes[0].innerText =
                "div " + div_Name_IdCounter; //=> renaming the referencePanel items
            referencePanel.childNodes[i].childNodes[1].setAttribute("data-id", "showcase_" + div_Name_IdCounter); //=> renaming the referencePanel data-id attribute
            showcase.childNodes[i].childNodes[0].innerText =
                "div " + div_Name_IdCounter; //=> renaming the showcase grid items
            showcase.childNodes[i].setAttribute("id", "showcase_" + div_Name_IdCounter); //=> renaming the showcase grid items
            div_Name_IdCounter++;
        }
    }
};
//=> This creates empty selectable tiles inside the original grid
const createGridTiles = () => {
    grid.innerHTML = ""; //=> clears the grid
    let idCounter = 1;
    //=> Creates new grid items based on the input values (rows and cols sizes)
    for (let row = 0; row < parseInt(inputs[1].value); row++) {
        for (let col = 0; col < parseInt(inputs[0].value); col++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("boardItems");
            gridItem.id = idCounter.toString();
            idCounter++;
            grid.appendChild(gridItem);
        }
    }
    //=> Creates an event listener to detect mouse clicks and release on each grid item
    const items = grid.querySelectorAll(".boardItems");
    items.forEach((item) => {
        item.addEventListener("mousedown", () => {
            startDiv = parseInt(item.id);
        });
        item.addEventListener("mouseup", () => {
            endDiv = parseInt(item.id);
            handleTileSelection();
        });
    });
};
