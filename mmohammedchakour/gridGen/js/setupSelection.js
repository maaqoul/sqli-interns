//this function is responsible for the visual changes while selecting areas on the grid

function setupSelection() {
    const gridContainer = document.getElementById("gridMap");
    let selectionCount = 0;
    let isDragging = false;

    const toggleSelection = (element, selectionClass) => {
        element.classList.toggle(selectionClass);
    };

    gridContainer.onmousedown = (e) => {
        if (e.button === 0) {
            isDragging = true;
            selectionCount++;
            const currentSelectionClass = `selection-${selectionCount}`;
            
            createDynamicStyle(currentSelectionClass);

            if (e.target.classList.contains("box")) {
                e.target.classList.forEach(className => {
                    if(regexTest.test(className)) {
                        e.target.classList.remove(className);
                    }
                });
                toggleSelection(e.target, currentSelectionClass);
            }
            e.preventDefault();
        }
    };

    gridContainer.onmouseup = () => (isDragging = false);
    document.onmouseup = () => (isDragging = false);
    const regexTest = /\bselection-\d+\b/;

    gridContainer.addEventListener("mouseover", (e) => {
        if (isDragging && e.target.classList.contains("box")) {
            e.target.classList.forEach((className) => {
                if (regexTest.test(className)) {
                    e.target.classList.remove(className);
                }
            });
            const currentSelectionClass = `selection-${selectionCount}`;
            toggleSelection(e.target, currentSelectionClass);
        }
    });

    gridContainer.addEventListener("contextmenu", (e) => {
        if (e.target.classList.contains("box")) {
            for (let i = 1; i <= selectionCount; i++) {
                e.target.classList.remove(`selection-${i}`);
            }
            e.preventDefault();
        }
    });
}