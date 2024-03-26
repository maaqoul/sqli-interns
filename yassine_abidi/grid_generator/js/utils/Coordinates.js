export function getDevClickedCoordinates(devClicked, coordinates) {
    var id = devClicked.getAttribute("id");
    var column = devClicked.getAttribute("column");
    if (id)
        coordinates[0] = id;
    if (column)
        coordinates[1] = column;
}
export function calculateCoordinates(firstDivClickedCoordinates, lastDivClickedCoordinates, coordinates) {
    if (firstDivClickedCoordinates[0] / 5 > lastDivClickedCoordinates[0] / 5) {
        coordinates[0] = lastDivClickedCoordinates[0] / 5;
        coordinates[2] = firstDivClickedCoordinates[0] / 5;
    }
    else {
        coordinates[2] = lastDivClickedCoordinates[0] / 5;
        coordinates[0] = firstDivClickedCoordinates[0] / 5;
    }
    if (firstDivClickedCoordinates[1] > lastDivClickedCoordinates[1]) {
        coordinates[1] = lastDivClickedCoordinates[1];
        coordinates[3] = firstDivClickedCoordinates[1];
    }
    else {
        coordinates[3] = lastDivClickedCoordinates[1];
        coordinates[1] = firstDivClickedCoordinates[1];
    }
}
