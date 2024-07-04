const currentInputDisplay = document.getElementById('currentInput');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let operator = null;
let previousInput = '';
let calculationProcess = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            clear();
        } else if (value === '=') {
            calculate();
        } else if (value === '←') {
            backspace();
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

function clear() {
    currentInput = '0';
    operator = null;
    previousInput = '';
    calculationProcess = '';
    currentInputDisplay.innerText = '0';
}

function calculate() {
    if (operator === null || currentInput === '' || previousInput === '') {
        return;
    }

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    if (operator === '+') {
        result = prev + current;
    } else if (operator === '-') {
        result = prev - current;
    } else if (operator === '*') {
        result = prev * current;
    } else if (operator === '/') {
        result = prev / current;
    } else if (operator === '%') {
        result = prev % current;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    currentInputDisplay.innerText = currentInput;
}

function setOperator(op) {
    if (currentInput === '') {
        return;
    }

    if (previousInput !== '') {
        calculate();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    currentInputDisplay.innerText = previousInput + ' ' + operator;
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) {
        return;
    }

    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    currentInputDisplay.innerText = currentInput;
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    currentInputDisplay.innerText = currentInput;
}
