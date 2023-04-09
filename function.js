// Initialize an empty array to store the input numbers
let numbers = [];

// Initialize variables to store the operands and operator
let operand1 = null;
let operand2 = null;
let operator = null;

// Get references to the calculator screen and buttons
const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");

// Add event listeners to the buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the value of the button
    const value = button.value;

    // Check if the button is a number button
    if (!isNaN(value)) {
      // Add the number to the array
      numbers.push(value);
      // Update the screen with the new number
      screen.textContent += value;
    }

    // Check if the button is an operator button
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      // Concatenate all the numbers in the array to form a single string
      const numberString = numbers.join("");
      // Convert the string to a number and store it as the operand
      const operand = Number(numberString);

      // If there is no current operand1, store the current operand as operand1
      if (operand1 === null) {
        operand1 = operand;
      } else {
        // If there is a current operand1, perform the operation and store the result as operand1
        switch (operator) {
          case "+":
            operand1 = operand1 + operand;
            break;
          case "-":
            operand1 = operand1 - operand;
            break;
          case "*":
            operand1 = operand1 * operand;
            break;
          case "/":
            operand1 = operand1 / operand;
            break;
        }
      }

      // Clear the array
      numbers = [];
      // Store the operator
      operator = value;

      // Update the screen with the equation
      screen.textContent += value;
    }

    // Check if the button is the equal button
    if (value === "equal") {
      // Concatenate all the numbers in the array to form a single string
      const numberString = numbers.join("");
      // Convert the string to a number and store it as the second operand
      const operand2 = Number(numberString);

      // Perform the calculation based on the operator and current operand1 and operand2
      let result;
      switch (operator) {
        case "+":
          result = operand1 + operand2;
          break;
        case "-":
          result = operand1 - operand2;
          break;
        case "*":
          result = operand1 * operand2;
          break;
        case "/":
          result = operand1 / operand2;
          break;
      }

      // Update the screen with the result
      screen.textContent = result.toString();

      // Clear the array and reset the operands and operator
      numbers = [];
      operand1 = null;
      operand2 = null;
      operator = null;
    }

    // Check if the button is the clear button
    if (value === "clear") {
      // Reset all the variables and update the screen
      numbers = [];
      operand1 = null;
      operand2 = null;
      operator = null;
      screen.textContent = "";
    }
  });
});
