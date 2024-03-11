const grid: HTMLDivElement | null = document.querySelector(".gridBoard"); //?  The grid used to select items (click && drag)
const showcase: HTMLDivElement | null = document.querySelector(".gridShowcase"); //? The grid used to display selected items
const formElement: HTMLFormElement | null = document.getElementById(
  "form"
) as HTMLFormElement; //? The form holding the inputs
const inputs: NodeListOf<HTMLInputElement> | null =
  formElement?.querySelectorAll("input") || document.querySelectorAll("input"); //? The inputs (cols,rows,colgap,rowgap)
const submit: HTMLButtonElement | null = formElement?.querySelector(
  "button[type='submit']"
); //? code generation button
const reset: HTMLButtonElement | null = formElement?.querySelector(
  "button[type='reset']"
); //? board reset button
const referencePanel: HTMLElement | null =
  document.getElementById("referencePanel"); //? The panel showing the list of selected items
const smokeScreen: HTMLElement | null = document.querySelector(".smokeScreen");
const codeInnerPanel: HTMLDivElement | null =
  document.querySelector(".innerPanel");
const codeTextPanel: HTMLParagraphElement | null = document.getElementById(
  "code"
) as HTMLParagraphElement; //? The p tag holding the code
const codeSwitchBtn: HTMLButtonElement | null = document.getElementById(
  "codeSwitch"
) as HTMLButtonElement; //? The button switching html with css code
const closeCodeBtn: HTMLButtonElement | null = document.getElementById(
  "codeClose"
) as HTMLButtonElement;
const copyCodeBtn: HTMLButtonElement | null = document.getElementById(
  "codeCopy"
) as HTMLButtonElement;

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
    event.preventDefault();
  });
  reset?.addEventListener("click", resetAll); //=> Add event listeners for resetting the form (inputs and grid items)
  submit?.addEventListener("click", showCode); //=> Add event listener for submitting the form (code generation)
  codeSwitchBtn.addEventListener("click", switchCode);
  closeCodeBtn.addEventListener("click", closeSmokeScreen); //=> Add event listener for closing the code generation screen
  copyCodeBtn.addEventListener("click", copyCode);

  //=> Watching the panel holding the selected items list, then shows or hide the panel according to the presence of elements within it
  if (referencePanel) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          referencePanel.style.display =
            referencePanel.childElementCount > 0 ? "block" : "none";
        }
      });
    });

    observer.observe(referencePanel, { childList: true });
  }
});

/* 
    => resets the grids (The selectable tiles and the selected items)
*/
const resetGrids = () => {
  if(showcase)showcase.innerHTML = "";
  if(grid)grid.innerHTML = "";
};

const resetAll = () => {
  resetGrids();
  /* 
    => resets the inputs values
  */
  inputs[0].value = "5";
  inputs[1].value = "5";
  inputs[2].value = "0";
  inputs[3].value = "0";
  //=> manually triggering the change event for the inputs (resetting the grids sizes)
  inputs.forEach((input) => {
    const event = new Event("change");
    input.dispatchEvent(event);
  });
  if (referencePanel) referencePanel.innerHTML = ""; //=> Empties the panel showing the list of selected items
  div_Name_IdCounter = 1; // => Resets the counter used to name the selected items within the showcase grid
};
