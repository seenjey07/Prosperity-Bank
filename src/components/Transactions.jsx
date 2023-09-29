import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Transactions = ({
  user,
  depositHistory,
  withdrawHistory,
  setWithdrawHistory,
  sendMoneyHistory,
  expensesHistory,
  updateAccountBalance,
}) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleWithdrawStatusChange = (e, transactionId, transactionAmount) => {
    const newStatus = e.target.value;

    const updatedWithdrawHistory = withdrawHistory.map((transaction) => {
      if (transaction["Transaction ID"] === transactionId) {
        return { ...transaction, Status: newStatus };
      }
      return transaction;
    });

    setWithdrawHistory(updatedWithdrawHistory);

    localStorage.setItem(
      "withdrawHistory",
      JSON.stringify(updatedWithdrawHistory)
    );

    if (newStatus === "Successful") {
      const newBalance = user.accountBalance - parseFloat(transactionAmount);
      updateAccountBalance(newBalance);
    }
  };

  return (
    <div className="transactionsHistoryContainer">
      <h3 className="transactionsHistoryHeader">Transactions History</h3>
      <div className="transactionTabs">
        <button
          className={`tab ${activeTab === "deposits" ? "active" : ""}`}
          onClick={() => handleTabChange("deposits")}
        >
          Deposits
        </button>

        <button
          className={`tab ${activeTab === "withdrawals" ? "active" : ""}`}
          onClick={() => handleTabChange("withdrawals")}
        >
          Withdrawals
        </button>

        <button
          className={`tab ${activeTab === "sendMoney" ? "active" : ""}`}
          onClick={() => handleTabChange("sendMoney")}
        >
          Send Money
        </button>

        <button
          className={`tab ${activeTab === "expenses" ? "active" : ""}`}
          onClick={() => handleTabChange("expenses")}
        >
          Expenses
        </button>
      </div>

      {!activeTab && (
        <div className="transactionsDefaultContent">
          Please select a tab to view transactions.
        </div>
      )}

      {activeTab === "deposits" && (
        <div className="transactionContainer">
          <div className="transactionsTitleContainer">
            <h3 className="depositsTransactionsTitle">Deposits History</h3>
          </div>
          <table>
            <thead>
              <tr className="depositsTransactionsContainer">
                <th className="transactionId">Transaction ID</th>
                <th className="forDepositOption">Channel</th>
                <th className="forNameOfSender">Sender</th>
                <th className="forDepositAmount">Amount</th>
                <th className="forDepositDate">Date</th>
                <th className="forTransactionsStatus">Status</th>
              </tr>
            </thead>
            <tbody>
              {depositHistory.map((deposit, index) => (
                <tr
                  className={`itemList ${
                    index % 2 === 0 ? "even-row" : "odd-row"
                  }`}
                  key={`deposit_${deposit["Transaction ID"]}`}
                >
                  <td>{deposit["Transaction ID"]}</td>
                  <td>{deposit["Channel"]}</td>
                  <td>{deposit["Sender"]}</td>
                  <td>{deposit["Amount"]}</td>
                  <td>
                    {new Date(deposit["Date"]).toLocaleDateString("en", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td>{deposit["Status"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "withdrawals" && (
        <div className="transactionContainer">
          <div className="transactionsTitleContainer">
            <h3 className="withdrawTransactionsTitle">Withdrawals History</h3>
          </div>
          <table>
            <thead>
              <tr className="withdrawalTransactionsContainer">
                <th className="transactionId">Transaction ID</th>
                <th className="forWithdrawAmount">Amount</th>
                <th className="forWithdrawDate">Date</th>
                <th className="forWithdrawStatus">Status</th>
                <th className="forWithdrawStatusChange">Change Status</th>
                <th className="changeWithdrawStatus"></th>
              </tr>
            </thead>
            <tbody>
              {withdrawHistory.map((withdraw, index) => (
                <tr
                  className={`itemList ${
                    index % 2 === 0 ? "even-row" : "odd-row"
                  }`}
                  key={`withdraw_${withdraw["Transaction ID"]}`}
                >
                  <td>{withdraw["Transaction ID"]}</td>
                  <td>₱ {withdraw["Amount"]}</td>
                  <td>
                    {new Date(withdraw["Date"]).toLocaleDateString("en", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td>{withdraw["Status"]}</td>
                  <td>
                    {" "}
                    {withdraw["Status"] !== "Pending" ? (
                      withdraw["Status"]
                    ) : (
                      <select
                        key={`changesStatus_${withdraw["Transaction ID"]}`}
                        id={`changesStatus_${withdraw["Transaction ID"]}`}
                        value={withdraw["Status"]}
                        onChange={(e) =>
                          handleWithdrawStatusChange(
                            e,
                            withdraw["Transaction ID"],
                            withdraw["Amount"]
                          )
                        }
                      >
                        <option value="">Select</option>
                        <option value="Successful">Successful</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "sendMoney" && (
        <div className="transactionContainer">
          <div className="transactionsTitleContainer">
            <h3 className="sendMoneyTransactionsTitle">Send Money History</h3>
          </div>
          <table>
            <thead>
              <tr className="sendMoneyTransactionsContainer">
                <th className="transactionId">Transaction ID</th>
                <th className="forSendMoneyOption">Purpose</th>
                <th className="forSendMoneyRecipientName">Recipient</th>
                <th className="forSendMoneyRecipientAcccountNumber">
                  Account Number
                </th>
                <th className="forSendMoneyAmount">Amount</th>
                <th className="forSendMoneyDate">Date</th>
                <th className="forSendMoneyStatus">Status</th>
              </tr>
            </thead>
            <tbody>
              {sendMoneyHistory.map((sendMoney, index) => (
                <tr
                  className={`itemList ${
                    index % 2 === 0 ? "even-row" : "odd-row"
                  }`}
                  key={`sendMoney_${sendMoney["Transaction ID"]}`}
                >
                  <td>{sendMoney["Transaction ID"]}</td>
                  <td>{sendMoney["Transaction"]}</td>
                  <td>{sendMoney["Recipient"]}</td>
                  <td>{sendMoney["Account Number"]}</td>
                  <td>{sendMoney["Amount"]}</td>
                  <td>
                    {new Date(sendMoney["Date"]).toLocaleDateString("en", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td>{sendMoney["Status"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "expenses" && (
        <div className="transactionContainer">
          <div className="transactionsTitleContainer">
            <h3 className="expensesTransactionsTitle">Expenses History</h3>
          </div>
          <table>
            <thead>
              <tr className="expensesTransactionsContainer">
                <th className="transactionId">Transaction ID</th>
                <th className="forExpenseItem">Expense</th>
                <th className="forExpenseAmount">Amount</th>
                <th className="forExpenseDate">Date</th>
              </tr>
            </thead>
            <tbody>
              {expensesHistory.map((expense, index) => (
                <tr
                  className={`itemList ${
                    index % 2 === 0 ? "even-row" : "odd-row"
                  }`}
                  key={`expense_${expense["Transaction ID"]}`}
                >
                  <td>{expense["Transaction ID"]}</td>
                  <td>{expense["Expense"]}</td>
                  <td>{expense["Amount"]}</td>
                  <td>
                    {new Date(expense["Date"]).toLocaleDateString("en", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="backToDashboard"
        onClick={() => navigate("/dashboard")}
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default Transactions;
