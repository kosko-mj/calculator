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

// Operator Button Functionality
const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operatorValue = button.textContent;

        // Store the First Number and Operator
        firstNumber = display.textContent;
        currentOperator = operatorValue;

        // Next Number Should Start Fresh
        shouldResetDisplay = true;

        console.log('First number:', firstNumber);
        console.log('Operator:', currentOperator);
    });
});

// Equals Button Functionality
const equalsButton = document.querySelector('.equals');

equalsButton.addEventListener('click', () => {
    // Get Second Number from Display
    secondNumber = display.textContent;

    // Perform Calculation If We Have Both Numbers and an Operator
    if (firstNumber && currentOperator && secondNumber) {
        const result = operate(currentOperator, firstNumber, secondNumber);

        // Handle Division by Zero
        if (currentOperator === '%' && secondNumber === '0') {
            display.textContent = 'Error: Div by 0';
            firstNumber = '';
            currentOperator = null;
            shouldResetDisplay = true;
        } else {
            // Round Long Decimals
            const roundedResult = Math.round(result * 100) / 100;
            display.textContent = roundedResult;

            // Store Result as First Number for Chaining Operations
            firstNumber = roundedResult;
            currentOperator = null;
            shouldResetDisplay = true;
        }
    }

    console.log('First:', firstNumber, 'Second:', secondNumber, 'Op:', currentOperator);
});

// Clear Button Functionality
const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', () => {
    // Reset All State Variables
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    shouldResetDisplay = false;

    // Reset Display to 0
    display.textContent = '0';

    console.log('Calculator cleared');
});