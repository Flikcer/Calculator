let numbers = [];
let operand1 = null;
let operand2 = null;
let operator = null;

const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 100);

    if (!isNaN(value)) {
      numbers.push(value);
      screen.textContent += value;
    } else if (["+", "-", "*", "/"].includes(value)) {
      performMultiplicationAndDivision();
      if (operand1 === null) {
        operand1 = parseFloat(numbers.join("."));
      } else {
        operand2 = parseFloat(numbers.join("."));
        operand1 = performOperation(operand1, operator, operand2);
        operand2 = null;
      }
      numbers = [];
      operator = value;
      screen.textContent += value;
    } else if (value === "=") {
      performMultiplicationAndDivision();
      if (operand1 !== null && operator !== null) {
        operand2 = parseFloat(numbers.join("."));
        operand1 = performOperation(operand1, operator, operand2);
        operand2 = null;
        operator = null;
        screen.textContent = operand1.toString();
      }
    } else if (value === "clear") {
      screen.textContent = "";
      numbers = [];
      operand1 = null;
      operand2 = null;
      operator = null;
    }
  });
});

function performMultiplicationAndDivision() {
  let index = -1;
  let i = 0;
  while (i < numbers.length) {
    if (["*", "/"].includes(numbers[i])) {
      index = i;
      break;
    }
    i++;
  }
  if (index !== -1) {
    let left = parseFloat(numbers.slice(0, index).join("."));
    let right = parseFloat(numbers.slice(index + 1).join("."));
    let result;
    if (numbers[index] === "*") {
      result = left * right;
    } else if (numbers[index] === "/") {
      if (right === 0) {
        screen.textContent = "Undefined";
        return;
      }
      result = left / right;
    }
    numbers.splice(
      index - left.toString().length,
      right.toString().length + left.toString().length + 1,
      result.toString()
    );
  }
}

function performOperation(operand1, operator, operand2) {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      if (operand2 === 0) {
        screen.textContent = "Undefined";
        return operand1;
      }
      return operand1 / operand2;
    default:
      return operand1;
  }
}
