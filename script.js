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
    } else if (operator === '−') {  // Changed from '-' to '−'
        return subtract(num1, num2);
    } else if (operator === '×') {
        return multiply(num1, num2);
    } else if (operator === '÷') {
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

        // If we already have a first number and operator, calculate first
        if (firstNumber && currentOperator && !shouldResetDisplay) {
            // Perform the pending operation
            secondNumber = display.textContent;
            const result = operate(currentOperator, firstNumber, secondNumber);
            
            if (currentOperator === '÷' && secondNumber === '0') {
                display.textContent = 'Error: Div by 0';
                firstNumber = '';
                currentOperator = null;
                shouldResetDisplay = true;
                clearButton.textContent = 'AC';
                return;
            } else {
                const roundedResult = Math.round(result * 100) / 100;
                display.textContent = roundedResult;
                firstNumber = roundedResult;
            }
        } else {
            // Store the First Number
            firstNumber = display.textContent;
        }

        // Store the Operator
        currentOperator = operatorValue;
        shouldResetDisplay = true;

        console.log('First number:', firstNumber);
        console.log('Operator:', currentOperator);
    });
});

// Equals Button Functionality
const equalsButton = document.querySelector('.equals');

equalsButton.addEventListener('click', () => {
    // If we don't have both numbers and an operator, do nothing
    if (!firstNumber || !currentOperator || shouldResetDisplay) {
        return;
    }
    
    secondNumber = display.textContent;
    
    const result = operate(currentOperator, firstNumber, secondNumber);

    // Handle Division by Zero
    if (currentOperator === '÷' && secondNumber === '0') {
        display.textContent = 'Error: Div by 0';
        firstNumber = '';
        currentOperator = null;
        shouldResetDisplay = true;
        clearButton.textContent = 'AC';
    } else {
        // Round Long Decimals
        const roundedResult = Math.round(result * 100) / 100;
        display.textContent = roundedResult;

        // Store result as first number for chaining
        firstNumber = roundedResult;
        currentOperator = null;
        shouldResetDisplay = true;
    }
    
    console.log('First:', firstNumber, 'Second:', secondNumber, 'Op:', currentOperator);
});

// AC/Backspace Button Functionality
const clearButton = document.getElementById('clear-btn');

clearButton.addEventListener('click', () => {
    const currentDisplay = display.textContent;
    
    // If display is "0" or shows an error message, clear everything (AC behavior)
    if (currentDisplay === '0' || currentDisplay.includes('Error')) {
        firstNumber = '';
        secondNumber = '';
        currentOperator = null;
        shouldResetDisplay = false;
        display.textContent = '0';
        clearButton.textContent = 'AC';
    } 
    // Otherwise delete last character (backspace behavior)
    else {
        if (currentDisplay.length > 1) {
            display.textContent = currentDisplay.slice(0, -1);
        } else {
            display.textContent = '0';
            clearButton.textContent = 'AC';
        }
    }
});

// Decimal Button Functionality
const decimalButton = document.querySelector('.decimal');

decimalButton.addEventListener('click', () => {
    // Dont Add Decimal if Display Already Has One
    if (!display.textContent.includes('.')) {
        if (shouldResetDisplay) {
            display.textContent = '0.';
            shouldResetDisplay = false;
        } else {
            display.textContent = display.textContent + '.';
        }
    }
    
    // Update clear button text
    if (display.textContent !== '0' && !display.textContent.includes('Error')) {
        clearButton.textContent = '⌫';
    }
});

// Update clear button text when numbers are entered
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent !== '0' && !display.textContent.includes('Error')) {
            clearButton.textContent = '⌫';
        }
    });
});

// +/- Button Functionality
const signButton = document.querySelector('.sign');

signButton.addEventListener('click', () => {
    const currentValue = parseFloat(display.textContent);

    if (!isNaN(currentValue)) {
        // Toggle Positive and Negative
        display.textContent = currentValue * -1;

        // If This is the First Number Entered, Update firstNumber
        if (firstNumber && !currentOperator) {
            firstNumber = display.textContent;
        }
    }
});

// Keyboard Support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    console.log('Key pressed:', key);
    
    // Numbers 0-9
    if (key >= '0' && key <= '9') {
        const numberButton = Array.from(document.querySelectorAll('.number'))
            .find(btn => btn.textContent === key);
        if (numberButton) numberButton.click();
    }
    
    // Operators
    if (key === '+') {
        const plusButton = Array.from(document.querySelectorAll('.operator'))
            .find(btn => btn.textContent === '+');
        if (plusButton) plusButton.click();
    }
    if (key === '-') {
        const minusButton = Array.from(document.querySelectorAll('.operator'))
            .find(btn => btn.textContent === '−');
        if (minusButton) minusButton.click();
    }
    if (key === '*') {
        const multiplyButton = Array.from(document.querySelectorAll('.operator'))
            .find(btn => btn.textContent === '×');
        if (multiplyButton) multiplyButton.click();
    }
    if (key === '/') {
        const divideButton = Array.from(document.querySelectorAll('.operator'))
            .find(btn => btn.textContent === '÷');
        if (divideButton) divideButton.click();
    }
    
    // Decimal
    if (key === '.') {
        document.querySelector('.decimal')?.click();
    }
    
    // Enter or = for equals
    if (key === 'Enter' || key === '=') {
        document.querySelector('.equals')?.click();
    }
    
    // Backspace
    if (key === 'Backspace') {
        event.preventDefault(); // Prevent page back
        document.getElementById('clear-btn')?.click();
    }
    
    // Escape for AC
    if (key === 'Escape') {
        // Force AC behavior
        firstNumber = '';
        secondNumber = '';
        currentOperator = null;
        shouldResetDisplay = false;
        display.textContent = '0';
        clearButton.textContent = 'AC';
    }
});