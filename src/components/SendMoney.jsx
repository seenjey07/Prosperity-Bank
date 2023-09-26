import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import GenerateTransactionId from "./GenerateTransactionId";

const SendMoney = (props) => {
  const { user, sendMoneyHistory, setSendMoneyHistory, savedUsers } = props;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [sendMoneyOptions, setSendMoneyOptions] =
    useState(""); /*Payment, Donation, Send-Money, */
  const [receiverName, setReceiverName] =
    useState(""); /*Receiver Name and AccountNumber yung need ma-input*/
  const [receiverAccountNumber, setReceiverAccountNumber] =
    useState(""); /*Receiver Name and AccountNumber yung need ma-input*/
  const [sendMoneyInput, setSendMoneyInput] =
    useState(""); /*Eto yung amount na isesend*/
  const [savedBalance, setSavedBalance] = useState(user.accountBalance);

  useEffect(() => {
    const savedBalance = localStorage.getItem("savedUsers");
    if (savedBalance !== null) {
      setSendMoneyInput("");
    }
  }, []);

  useEffect(() => {
    setError("");
  }, [sendMoneyOptions, receiverName, receiverAccountNumber, sendMoneyInput]);

  const onSendMoneyOptionsChange = (e) => setSendMoneyOptions(e.target.value);
  const onReceiverNameChange = (e) => setReceiverName(e.target.value);
  const onReceiverAccountNumberChange = (e) =>
    setReceiverAccountNumber(e.target.value);
  const onSendMoneyInputChange = (e) => setSendMoneyInput(e.target.value);

  const handleSendMoneySubmitButton = (e) => {
    e.preventDefault();

    if (!receiverName || !receiverAccountNumber || !sendMoneyInput) {
      setError("Please fill out all the fields to make your transfer.");
      return;
    }

    const sentAmount = parseFloat(sendMoneyInput);

    if (sentAmount > savedBalance) {
      setError(
        "Invalid deposit amount. Transfer amount is greater than the account balance."
      );
      return;
    } else if (sentAmount === 0) {
      setError("Invalid deposit amount.");
      return;
    }

    const newBalance = user.accountBalance - sentAmount;
    props.updateAccountBalance(newBalance);

    const userIndex = savedUsers.findIndex(
      (savedUser) => savedUser.username === user.username
    );

    if (userIndex !== -1) {
      const updatedUsers = [...savedUsers];
      const updatedAccountInfo = {
        ...updatedUsers[userIndex],
        accountBalance: newBalance,
      };

      updatedUsers[userIndex] = updatedAccountInfo;

      localStorage.setItem("savedUsers", JSON.stringify(updatedUsers));
      // updateAccountBalance(parseFloat(newBalance));

      setSendMoneyHistory([
        ...sendMoneyHistory,
        {
          Transaction: sendMoneyOptions,
          "Transaction ID": GenerateTransactionId(7),
          Recipient: receiverName + receiverAccountNumber,
          Amount: "₱ " + sentAmount,
          Date: new Date(),
          Status: "Completed",
        },
      ]);

      localStorage.setItem(
        "sendMoneyHistory",
        JSON.stringify([
          ...sendMoneyHistory,
          {
            Transaction: sendMoneyOptions,
            "Transaction ID": GenerateTransactionId(7),
            Recipient: receiverName,
            "Account Number": receiverAccountNumber,
            Amount: "₱ " + sentAmount,
            Date: new Date(),
            Status: "Completed",
          },
        ])
      );

      setSendMoneyOptions("");
      setReceiverName("");
      setReceiverAccountNumber("");
      setSendMoneyInput("");

      setTimeout(() => {
        alert("Transfer of funds was succesful.");
        navigate("/dashboard");
      }, 1000);
    }
  };

  return (
    <div>
      <h3 className="sendMoneyText">Send Money</h3>
      <h4 className="currentBalance">
        Your current balance: ₱ {user.accountBalance}
      </h4>

      <div className="sendMoneyContainer">
        <p className="sendMoneyInstruction">Select the purpose of transfer:</p>
        <br />
        <select
          key="sendMoneyOptions"
          id="sendMoneyOptions"
          value={sendMoneyOptions}
          onChange={onSendMoneyOptionsChange}
        >
          <option value=""></option>
          <option value="Payment">Payment</option>
          <option value="Donation">Donation</option>
          <option value="Transfer">Transfer</option>
        </select>
        <br />

        <form>
          <Input
            key="receiverName"
            label="Account Name:"
            type="text"
            id="receiverName"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
          <br />

          <Input
            key="receiverAccountNumber"
            label="Account Number:" /**Dapat gawan ng function for subtracting sa other account, need din gawan ng option for another account */
            type="text"
            id="receiverAccountNumber"
            value={receiverAccountNumber}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/\D/g, "");
              if (inputValue.length <= 18) {
                setReceiverAccountNumber(inputValue);
              }
            }}
          />
          <br />

          <Input
            key="sendMoneyInput"
            label="Enter amount to transfer:"
            type="text"
            id="sendMoneyInput"
            value={sendMoneyInput}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/\D/g, "");
              if (inputValue.length <= 18) {
                setSendMoneyInput(inputValue);
              }
            }}
          />
          <br />

          {error && <p className="dashboardTransactionsError">{error}</p>}

          <h5 className="beforeDashboardTransactionsSubmitText">
            Before clicking 'Send', please review and ensure correct
            information.
          </h5>
          <button
            className="dashboardTransactionsSubmitButton"
            type="submit"
            onClick={handleSendMoneySubmitButton}
          >
            Send
          </button>
        </form>
      </div>

      <button
        className="backToDashboard"
        onClick={() => navigate("/dashboard")}
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default SendMoney;
