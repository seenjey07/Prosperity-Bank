import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import GenerateTransactionId from "./GenerateTransactionId";

const Dashboard = ({
  user,
  expensesHistory,
  setExpensesHistory,
  updateAccountBalance,
}) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showAddExpenseButton, setShowAddExpenseButton] = useState(true);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseItem, setExpenseItem] = useState("");
  const [expensePrice, setExpensePrice] = useState("");
  const [editIndex, setEditIndex] = useState(-1); //indicates no edit

  useEffect(() => {
    setError("");
  }, [expenseItem, expensePrice]);

  const handleManageAccountButton = (e) => {
    navigate("/manage-account");
  };

  const handleDepositButton = (e) => {
    navigate("/deposit");
  };

  const handleSendMoneyButton = (e) => {
    navigate("/send-money");
  };

  const handleWithdrawButton = (e) => {
    navigate("/withdraw");
  };

  const handleTransactionsButton = (e) => {
    navigate("/transactions-history");
  };

  const handleAddExpenseButton = () => {
    setShowAddExpenseButton(false);
    setShowExpenseForm(true);
  };

  const handleCancelExpenseSubmit = () => {
    setShowAddExpenseButton(true);
    setShowExpenseForm(false);
    setExpenseItem("");
    setExpensePrice("");
    setEditIndex(-1);
  };

  const handleEditExpense = (index) => {
    setExpenseItem(expensesHistory[index].item);
    setExpensePrice(expensesHistory[index].price);
    setEditIndex(index);
    setShowAddExpenseButton(false);
    setShowExpenseForm(true);
  };

  const handleDeleteExpense = (index) => {
    const deletedExpense = expensesHistory[index];
    const newExpenses = [...expensesHistory];
    newExpenses.splice(index, 1);

    const newBalance =
      parseFloat(user?.accountBalance) + parseFloat(deletedExpense.price);
    updateAccountBalance(newBalance);

    setExpensesHistory(newExpenses);
  };

  const handleAddExpenseSubmit = () => {
    if (!expenseItem || !expensePrice) {
      setError("Please enter a valid expense item.");
    } else {
      setError("");
    }

    let newBalance = user?.accountBalance;
    const generatedTransactionId = GenerateTransactionId();

    if (expenseItem && expensePrice !== "") {
      if (editIndex !== -1) {
        const oldPrice = expensesHistory[editIndex].price;
        const newPrice = parseFloat(expensePrice);
        newBalance += oldPrice - newPrice;

        const updatedExpenses = [...expensesHistory];
        updatedExpenses[editIndex] = {
          item: expenseItem,
          price: newPrice,

          Transaction: "Expense",
          "Transaction ID": generatedTransactionId,
          Expense: expenseItem,
          Amount: "₱ " + newPrice,
          Date: new Date().toLocaleDateString(),
        };
        setExpensesHistory(updatedExpenses);
      } else {
        const newExpense = {
          item: expenseItem,
          price: parseFloat(expensePrice),

          Transaction: "Expense",
          "Transaction ID": generatedTransactionId,
          Expense: expenseItem,
          Amount: "₱ " + parseFloat(expensePrice),
          Date: new Date().toLocaleDateString(),
        };
        newBalance -= parseFloat(expensePrice);

        const updatedExpenses = [...expensesHistory, newExpense];
        setExpensesHistory(updatedExpenses);

        localStorage.setItem(
          "expensesHistory",
          JSON.stringify(updatedExpenses)
        );
      }

      updateAccountBalance(newBalance);

      setExpenseItem("");
      setExpensePrice("");
      setEditIndex(-1);
      setShowAddExpenseButton(true);
      setShowExpenseForm(false);
    }
  };

  return (
    <>
      <div>
        <h3 className="welcome">Welcome, {user?.username}!</h3>
        <button
          className="manageAccountButton"
          type="button"
          onClick={handleManageAccountButton}
        >
          Manage Account
        </button>
        <section className="accountActionsSection">
          <p className="accountBalanceText">Account Balance:</p>
          <h4 className="accountBalance">₱ {user?.accountBalance}</h4>
          <p className="accountNumberText">Account Number:</p>
          <p className="accountNumber">{user?.accountNumber}</p>
          <p className="cardType">{user?.cardType}</p>

          <button
            className="deposit"
            type="button"
            onClick={handleDepositButton}
          >
            Deposit
          </button>
          <button
            className="sendMoney"
            type="button"
            onClick={handleSendMoneyButton}
          >
            Send Money
          </button>
          <button
            className="withdraw"
            type="button"
            onClick={handleWithdrawButton}
          >
            Withdraw
          </button>
          <button
            className="transactions"
            type="button"
            onClick={handleTransactionsButton}
          >
            Transactions
          </button>
        </section>

        <section className="expensesSection">
          <p className="expensesTitle">Expenses</p>

          <table>
            <thead>
              <tr className="expensesTransactionsContainer">
                <th className="transactionId">Transaction ID</th>
                <th className="forExpenseItem">Expense</th>
                <th className="forExpenseAmount">Amount</th>
                <th className="forExpenseDate">Date</th>
                <th className="forTransactionAction">Action</th>
              </tr>
            </thead>
            <tbody>
              {expensesHistory &&
                expensesHistory.slice(-5).map((expense, index) => (
                  <tr
                    className={`itemList ${
                      index % 2 === 0 ? "even-row" : "odd-row"
                    }`}
                    key={expense["Transaction ID"]}
                  >
                    <td>{expense["Transaction ID"]}</td>
                    <td>{expense.item}</td>
                    <td>{"₱" + expense.price}</td>
                    <td>
                      {new Date(expense["Date"]).toLocaleDateString("en", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <button
                        className="editExpenseButton"
                        onClick={() => handleEditExpense(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="deleteExpenseButton"
                        onClick={() => handleDeleteExpense(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {showExpenseForm && (
            <div className="expenseForm">
              <Input
                key="expenseItem"
                label="Item"
                type="text"
                id="expenseItem"
                value={expenseItem}
                onChange={(e) => setExpenseItem(e.target.value)}
              />
              <br />

              <Input
                key="expensePrice"
                label="Price"
                type="text"
                id="expensePrice"
                value={expensePrice}
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/\D/g, "");
                  if (inputValue.length <= 18) {
                    setExpensePrice(inputValue);
                  }
                }}
              />
              <br />
              <button
                className="addExpenseSubmit"
                onClick={handleAddExpenseSubmit}
              >
                {editIndex !== -1 ? "Update" : "Add"}
              </button>

              <button
                className="cancelExpenseSubmit"
                onClick={handleCancelExpenseSubmit}
              >
                Cancel
              </button>

              {error && <p className="dashboardTransactionsError">{error}</p>}
            </div>
          )}

          {showAddExpenseButton && (
            <button
              className="addExpense"
              type="button"
              onClick={handleAddExpenseButton}
            >
              Add
            </button>
          )}
        </section>
        <Link to="/" className="logoutLinkInDashboard">
          Logout
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
