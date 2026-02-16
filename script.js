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
    num1 = Number(num1);
    num2 = Number(num2);

    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '−') {
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
let lastEquation = '';

// Get DOM Elements
const equationDisplay = document.getElementById('equation-display');
const expressionDisplay = document.getElementById('expression');

// Get all button elements
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.getElementById('clear-btn');
const decimalButton = document.querySelector('.decimal');
const signButton = document.querySelector('.sign');

// Number Button Functionality
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const numberValue = button.textContent;

        if (shouldResetDisplay) {
            equationDisplay.textContent = numberValue;
            shouldResetDisplay = false;
        } else {
            if (equationDisplay.textContent === '0') {
                equationDisplay.textContent = numberValue;
            } else {
                equationDisplay.textContent = equationDisplay.textContent + numberValue;
            }
        }
        
        // Scroll to keep the right side visible
        equationDisplay.scrollLeft = equationDisplay.scrollWidth;
    });
});

// Operator Button Functionality
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operatorValue = button.textContent;

        firstNumber = equationDisplay.textContent;
        equationDisplay.textContent = equationDisplay.textContent + ' ' + operatorValue + ' ';
        
        currentOperator = operatorValue;
        shouldResetDisplay = false;
        
        // Scroll to keep the right side visible
        equationDisplay.scrollLeft = equationDisplay.scrollWidth;
    });
});

// Equals Button Functionality
equalsButton.addEventListener('click', () => {
    if (!firstNumber || !currentOperator) {
        return;
    }
    
    const equation = equationDisplay.textContent;
    const tokens = equation.split(' ');
    let result = parseFloat(tokens[0]);
    
    for (let i = 1; i < tokens.length; i += 2) {
        const op = tokens[i];
        const nextNum = parseFloat(tokens[i + 1]);
        
        if (op === '+') result = add(result, nextNum);
        else if (op === '−') result = subtract(result, nextNum);
        else if (op === '×') result = multiply(result, nextNum);
        else if (op === '÷') {
            if (nextNum === 0) {
                equationDisplay.textContent = 'Error: Div by 0';
                expressionDisplay.textContent = '';
                firstNumber = '';
                currentOperator = null;
                shouldResetDisplay = true;
                clearButton.textContent = 'AC';
                return;
            }
            result = divide(result, nextNum);
        }
    }
    
    const roundedResult = Math.round(result * 100) / 100;
    
    expressionDisplay.textContent = equation;
    equationDisplay.textContent = roundedResult;
    
    firstNumber = roundedResult;
    currentOperator = null;
    shouldResetDisplay = true;
    
    equationDisplay.scrollLeft = 0;
});

// AC/Backspace Button Functionality
clearButton.addEventListener('click', () => {
    const currentDisplay = equationDisplay.textContent;
    
    if (currentDisplay === '0' || currentDisplay.includes('Error')) {
        firstNumber = '';
        secondNumber = '';
        currentOperator = null;
        shouldResetDisplay = false;
        equationDisplay.textContent = '0';
        expressionDisplay.textContent = '';
        clearButton.textContent = 'AC';
    } else {
        if (currentDisplay.length > 1) {
            equationDisplay.textContent = currentDisplay.slice(0, -1);
            equationDisplay.scrollLeft = equationDisplay.scrollWidth;
        } else {
            equationDisplay.textContent = '0';
            clearButton.textContent = 'AC';
        }
    }
});

// Decimal Button Functionality
decimalButton.addEventListener('click', () => {
    if (!equationDisplay.textContent.includes('.')) {
        if (shouldResetDisplay) {
            equationDisplay.textContent = '0.';
            shouldResetDisplay = false;
        } else {
            equationDisplay.textContent = equationDisplay.textContent + '.';
        }
    }
    
    equationDisplay.scrollLeft = equationDisplay.scrollWidth;
    
    if (equationDisplay.textContent !== '0' && !equationDisplay.textContent.includes('Error')) {
        clearButton.textContent = '⌫';
    }
});

// +/- Button Functionality
signButton.addEventListener('click', () => {
    const currentValue = parseFloat(equationDisplay.textContent);
    
    if (!isNaN(currentValue)) {
        equationDisplay.textContent = currentValue * -1;
        
        if (currentOperator) {
            secondNumber = equationDisplay.textContent;
        } else {
            firstNumber = equationDisplay.textContent;
        }
        
        equationDisplay.scrollLeft = equationDisplay.scrollWidth;
    }
});

// Update clear button text when numbers are entered
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (equationDisplay.textContent !== '0' && !equationDisplay.textContent.includes('Error')) {
            clearButton.textContent = '⌫';
        }
    });
});

// Keyboard Support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        const numberButton = Array.from(document.querySelectorAll('.number'))
            .find(btn => btn.textContent === key);
        if (numberButton) numberButton.click();
    }
    
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
    
    if (key === '.') {
        document.querySelector('.decimal')?.click();
    }
    
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        document.querySelector('.equals')?.click();
    }
    
    if (key === 'Backspace') {
        event.preventDefault();
        document.getElementById('clear-btn')?.click();
    }
    
    if (key === 'Escape') {
        firstNumber = '';
        secondNumber = '';
        currentOperator = null;
        shouldResetDisplay = false;
        equationDisplay.textContent = '0';
        expressionDisplay.textContent = '';
        clearButton.textContent = 'AC';
    }
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
let darkMode = false;

themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    
    if (darkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀';  // Sun to switch back to light
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '☾';  // Moon to switch to dark
    }
});