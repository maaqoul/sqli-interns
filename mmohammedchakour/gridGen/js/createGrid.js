// the is the function creating the grid

function createGrid(col, row) {
    const gridContainer = document.getElementById("gridMap");
    gridContainer.innerHTML = "";
    for (let i = 0; i < col * row; i++) {
        let newBox = document.createElement("div");
        newBox.classList.add("box");
        newBox.setAttribute("id", `box${i + 1}`);
        gridContainer.appendChild(newBox);
    }
}