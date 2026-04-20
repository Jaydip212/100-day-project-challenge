document.addEventListener("DOMContentLoaded", loadExpenses);

document.getElementById("add-expense").addEventListener("click", function () {
    const name = document.getElementById("expense-name").value;
    const amount = document.getElementById("expense-amount").value;
    
    if (name === "" || amount === "") {
        alert("Please enter expense details!");
        return;
    }

    const expense = { name, amount };
    addExpenseToList(expense);
    saveExpense(expense);
    updateBalance();
    
    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
});

function addExpenseToList(expense) {
    const li = document.createElement("li");
    li.innerHTML = `${expense.name} - ₹${expense.amount} 
        <button class="delete-btn">X</button>`;
    document.getElementById("expense-list").appendChild(li);

    li.querySelector(".delete-btn").addEventListener("click", function () {
        li.remove();
        removeExpense(expense);
        updateBalance();
    });
}

function saveExpense(expense) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.forEach(expense => addExpenseToList(expense));
    updateBalance();
}

function removeExpense(expense) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses = expenses.filter(e => e.name !== expense.name || e.amount !== expense.amount);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateBalance() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const total = expenses.reduce((sum, expense) => sum + parseInt(expense.amount), 0);
    document.getElementById("balance").innerText = total;
}