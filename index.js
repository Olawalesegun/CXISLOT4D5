document.addEventListener('DOMContentLoaded', () => {
    const incomeForm = document.getElementById('income-form');
    const expenseForm = document.getElementById('expense-form');
    const transactionsList = document.getElementById('transactions');
    const totalIncomeDisplay = document.getElementById('total-income');
    const totalExpensesDisplay = document.getElementById('total-expenses');
    const balanceDisplay = document.getElementById('balance');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    function saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    function updateSummary() {
        const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        totalIncomeDisplay.textContent = totalIncome;
        totalExpensesDisplay.textContent = totalExpenses;
        balanceDisplay.textContent = totalIncome - totalExpenses;
    }

    function addTransaction(transaction) {
        transactions.push(transaction);
        saveTransactions();
        renderTransactions();
        updateSummary();
    }

    function renderTransactions() {
        transactionsList.innerHTML = '';
        transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.textContent = `${transaction.date} - ${transaction.category}: $${transaction.amount} (${transaction.description})`;
            transactionsList.appendChild(li);
        });
    }

    incomeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('income-date').value;
        const amount = parseFloat(document.getElementById('income-amount').value);
        const category = document.getElementById('income-category').value;
        const description = document.getElementById('income-description').value;
        const transaction = { type: 'income', date, amount, category, description };
        addTransaction(transaction);
        incomeForm.reset();
    });

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('expense-date').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const category = document.getElementById('expense-category').value;
        const description = document.getElementById('expense-description').value;
        const transaction = { type: 'expense', date, amount, category, description };
        addTransaction(transaction);
        expenseForm.reset();
    });

    renderTransactions();
    updateSummary();
});
