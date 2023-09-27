import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Dashboard from "./components/Dashboard";
import Deposit from "./components/Deposit";
import ManageAccounts from "./components/ManageAccounts";
import SendMoney from "./components/SendMoney";
import Withdraw from "./components/Withdraw";
import Transactions from "./components/Transactions";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [savedUsers, setSavedUsers] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [sendMoneyHistory, setSendMoneyHistory] = useState([]);
  const [expensesHistory, setExpensesHistory] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers"));
    if (Array.isArray(savedUsers)) {
      setRegisteredUsers(savedUsers);
    }
  }, []);

  useEffect(() => {
    if (typeof accountBalance === "number") {
      setLoggedInUser({
        ...loggedInUser,
        accountBalance,
      });
    }
  }, []);

  useEffect(() => {
    const savedDepositHistory = JSON.parse(
      localStorage.getItem("depositHistory")
    );
    if (Array.isArray(savedDepositHistory)) {
      setDepositHistory(savedDepositHistory);
    }
  }, []);

  useEffect(() => {
    const savedWithdrawHistory = JSON.parse(
      localStorage.getItem("withdrawHistory")
    );
    if (Array.isArray(savedWithdrawHistory)) {
      setWithdrawHistory(savedWithdrawHistory);
    }
  }, []);

  useEffect(() => {
    const savedSendMoneyHistory = JSON.parse(
      localStorage.getItem("sendMoneyHistory")
    );
    if (Array.isArray(savedSendMoneyHistory)) {
      setSendMoneyHistory(savedSendMoneyHistory);
    }
  }, []);

  useEffect(() => {
    const savedExpensesHistory = JSON.parse(
      localStorage.getItem("expensesHistory")
    );
    if (Array.isArray(savedExpensesHistory)) {
      setExpensesHistory(savedExpensesHistory);
    }
  }, []);

  const updateAccountBalance = (newBalance) => {
    setLoggedInUser({ ...loggedInUser, accountBalance: newBalance });
  };

  return (
    <Router>
      <header className="bankHeaderContainer">
        <img
          className="bankLogo"
          src="src/assets/BankLogo.jpg"
          alt="BankLogo"
        />
        <h1 className="bankName">Prosperity Bank</h1>
        <p className="bankTagline">
          Prosperity Unleashed: Banking with a Vision
        </p>
      </header>

      <main className="bankMainContainer">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/login"
            element={<LoginPage setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path="/signup"
            element={<SignUpPage registeredUsers={registeredUsers} />}
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={loggedInUser}
                depositHistory={depositHistory}
                setDepositHistory={setDepositHistory}
                updateAccountBalance={updateAccountBalance}
              />
            }
          />
          <Route
            path="/manage-account"
            element={<ManageAccounts user={loggedInUser} />}
          />
          <Route
            path="/deposit"
            element={
              <Deposit
                user={loggedInUser}
                depositHistory={depositHistory}
                setDepositHistory={setDepositHistory}
                savedUsers={registeredUsers}
                updateAccountBalance={updateAccountBalance}
              />
            }
          />
          <Route
            path="/send-money"
            element={
              <SendMoney
                user={loggedInUser}
                sendMoneyHistory={sendMoneyHistory}
                setSendMoneyHistory={setSendMoneyHistory}
                savedUsers={registeredUsers}
                updateAccountBalance={updateAccountBalance}
              />
            }
          />
          <Route
            path="/withdraw"
            element={
              <Withdraw
                user={loggedInUser}
                withdrawHistory={withdrawHistory}
                setWithdrawHistory={setWithdrawHistory}
                savedUsers={registeredUsers}
              />
            }
          />
          <Route
            path="/transactions-history"
            element={
              <Transactions
                user={loggedInUser}
                depositHistory={depositHistory}
                withdrawHistory={withdrawHistory}
                sendMoneyHistory={sendMoneyHistory}
                expensesHistory={expensesHistory}
              />
            }
          />
        </Routes>
      </main>

      <footer>
        <h6>2023 Prosperity Bank</h6>
      </footer>
    </Router>
  );
}

export default App;
