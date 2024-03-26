// import {addEventListenerToALLInputs} from "./utils/addEventListeners"
import { getDevClickedCoordinates, calculateCoordinates } from "./utils/Coordinates.js";
import { addEventListenerToALLInputs } from "../js/utils/addEventListeners.js";
import { colorifySelectedDivs, generateRBG } from "./utils/coloring.js";
import { addHtmlcss, fillDivsContainer } from "./utils/addHtmlElements.js";
import { divcount, columnGapValue, rowGapValue, firstDivClickedCoordinates, lastDivClickedCoordinates, coordinates, randomRGB, cssCode, htmlCode, incDivcount } from "./env/declarations.js";
document.addEventListener("DOMContentLoaded", function () {
    var divsContainer = document.querySelector(".container");
    if (!divsContainer) {
        console.error("cannot find divsContainer element!");
        return;
    }
    fillDivsContainer(divsContainer);
    //   let divcount : number = 1
    //   let columnGapValue : number = 0
    //   let rowGapValue : number = 0
    //   let firstDivClickedCoordinates : number[] = []
    //   let lastDivClickedCoordinates : number[] = []
    //   let coordinates : number[] = []
    //   let randomRGB : number[] = []
    //   let cssCode : Element = document.createElement('div');
    //   let htmlCode : Element = document.createElement('div');
    var elements = divsContainer.querySelectorAll("div");
    elements.forEach(function (element) {
        element.addEventListener("mousedown", function (even) {
            getDevClickedCoordinates(element, firstDivClickedCoordinates);
        });
        element.addEventListener("mouseup", function (even) {
            getDevClickedCoordinates(element, lastDivClickedCoordinates);
            calculateCoordinates(firstDivClickedCoordinates, lastDivClickedCoordinates, coordinates);
            generateRBG(randomRGB);
            addHtmlcss(coordinates, divcount, htmlCode, cssCode);
            colorifySelectedDivs(coordinates, randomRGB, divcount);
            incDivcount();
        });
    });
    addEventListenerToALLInputs(columnGapValue, rowGapValue, divsContainer, htmlCode, cssCode);
});
