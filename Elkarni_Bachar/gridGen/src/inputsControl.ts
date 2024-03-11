const handleInputsChange = (event: Event) => {
  const inputElement: HTMLInputElement = event.target as HTMLInputElement;
  switch (inputElement.id) {
    case "cols":
      resetGrids();
      if (showcase)
        showcase.style.gridTemplateColumns = `repeat(${inputElement.value}, 1fr)`;
      if (grid)
        grid.style.gridTemplateColumns = `repeat(${inputElement.value}, 1fr)`;
      break;
    case "rows":
      resetGrids();
      if (showcase)
        showcase.style.gridTemplateRows = `repeat(${inputElement.value}, 1fr)`;
      if (grid)
        grid.style.gridTemplateRows = `repeat(${inputElement.value}, 1fr)`;
      break;
    case "colGaps":
      if (grid) grid.style.columnGap = `${inputElement.value}px`;
      if (showcase) showcase.style.columnGap = `${inputElement.value}px`;
      break;
    case "rowGaps":
      if (grid) grid.style.rowGap = `${inputElement.value}px`;
      if (showcase) showcase.style.rowGap = `${inputElement.value}px`;
      break;
    default:
      break;
  }
};
