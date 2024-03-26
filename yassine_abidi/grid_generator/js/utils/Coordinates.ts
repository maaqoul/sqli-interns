
export function getDevClickedCoordinates( devClicked: Element, coordinates : number[] )
{
    let id : any = devClicked.getAttribute("id");
    let column : any = devClicked.getAttribute("column");

    if (id)
        coordinates[0] = id;
    if (column)
        coordinates[1] = column;

}

export function calculateCoordinates(firstDivClickedCoordinates : number[], lastDivClickedCoordinates : number [], coordinates : number[])
{
    if (firstDivClickedCoordinates[0] / 5 > lastDivClickedCoordinates[0] / 5)
    {
        coordinates[0] =  lastDivClickedCoordinates[0] / 5;
        coordinates[2] = firstDivClickedCoordinates[0]/ 5;       
    }
    else
    {
        coordinates[2] =  lastDivClickedCoordinates[0] / 5;                
        coordinates[0] =  firstDivClickedCoordinates[0] / 5; 
    }

    if (firstDivClickedCoordinates[1] > lastDivClickedCoordinates[1])
    {
        coordinates[1] =  lastDivClickedCoordinates[1];
        coordinates[3] =  firstDivClickedCoordinates[1];
    }
    else
    {
        coordinates[3] =  lastDivClickedCoordinates[1];
        coordinates[1] =  firstDivClickedCoordinates[1];
    }
}
