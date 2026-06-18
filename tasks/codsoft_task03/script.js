// Basic calculator logic using event listeners, if/else, operators, and simple loops
(() => {
  const displayEl = document.getElementById('display');
  const buttons = document.querySelectorAll('.btn');

  let current = '0';       // current input shown on display
  let previous = null;     // previous value saved for operation
  let operator = null;     // current operator: '+', '-', '*', '/'

  function updateDisplay() {
    displayEl.textContent = current;
  }

  function clearAll() {
    current = '0';
    previous = null;
    operator = null;
    updateDisplay();
  }

  function deleteLast() {
    if (current.length === 1) {
      current = '0';
    } else {
      current = current.slice(0, -1);
    }
    updateDisplay();
  }

  function appendNumber(num) {
    if (current === '0' && num !== '.') {
      current = num;
    } else if (num === '.' && current.includes('.')) {
      // ignore second decimal
      return;
    } else {
      current += num;
    }
    updateDisplay();
  }

  function chooseOperator(opSymbol) {
    // map visible symbols to JS operators
    const map = { '÷': '/', '×': '*', '+': '+', '-': '-' };
    const op = map[opSymbol] || opSymbol;

    if (operator && previous !== null) {
      // Compute a running result if user chains operators
      compute();
    }
    previous = parseFloat(current);
    operator = op;
    current = '0';
  }

  function compute() {
    if (operator == null || previous == null) return;
    const a = previous;
    const b = parseFloat(current);
    let result = 0;

    if (Number.isNaN(a) || Number.isNaN(b)) return clearAll();

    if (operator === '+') result = a + b;
    else if (operator === '-') result = a - b;
    else if (operator === '*') result = a * b;
    else if (operator === '/') {
      if (b === 0) {
        result = 'Error';
      } else {
        result = a / b;
      }
    }

    // Trim long decimals
    if (typeof result === 'number') {
      // limit to 12 significant digits to avoid floating point noise
      result = parseFloat(result.toPrecision(12));
      // Remove trailing .0 when integer
      if (Number.isInteger(result)) result = result.toString();
      else result = result.toString();
    } else {
      result = result.toString();
    }

    current = result;
    previous = null;
    operator = null;
    updateDisplay();
  }

  // Attach listeners
  buttons.forEach(btn => {
    const action = btn.dataset.action;
    const text = btn.textContent.trim();

    if (!action) {
      // number or decimal
      btn.addEventListener('click', () => appendNumber(text));
    } else {
      // function/action buttons
      if (action === 'clear') {
        btn.addEventListener('click', () => clearAll());
      } else if (action === 'delete') {
        btn.addEventListener('click', () => deleteLast());
      } else if (action === 'operator') {
        btn.addEventListener('click', () => chooseOperator(text));
      } else if (action === 'equals') {
        btn.addEventListener('click', () => compute());
      }
    }
  });

  // Optional: support keyboard input
  window.addEventListener('keydown', (e) => {
    const key = e.key;
    if ((/^\d$/).test(key)) appendNumber(key);
    else if (key === '.') appendNumber('.');
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
      // support keyboard operators
      chooseOperator(key);
    } else if (key === 'Enter' || key === '=') {
      e.preventDefault();
      compute();
    } else if (key === 'Backspace') {
      deleteLast();
    } else if (key.toLowerCase() === 'c') {
      clearAll();
    }
  });

  // initialize
  updateDisplay();
})();