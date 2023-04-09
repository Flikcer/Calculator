//store arr of inputted nums, this will be useful to display the equation on screen
let numbers = [];

//operand 1 will hold the val of the math done on the first nums dynamically if more than 2 entered
let operand1 = null;
let operand2 = null;
//mfunciton being handlewd
let operator = null;

// Get references to the calculator screen and buttons
const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");

//queryselectorAll gives you an arr of all buttons, for each of these listen for a click then perform
//these will enclose all operations and functions
buttons.forEach((button) => {
  //listen for click
  button.addEventListener("click", () => {
    //grab the val we gave the buttons in html and store
    const value = button.value;
    //for 100 most translate the button a small amount on the y axis to simulate button clicks
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 100);

    //this if statement will che check if value is a number, if not an operand must have been pressed so push to the screen
    if (!isNaN(value)) {
      //add entered val to global numbers arr
      numbers.push(value);
      //add it to the screen element
      screen.textContent += value;
      //else if the value is a function symbol using regex and includes to find
    } else if (["+", "-", "*", "/"].includes(value)) {
      //take all the elements in the numbers array and joining them together into a single string, which is then stored in the operand1 variable
      operand1 = numbers.join("");
      numbers = [];
      operator = value;
      //update screen val text
      screen.textContent += value;

      //if equals is clicked, math must then be performed on the equation
    } else if (value === "=") {
      operand2 = numbers.join("");
      //this must be done since the numbers array will store double digit numbers in spearate indexes
      numbers = [];
      let result;
      //if identify operator parse the joined string and do that proper calculation and set it to result
      //if / used in conjunction with operand 2 === 0, print undefined, if not perform the /
      if (operator === "+") {
        result = parseInt(operand1) + parseInt(operand2);
      } else if (operator === "-") {
        result = parseInt(operand1) - parseInt(operand2);
      } else if (operator === "*") {
        result = parseInt(operand1) * parseInt(operand2);
      } else if (operator === "/") {
        if (operand2 === "0") {
          screen.textContent = "Undefined";
          return;
        }
        result = parseInt(operand1) / parseInt(operand2);
      }
      screen.textContent = result;
    } else if (value === "clear") {
      //clear the screen and reset the variables if C is clicked
      screen.textContent = "";
      numbers = [];
      operand1 = null;
      operand2 = null;
      operator = null;
    }
  });
});
