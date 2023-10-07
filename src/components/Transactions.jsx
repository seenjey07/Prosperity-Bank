import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Transactions = (props) => {
  const {
    user,
    depositHistory,
    withdrawHistory,
    setWithdrawHistory,
    sendMoneyHistory,
    expensesHistory,
  } = props;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("");
  const [withdrawStatus, setWithdrawStatus] = useState("");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleWithdrawStatusChange = (e, transactionId) => {
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
      const newBalance =
        user.accountBalance -
        parseFloat(updatedWithdrawHistory[transactionId].Amount);
      props.updateAccountBalance(newBalance);
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

      {activeTab === "deposits" && (
        <div>
          <div className="transactionsTitleContainer">
            <h3 className="depositsTransactionsTitle">Deposits History</h3>
          </div>
          <div className="depositsTransactionsContainer">
            <p className="transactionId">Transaction ID</p>
            <p className="forDepositOption">Channel</p>
            <p className="forNameOfSender">Sender</p>
            <p className="forDepositAmount">Amount</p>
            <p className="forDepositDate">Date</p>
            <p className="forTransactionsStatus">Status</p>
          </div>
          {depositHistory.map((transaction) => (
            <div key={transaction.id}>
              <p>{transaction.id}</p>
              <p>{transaction.depositOption}</p>
              <p>{transaction.depositorName}</p>
              <p>{"₱ " + transaction.depositAmount}</p>
              <p>{transaction.date}</p>
              <p>{transaction.status}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "withdrawals" && (
        <div>
          <div className="transactionsTitleContainer">
            <h3 className="withdrawTransactionsTitle">Withdrawals History</h3>
          </div>
          <div className="withdrawalTransactionsContainer">
            <p className="transactionId">Transaction ID</p>
            <p className="forWithdrawOption">Channel</p>
            <p className="forWithdrawAmount">Amount</p>
            <p className="forWithdrawDate">Date</p>
            <p className="forWithdrawStatus">Status</p>
            <p className="forWithdrawStatusChange">Change Status</p>
            <div className="changeWithdrawStatus">
              <select
                key="changeStatus"
                id="changeStatus"
                value={withdrawStatus}
                onChange={(e) =>
                  handleWithdrawStatusChange(e, transaction.id)
                } /*{handleWithdrawStatusChange}*/
              >
                <option value="">Select</option>
                <option value="Successful">Successful</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          {withdrawHistory.map((transaction) => (
            <div key={transaction.id}>
              <p>{transaction.id}</p>
              <p>{transaction.withdrawOption}</p>
              <p>{"₱ " + transaction.withdrawAmount}</p>
              <p>{transaction.date}</p>
              <p>{transaction.status}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "sendMoney" && (
        <div>
          <div className="transactionsTitleContainer">
            <h3 className="sendMoneyTransactionsTitle">Send Money History</h3>
          </div>
          <div className="sendMoneyTransactionsContainer">
            <p className="transactionId">Transaction ID</p>
            <p className="forSendMoneyOption">Channel</p>
            <p className="forSendMoneyRecipientName">Recipient</p>
            <p className="forSendMoneyRecipientAcccountNumber">
              Account Number
            </p>
            <p className="forSendMoneyAmount">Amount</p>
            <p className="forSendMoneyDate">Date</p>
            <p className="forSendMoneyStatus">Status</p>
          </div>
          {sendMoneyHistory.map((transaction) => (
            <div key={transaction.id}>
              <p>{transaction.id}</p>
              <p>{transaction.sendMoneyOptions}</p>
              <p>{transaction.receiverName}</p>
              <p>{transaction.receiverAccountNumber}</p>
              <p>{"₱ " + transaction.sentAmount}</p>
              <p>{transaction.date}</p>
              <p>{transaction.status}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "expenses" && (
        <div className="expensesTransactionsContainer">
          <p className="transactionId">Transaction ID</p>
          <p className="forExpenseItem">Expense</p>
          <p className="forExpenseAmount">Amount</p>
          <p className="forExpenseDate">Date</p>
          <p className="forTransactionAction">Action</p>
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
