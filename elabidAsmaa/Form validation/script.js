const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  // prevent the form from submitting
  e.preventDefault();

  // show the form values
  const formData = new FormData(form);
  if (form.checkValidity() && !checkCheckBox()) {
    const values = [...formData.entries()];
    values.forEach((element) => {
      console.log(`${element[0]}   ${element[1]}`);
    });
  }
});

function checkCheckBox() {
  if (document.querySelectorAll('input[type="checkbox"]:checked').length < 2) {
    alert("you should check at least two Areas of interest");
    return 1;
  }
  return 0;
}
