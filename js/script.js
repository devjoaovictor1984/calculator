const display = document.getElementById('display');
const operationDisplay = document.getElementById('operation');
const buttons = document.querySelectorAll('button');

let input = '';
let lastValue = '';
let operator = '';
let resultShown = false;

function updateDisplay() {
  display.textContent = input || '0';
}

function updateOperation() {
  operationDisplay.textContent = `${lastValue} ${operator}`;
}

function clearAll() {
  input = '';
  lastValue = '';
  operator = '';
  resultShown = false;
  updateDisplay();
  operationDisplay.textContent = '';
}

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? 'Erro: divisão por zero' : a / b;
    default: return b;
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const val = button.textContent;

    if (button.classList.contains('clear')) {
      clearAll();
    } else if (button.classList.contains('back')) {
      input = input.slice(0, -1);
      updateDisplay();
    } else if (button.classList.contains('operator')) {
      if (input === '' && lastValue !== '') {
        operator = val;
        updateOperation();
        return;
      }

      if (input !== '') {
        if (lastValue !== '') {
          const result = calculate(lastValue, input, operator);
          lastValue = result.toString();
          updateDisplay(result);
        } else {
          lastValue = input;
        }
        operator = val;
        input = '';
        resultShown = false;
        updateOperation();
      }
    } else if (button.classList.contains('equal')) {
      if (input !== '' && lastValue !== '' && operator !== '') {
        const result = calculate(lastValue, input, operator);
        display.textContent = result;
        operationDisplay.textContent = `${lastValue} ${operator} ${input} =`;
        input = result.toString();
        lastValue = '';
        operator = '';
        resultShown = true;
      }
    } else {
      if (resultShown) {
        input = '';
        resultShown = false;
      }

      if (val === '.' && input.includes('.')) return;

      input += val;
      updateDisplay();
    }
  });
});
