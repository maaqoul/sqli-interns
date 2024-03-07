document.addEventListener("DOMContentLoaded", () => {
    let start;
    let divCounts = 1;
    const generateColor = () => {
        return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 0.6)`;
    }

    const appendGrid = (end) => {
        console.log(start,end);
        if (start[0] > end[0]) {
            let tmp = start[0];
            start[0] = end[0];
            end[0] = tmp;
        }
        if (start[1] > end[1]) {
            let tmp = start[1];
            start[1] = end[1];
            end[1] = tmp;
        }
        const color = generateColor();
        const childBox = document.createElement('div');
        for (let i = start[0];i <= end[0]; i++) {
            for(let j = start[1]; j <= end[1]; j++) {
                console.log(i,j);
                document.querySelector(`.box[pos="${i},${j}"]`).style.backgroundColor = color;
            }
        }
    }

    const addBox = (rows,columns) => {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                const box = document.createElement('div');
                box.classList.add('box');
                box.setAttribute('pos', i + ',' + j);
                box.addEventListener('mousedown', () => {start = [i,j]});
                box.addEventListener('mouseup',() => {appendGrid([i,j])});
                gridLayout.appendChild(box);
            }
        }
    }



    const clearGrid = () => {
        while (gridLayout.firstChild) {
            gridLayout.removeChild(gridLayout.firstChild);
        }
    }

    const gridLayout = document.querySelector(".gridLayout");
    const formSetting = document.querySelector("#formSettings");

    formSetting.addEventListener('submit', (e) => {

        clearGrid();

        e.preventDefault();
        const formSettingData = new FormData(formSetting);
        const objSetting = {
            'columns': parseInt(formSettingData.get('columns')),
            'rows': parseInt(formSettingData.get('rows')),
            'columnGap': formSettingData.get('columnGap'),
            'rowGap': formSettingData.get('rowGap')
        };

        gridLayout.style.gridTemplateColumns = `repeat(${objSetting['columns']}, 1fr)`;
        gridLayout.style.gridTemplateRows = `repeat(${objSetting['rows']}, 1fr)`;
        gridLayout.style.columnGap = `${objSetting['columnGap']}px`;
        gridLayout.style.rowGap = `${objSetting['rowGap']}px`;

        addBox(objSetting['rows'], objSetting['columns']);
    });
})