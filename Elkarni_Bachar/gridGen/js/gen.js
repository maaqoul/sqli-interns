const grid = document.querySelector(".gridBoard"); //?  The grid used to select items (click && drag)
const showcase = document.querySelector(".gridShowcase"); //? The grid used to display selected items
const formElement = document.getElementById("form"); //? The form holding the inputs
const inputs = formElement.querySelectorAll("input"); //? The inputs (cols,rows,colgap,rowgap)
const submit = formElement.querySelector("button[type='submit']"); //? code generation button
const reset = formElement.querySelector("button[type='reset']"); //? board reset button
const referencePanel = document.getElementById("referencePanel"); //? The panel showing the list of selected items
const smokeScreen = document.querySelector(".smokeScreen");
const codeInnerPanel = document.querySelector(".innerPanel");
const codeTextPanel = document.getElementById("code"); //? The p tag holding the code
const codeSwitchBtn = document.getElementById("codeSwitch"); //? The button switching html with css code
const closeCodeBtn = document.getElementById("codeClose");
const copyCodeBtn = document.getElementById("codeCopy");

//=> On Document load
document.addEventListener("DOMContentLoaded", () => {
    createGridTiles(); //=> Creates the outer grid tiles
    //=> Add event listeners for input changes
    inputs.forEach((input) => {
        input.addEventListener("change", handleInputsChange);
        input.addEventListener("change", createGridTiles);
    });
    //=> Add event listener for submitting the form (code generation)
    formElement.addEventListener("submit", (event) => {
        event.preventDefault()
    });
    reset.addEventListener("click", resetAll); //=> Add event listeners for resetting the form (inputs and grid items)
    submit.addEventListener("click", showCode); //=> Add event listener for submitting the form (code generation)
    codeSwitchBtn.addEventListener("click", switchCode);
    closeCodeBtn.addEventListener("click", closeSmokeScreen); //=> Add event listener for closing the code generation screen
    copyCodeBtn.addEventListener("click", copyCode);



    //=> Watching the panel holding the selected items list, then shows or hide the panel according to the presence of elements within it
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                referencePanel.style.display = referencePanel.childElementCount > 0 ? "block" : "none"
            }
        });
    });

    observer.observe(referencePanel, { childList: true });
})


/* 
    => resets the grids (The selectable tiles and the selected items)
*/
const resetGrids = () => {
    showcase.innerHTML = ""
    grid.innerHTML = ""
}

const resetAll = () => {
    resetGrids();
    /* 
        => resets the inputs values
    */
    inputs[0].value = 5
    inputs[1].value = 5
    inputs[2].value = 0
    inputs[3].value = 0
    //=> manually triggering the change event for the inputs (resetting the grids sizes)
    inputs.forEach((input) => {
        const event = new Event("change");
        input.dispatchEvent(event);
    });

    referencePanel.innerHTML = ""; //=> Empties the panel showing the list of selected items 
    div_Name_IdCounter = 1; // => Resets the counter used to name the selected items within the showcase grid
}