// script.js — simple calculator logic
const display = document.getElementById('display');
let current = '';

function updateDisplay() { display.value = current }

function inputValue(v) { current += v; updateDisplay() }

function clearAll() { current = ''; updateDisplay() }

function calculate() {
  try {
    // Evaluate safely: allow only digits, operators, dot
    if (!/^[0-9+\-*/. ]+$/.test(current)) { display.value = 'Error'; return }
    const result = Function('return ' + current)();
    current = String(result);
    updateDisplay();
  } catch (e) { display.value = 'Error' }
}

// Event listeners
document.querySelectorAll('[data-value]').forEach(btn => btn.addEventListener('click', () => inputValue(btn.dataset.value)));
document.querySelectorAll('[data-op]').forEach(btn => btn.addEventListener('click', () => inputValue(btn.dataset.op)));
document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearAll);
