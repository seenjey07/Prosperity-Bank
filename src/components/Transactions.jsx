import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenerateTransactionID from "./GenerateTransactionId";

const Transactions = (props) => {
  const { user, depositHistory, withdrawHistory, sendMoneyHistory } = props;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("");
  const [withdrawStatus, setWithdrawStatus] = useState("");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleWithdrawStatusChange = (e, transactionId) => {
    const newStatus = e.target.value;

    const transactionIndex = withdrawHistory.findIndex(
      (transaction) => transaction.id === transactionId
    );

    if (transactionIndex === -1) {
      console.error("Transaction not found.");
      return;
    }

    const updatedWithdrawHistory = [...withdrawHistory];
    updatedWithdrawHistory[transactionIndex].Status = newStatus;

    setWithdrawHistory(updatedWithdrawHistory);

    localStorage.setItem(
      "withdrawHistory",
      JSON.stringify(updatedWithdrawHistory)
    );

    if (newStatus === "Successful") {
      const newBalance =
        user.accountBalance -
        parseFloat(updatedWithdrawHistory[transactionIndex].Amount);
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
      </div>

      {activeTab === "deposits" && (
        <div className="depositTransactionsHistory">
          <p className="forDepositOption">Channel</p>
          <p className="forDepositDate">Date of Transaction</p>
          <p className="forNameOfSender">Sender</p>
          <p className="forDepositAmount">Amount</p>
          <p className="forTransactionsStatus">Status</p>
        </div>
      )}

      {activeTab === "withdrawals" && (
        <div className="withdrawTransactionsHistory">
          <h3 className="withdrawTransactionsTitle">Withdrawals History</h3>
          <p className="forWithdrawOption">Channel</p>
          <p className="forWithdrawDate">Date of Transaction</p>
          <p className="forWithdrawAmount">Amount</p>
          <p className="forWithdrawStatus">Status</p>
          <div className="changeWithdrawStatus">
            <select
              key="changeStatus"
              id="changeStatus"
              value={withdrawStatus}
              onChange={(e) =>
                handleWithdrawStatusChange(e, transaction.id)
              } /*{handleWithdrawStatusChange}*/
            >
              <option value="">Change Transaction Status</option>
              <option value="Successful">Successful</option>
              <option value="Cancel">Cancelled</option>
            </select>
          </div>
        </div>
      )}

      {activeTab === "sendMoney" && (
        <div className="sendMoneyTransactionsHistory">
          <h3 className="sendMoneyTransactionsTitle">Send Money History</h3>
          <p className="forSendMoneyOption">Account Number</p>
          <p className="forSendMoneyRecipientName">Recipient</p>
          <p className="forSendMoneyRecipientAcccountNumber">Account Number</p>
          <p className="forSendMoneyDate">Date of Transaction</p>
          <p className="forSendMoneyAmount">Amount</p>
          <p className="forSendMoneyStatus">Status</p>
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
