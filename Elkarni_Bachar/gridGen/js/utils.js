/* *Generates a random color for the bg of divs */

function genRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    color += "80"; // 50% opacity (alpha part of the hex number)
    return color;
}