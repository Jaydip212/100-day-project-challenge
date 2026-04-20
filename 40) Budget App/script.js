let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
    const transactionList = document.getElementById("transaction-list");
    const balanceEl = document.getElementById("balance");

    transactionList.innerHTML = "";
    let balance = 0;

    transactions.forEach((trans, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${trans.desc} <span>₹${trans.amount}</span> 
            <button onclick="deleteTransaction(${index})">❌</button>`;
        li.classList.add(trans.amount > 0 ? "income" : "expense");
        transactionList.appendChild(li);
        balance += trans.amount;
    });

    balanceEl.textContent = `₹${balance.toFixed(2)}`;
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
    const desc = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (desc.trim() === "" || isNaN(amount)) {
        alert("Enter valid description and amount");
        return;
    }

    transactions.push({ desc, amount });
    updateUI();
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

updateUI();