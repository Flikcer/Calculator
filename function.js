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
    } else if (["+", "-"].includes(value)) {
      performMultiplicationAndDivision();
      operand1 =
        operand1 === null
          ? numbers.join("")
          : eval(operand1 + operator + numbers.join(""));
      numbers = [];
      operator = value;
      screen.textContent += value;
    } else if (["*", "/"].includes(value)) {
      numbers.push(value);
      screen.textContent += value;
    } else if (value === "=") {
      performMultiplicationAndDivision();
      operand2 = numbers.join("");
      numbers = [];
      let result;
      if (operator === "+") {
        result = parseInt(operand1) + parseInt(operand2);
      } else if (operator === "-") {
        result = parseInt(operand1) - parseInt(operand2);
      }
      operand1 = result.toString();
      operand2 = null;
      operator = null;
      screen.textContent = result.toString();
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
    let left = numbers.slice(0, index).join("");
    let right = numbers.slice(index + 1).join("");
    let result;
    if (numbers[index] === "*") {
      result = parseInt(left) * parseInt(right);
    } else if (numbers[index] === "/") {
      if (right === "0") {
        screen.textContent = "Undefined";
        return;
      }
      result = parseInt(left) / parseInt(right);
    }
    numbers.splice(
      index - left.length,
      right.length + left.length + 1,
      result.toString()
    );
    if (operand1 === null) {
      operand1 = result.toString();
    } else {
      operand1 = eval(operand1 + operator + result.toString());
    }
    operator = null;
  }
  screen.textContent = operand1 !== null ? operand1 : numbers.join("");
}
