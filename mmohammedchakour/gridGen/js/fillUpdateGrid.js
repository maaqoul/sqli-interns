// this is the function updating the grid based on the new values

function fillUpdateGrid() {
    const gridContainer = document.getElementById("gridMap");

    const col = document.getElementById("columns").value || 5;
    const row = document.getElementById("rows").value || 5;
    const colGap = document.getElementById("column-gap").value || 5;
    const rowGap = document.getElementById("row-gap").value || 5;

    gridContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    gridContainer.style.gap = `${rowGap}px ${colGap}px`;
    gridContainer.classList.remove("initial-gridMap");

    createGrid(col, row);
    setupSelection();
}