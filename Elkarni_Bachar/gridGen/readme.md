# Css Grid Generator
### The principle
I had the idea of making 2 stacked grids; the lower grid (showcase grid) is the one where the selected divs were colored. The upper grid (main grid) is the frame used to select the divs by either clicking or clicking then dragging over the range of divs to select.
Anyways the UI is composed of several parts:
+ The `main` and `showcase` grids
+ The inputs:
    - The `columns` input: specifies the number of columns in the grid
    - The `rows` input: specifies the number of rows in the grid
    - The `column gaps` input: specifies the size of gaps between the grid columns
    - The `row gaps` input: specifies the size of gaps between the grid rows
+ The `refreference Panel`: It registers and indexes the selected divs within the `showcase grid` and gives the option to remove them.
+ The `Generate code` button: It shows the panel which holds the CSS code at first. It has a button that switches between the html and css codes, another button to copy the currently showed code, and another last button to close the panel. 
+ The `Reset Board` button : It empties the showcase grid, and resets both grids to the default size. It also returns the inputs into their default values, then erases the entries of the reference panel and hides it. 
---
### The challenges faced
I faced 2 challenges during the coding of this project:
+ The first one was the formula needed to calculate the tiles to include in a div, whenever the user selects multiple ones at the same time. let's say our grid is 5X5, and the grid tiles are labeled starting from the first one at the left with the number one, the last tile should be 25. A user started dragging from the tile 1 directly to the tile 7 while skipping the tiles [2-6]. The resulted div should take only the tiles 1,2,6 and 7 forming a cube. The formula needed to calculate that gave me a bit of trouble.
+ The second challenge which is still being a bug till now is when the columns and rows numbers are not synced (e.g. 5 columns and just 3 rows), the showcase grid gets messed up. I invite you to try it, it would be faster than explaining it. I am sure the problem is because of the same calculation formula i mentionned earlier.
---
### What I learned
In what concerns my learnings from this challenge, As every other junior front-end dev, I ignored native javascript and learned frameworks directly after aquiring the base knowledge. I didn't get any problems while using native js though, but writing native code allowed me to percieve how much trouble frameworks save us from. I knew it but I really understand it better now, especially in what concerns states within the app.

---
Anyways that was a good challenge to tackle, and thank you for the time you took to read this.