// this is the part that handles the popup containing the generated css code

const popup = document.getElementById("popup");
const popCon = document.getElementById("popContainer");

function openPopup() {
    const col = document.getElementById("columns").value;
    const row = document.getElementById("rows").value;
    const colGap = document.getElementById("column-gap").value;
    const rowGap = document.getElementById("row-gap").value;
    const cssCode = document.getElementById("text-area");
    
    const cssForSelections = selectedAreaProp();

    popup.classList.add("open-popup");
    popCon.style.visibility = "visible";
    cssCode.innerText = `.parent {\n\tgrid-template-columns: repeat(${col}, 1fr);\n\tgrid-template-rows: repeat(${row}, 1fr);\n\tcolumn-gap: ${colGap}px;\n\trow-gap: ${rowGap}px;\n}\n\n`+ cssForSelections;
}

function closePopup() {
    popup.classList.remove("open-popup");
    popCon.style.visibility = "hidden";
}