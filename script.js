  let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;
    let calculationString = '';

    const display = document.getElementById('display');
    const calculationDisplay = document.getElementById('calculation');

    function updateDisplay() {
      display.textContent = currentInput;
      calculationDisplay.textContent = calculationString;
    }

    function appendNumber(number) {
      if (currentInput === '0' || resetScreen) {
        currentInput = '';
        resetScreen = false;
      }
      currentInput += number;
      
      // Update calculation string
      if (operation === null) {
        calculationString = currentInput;
      } else {
        calculationString = previousInput + ' ' + operation + ' ' + currentInput;
      }
      
      updateDisplay();
    }

    function setOperator(op) {
      if (currentInput === '0' && calculationString === '') return;
      
      if (operation !== null && !resetScreen) {
        calculate();
      }
      
      previousInput = currentInput;
      operation = op;
      calculationString = previousInput + ' ' + operation;
      resetScreen = true;
      updateDisplay();
    }

    function calculate() {
      if (operation === null || resetScreen) return;
      
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);
      let result = 0;
      
      switch (operation) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          result = prev / current;
          break;
        default:
          return;
      }
      
      calculationString = previousInput + ' ' + operation + ' ' + currentInput + ' =';
      currentInput = result.toString();
      operation = null;
      updateDisplay();
    }

    function clearDisplay() {
      currentInput = '0';
      previousInput = '';
      operation = null;
      calculationString = '';
      updateDisplay();
    }

    // Fungsi dark mode
    document.addEventListener('DOMContentLoaded', function() {
      const themeToggle = document.getElementById('themeToggle');
      const body = document.body;
      
      // Cek preferensi tema dari localStorage
      const currentTheme = localStorage.getItem('theme') || 'light';
      body.setAttribute('data-theme', currentTheme);
      
      // Update tombol tema
      updateThemeToggle(currentTheme);
      
      // Toggle tema saat tombol diklik
      themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeToggle(newTheme);
      });
      
      function updateThemeToggle(theme) {
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
      }
    });