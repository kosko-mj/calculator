// Basic Math Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b; 
}

function divide(a, b) {
    return a / b;
}

// Operate Function
function operate(operator, num1, num2) {
    //Convert Strings to Numbers
    num1 = Number(num1);
    num2 = Number(num2);

    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === 'x') {
        return multiply(num1, num2);
    } else if (operator === '%') {
        return divide(num1, num2);
    } else {
        return "Error";
    }
}

// Calculator State Variables
let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

// Get the Display Element
const display = document.getElementById('display');

// Function to Update Display
function updateDisplay(value) {
    display.textContent = value;
}

// Number Button Functionality
const numberButtons = document.querySelectorAll('.number');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const numberValue = button.textContent;

        if (shouldResetDisplay) {
            display.textContent = numberValue;
            shouldResetDisplay = false;
        } else {
            // Dont Let Display Get Too Long
            if (display.textContent.length <12) {
                display.textContent = display.textContent === '0'
                ? numberValue
                : display.textContent + numberValue;
            }
        }
    });
});