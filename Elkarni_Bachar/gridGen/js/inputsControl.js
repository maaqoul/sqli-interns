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