document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("taxCalculatorForm");
  const modal = document.getElementById("resultModal");
  const closeButton = document.querySelector(".close");
  const taxResultDisplay = document.getElementById("taxResult");
  const payableAmountDisplay = document.getElementById("payableAmount");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateForm()) {
      const income = parseFloat(document.getElementById("income").value);
      const extraIncome = parseFloat(document.getElementById("extraIncome").value);
      const deductions = parseFloat(document.getElementById("deductions").value);
      const age = document.getElementById("age").value;
      const tax = calculateTax(income, extraIncome, deductions, age);
      const payamount=income+extraIncome-deductions-tax;
      taxResultDisplay.textContent = 'Your calculated tax is: ₹'+tax.toFixed(2);
      payableAmountDisplay.textContent = 'Your overall income will be \n ₹'+payamount.toFixed(2);
      modal.style.display = "block";
    }
  });
  closeButton.addEventListener("click", function() {
    modal.style.display = "none";
  });
  window.addEventListener("click", function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  function validateForm() {
    let isValid = true;
    const incomeInput = document.getElementById("income");
    const extraIncomeInput = document.getElementById("extraIncome");
    const deductionsInput = document.getElementById("deductions");
    const ageInput = document.getElementById("age");
    const income = parseFloat(incomeInput.value);
    const extraIncome = parseFloat(extraIncomeInput.value);
    const deductions = parseFloat(deductionsInput.value);
    if(isNaN(income)) {
      incomeInput.value = "";
      incomeInput.setAttribute("title", "Invalid input");
      document.getElementById("incomeErrorIcon").style.display = "inline";
      isValid = false;
    } else {
      incomeInput.removeAttribute("title");
      document.getElementById("incomeErrorIcon").style.display = "none";
    }
    if (isNaN(extraIncome)) {
      extraIncomeInput.value = "";
      extraIncomeInput.setAttribute("title", "Invalid input");
      document.getElementById("extraIncomeErrorIcon").style.display = "inline";
      isValid = false;
    } else {
      extraIncomeInput.removeAttribute("title");
      document.getElementById("extraIncomeErrorIcon").style.display = "none";
    }
    if (isNaN(deductions)) {
      deductionsInput.value = "";
      deductionsInput.setAttribute("title", "Invalid input");
      document.getElementById("deductionsErrorIcon").style.display = "inline";
      isValid = false;
    } else {
      deductionsInput.removeAttribute("title");
      document.getElementById("deductionsErrorIcon").style.display = "none";
    }
    if (ageInput.value === "") {
      ageInput.setAttribute("title", "Please select an age group");
      document.getElementById("ageErrorIcon").style.display = "inline";
      isValid = false;
    } else {
      ageInput.removeAttribute("title");
      document.getElementById("ageErrorIcon").style.display = "none";
    }
    return isValid;
  }
  function calculateTax(income, extraIncome, deductions, age) {
    const totalIncome = income + extraIncome - deductions;
    const taxableAmount = Math.max(0, totalIncome - 800000);
    let taxRate = 0.3;
    if (age === "40to60") {
      taxRate = 0.4;
    } else if (age === "moreThan60") {
      taxRate = 0.1;
    }
    return taxableAmount * taxRate;
  }
});
