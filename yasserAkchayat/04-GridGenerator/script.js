
        // Update grid on input change

        const grid = document.getElementById('grid');
        const controls = document.getElementById('controls');
        const rows = document.getElementById('rows');
        const columns = document.getElementById('columns');
        const columnGap = document.getElementById('columnGap');
        const rowGap = document.getElementById('rowGap');

        controls.addEventListener('input', function (e) {
            e.preventDefault();
            grid.style.gridTemplateColumns = `repeat(${columns.value}, 1fr)`;
            grid.style.gridTemplateRows = `repeat(${rows.value}, 1fr)`;
            grid.style.columnGap = `${columnGap.value}px`;
            grid.style.rowGap = `${rowGap.value}px`;
            grid.innerHTML = '';

            for (let i = 0; i < rows.value * columns.value; i++) {
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                gridItem.textContent = i + 1;
                grid.appendChild(gridItem);
            }
        });
        // add new group

        const groupForm = document.getElementById('groupForm');
        const addGroupButton = document.getElementById('addGroupButton');
        let groupCount = 1; // Counter to keep track of group number

        addGroupButton.addEventListener('click', function () {
            // Create a new group input element only if less than 5 groups exist
            if (groupCount < 6) {
                const groupInput = document.createElement('input');
                groupInput.type = 'text';
                groupInput.name = `group${groupCount}`; 
                groupInput.id = `group${groupCount}`; 
                groupInput.placeholder = `Enter group ${groupCount} numbers separated by commas (e.g. 1, 2, 3)`;
                groupInput.classList.add('group-input');

                // Append the new input element to the form
                groupForm.insertBefore(groupInput, addGroupButton);
                groupCount++; 

                const groupsHeight = document.getElementById('groups').offsetHeight;
                document.getElementById('showCode').style.height = groupsHeight + 'px';
            }
                // Disable the "Add group" button after reaching the maximum number of groups (5)
            if (groupCount === 6) {
                addGroupButton.disabled = true;
            }
        });


        // Get group input values on updating the form

        const gform = document.getElementById('groupForm');
        const groupValues = []; 

        gform.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(gform);

            // Clear the existing values in the array
            groupValues.length = 0;

            for (const [key, value] of formData.entries()) {
                if (key.startsWith('group')) {
                    groupValues.push(value);
                }
            }

            // Highlight groups when the form is submitted
            highlightGroups();
            generateAndApplyGridCss();
        });

        // Listen for 'input' event on the controls

        controls.addEventListener('input', function (e) {
            e.preventDefault();

            grid.style.gridTemplateColumns = `repeat(${columns.value}, 1fr)`;
            grid.style.gridTemplateRows = `repeat(${rows.value}, 1fr)`;
            grid.style.columnGap = `${columnGap.value}px`;
            grid.style.rowGap = `${rowGap.value}px`;
            grid.innerHTML = '';

            for (let i = 0; i < rows.value * columns.value; i++) {
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                gridItem.textContent = i + 1;
                grid.appendChild(gridItem);
            }

            // Highlight groups when the input changes
            highlightGroups();
        });
        // Highlight groups function
        function highlightGroups() {
            groupValues.forEach((group, index) => {
                const groupNumbers = group.split(',').map(num => num.trim());
                const gridItems = document.querySelectorAll('.grid-item');
                const highlightClass = `highlight-${index + 1}`;

                gridItems.forEach(item => {
                    const itemNumber = item.textContent.trim();

                    if (groupNumbers.includes(itemNumber)) {
                        item.classList.add(highlightClass);
                    } else {
                        item.classList.remove(highlightClass);
                    }
                });
            });
        }

    // Update grid on input change
    controls.addEventListener('input', function (e) {
        e.preventDefault();

        grid.style.gridTemplateColumns = `repeat(${columns.value}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${rows.value}, 1fr)`;
        grid.style.columnGap = `${columnGap.value}px`;
        grid.style.rowGap = `${rowGap.value}px`;
        grid.innerHTML = '';

        for (let i = 0; i < rows.value * columns.value; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.textContent = i + 1;
            grid.appendChild(gridItem);
        }
    });

    function generateAndApplyGridCss() {
        const groupCss = groupValues.map((group, index) => {
            const highlightClass = `.highlight-${index + 1}`;
            const gridElements = group.split(',').map(num => num.trim());
            const gridAreaValues = calculateGridAreaValues(gridElements);

            return `
                ${highlightClass} {
                    grid-area: ${gridAreaValues};
                    background-color: yellow;
                }
            `;
        }).join('\n');
        const styleTag = document.getElementById('dynamic-styles');
        if (styleTag) {
            styleTag.textContent = groupCss;
        } else {
            const newStyleTag = document.createElement('style');
            newStyleTag.id = 'dynamic-styles';
            newStyleTag.textContent = groupCss;
            document.head.appendChild(newStyleTag);
        }
    }

    // Calculate grid area values based on the grid elements
    function calculateGridAreaValues(gridElements) {
        const min = Math.min(...gridElements);
        const max = Math.max(...gridElements);
        const startRow = Math.ceil(min / rows.value);
        const endRow = Math.ceil(max / rows.value);
        const startColumn = (min % columns.value) || columns.value;
        const endColumn = (max % columns.value) || columns.value;

        return `${startRow} / ${startColumn} / ${endRow + 1} / ${endColumn +1}`;
    }
    function generateAndApplyGridCss() {
            const groupCss = groupValues.map((group, index) => {
            const highlightClass = `.div-${index + 1}`;
            const gridElements = group.split(',').map(num => num.trim());
            const gridAreaValues = calculateGridAreaValues(gridElements);

            return `
${highlightClass} {
    grid-area: ${gridAreaValues};
}
            `;
        }).join('\n');
        return groupCss;
    } 

    function generateAndApplyGridHtml() {
            const groupHtml = groupValues.map((group, index) => {
            const highlightClass = `div-${index + 1}`;
            const gridElements = group.split(',').map(num => num.trim());

            return `
                <div class="${highlightClass}"></div>
            `;
        }).join('\n');
        return groupHtml;
    } 

    // display code + done button

    const displayButton = document.getElementById('displayCode');
    const doneButton = document.getElementById('done');
    const showHtmlButton = document.getElementById('showHtml');
    const showCssButton = document.getElementById('showCss');
    const genCssContainer = document.getElementById('GenCssContainer');
    const generatedCss = document.getElementById('generatedCss');
    const genCss = document.getElementById('genCss');
    const generatedHtml = document.getElementById('generatedHtml');
    const genHtml = document.getElementById('genHtml');
    

    displayButton.addEventListener('click', function() {
            const groupCss = generateAndApplyGridCss();
            const groupHtml = generateAndApplyGridHtml();
            genCssContainer.style.display = 'flex';
            genCssContainer.style.position = 'fixed';
            generatedCss.textContent = `
.parent {
    display: grid;
    grid-template-columns: repeat(${columns.value}, 1fr);
    grid-template-rows: repeat(${rows.value}, 1fr);
    grid-column-gap: ${columnGap.value}px;
    grid-row-gap: ${rowGap.value}px;
}


    ${groupCss}
`;
generatedHtml.textContent = `
<div class="parent">   
    ${groupHtml}
</div>
`;
    });
    doneButton.addEventListener('click', function() {
            genCssContainer.style.display = 'none';
            console.log('Done button clicked');

    });
    showHtmlButton.addEventListener('click', function() {
            genCss.style.display = 'none';
            genHtml.style.display = 'flex';
            console.log('Done button clicked');

    });
    showCssButton.addEventListener('click', function() {
            genHtml.style.display = 'none';
            genCss.style.display = 'flex';
            console.log('Done button clicked');

    });

    
