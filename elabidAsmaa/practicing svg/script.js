function changeMode() {
  const modeButton = document.querySelector("button");

  const dayShapes = document.querySelectorAll('[style*="display: none"]');
  const nightShapes = document.querySelectorAll('[style*="display: inline"]');

  dayShapes.forEach((shape) => {
    shape.style.display = shape.style.display === "none" ? "inline" : "none";
  });
  nightShapes.forEach((shape) => {
    shape.style.display = shape.style.display === "inline" ? "none" : "inline";
  });

  modeButton.textContent = modeButton.textContent === "DAY" ? "NIGHT" : "DAY";
}
