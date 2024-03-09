// this is the event listner that handles the change of the values of inputs setting the grid layout

document.addEventListener("DOMContentLoaded", () => {    
    document.getElementById("columns").addEventListener("change", fillUpdateGrid);
    document.getElementById("rows").addEventListener("change", fillUpdateGrid);
    document
        .getElementById("column-gap")
        .addEventListener("change", fillUpdateGrid);
    document.getElementById("row-gap").addEventListener("change", fillUpdateGrid);

    fillUpdateGrid();
});