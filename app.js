// Select elements
const totalDisplay = document.querySelector("#total h1");
const numButtons = document.querySelectorAll(".n");
const oprButtons = document.querySelectorAll(".o");

let currentInput = "";
let previousInput = "";
let operator = "";

// Function to update display
function updateDisplay(value) {
    totalDisplay.textContent = value;
}

// Clear function
function clearCalculator() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay(0);
}

// Perform calculation
function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    if (isNaN(num1) || isNaN(num2)) return;

    switch (operator) {
        case "+":
            currentInput = (num1 + num2).toString();
            break;
        case "-":
            currentInput = (num1 - num2).toString();
            break;
        case "*":
            currentInput = (num1 * num2).toString();
            break;
        case "/":
            currentInput = num2 !== 0 ? (num1 / num2).toString() : "Error";
            break;
        case "%":
            currentInput = (num1 % num2).toString();
            break;
        default:
            return;
    }

    previousInput = "";
    operator = "";
    updateDisplay(currentInput);
}

// Handle number button clicks
numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentInput === "Error") currentInput = ""; // Reset on error
        currentInput += button.textContent;
        updateDisplay(currentInput);
    });
});

// Handle operator button clicks
oprButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const opr = button.textContent;

        if (opr === "c") {
            clearCalculator();
        } else if (opr === "=") {
            calculate();
        } else {
            if (currentInput) {
                if (previousInput) calculate();
                previousInput = currentInput;
                currentInput = "";
            }
            operator = opr;
        }
    });
});
