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
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );
  const [savedUsers, setSavedUsers] = useState(
    JSON.parse(localStorage.getItem("savedUsers")) || []
  );
  const [depositHistory, setDepositHistory] = useState(
    JSON.parse(localStorage.getItem("depositHistory")) || []
  );
  const [withdrawHistory, setWithdrawHistory] = useState(
    JSON.parse(localStorage.getItem("withdrawHistory")) || []
  );
  const [sendMoneyHistory, setSendMoneyHistory] = useState(
    JSON.parse(localStorage.getItem("sendMoneyHistory")) || []
  );
  const [expensesHistory, setExpensesHistory] = useState(
    JSON.parse(localStorage.getItem("expensesHistory")) || []
  );

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    if (loggedInUser) {
      const uniqueSavedUsers = savedUsers.filter(
        (user) =>
          user.username !== loggedInUser.username &&
          user.password !== loggedInUser.password
      );

      localStorage.setItem(
        "savedUsers",
        JSON.stringify([...uniqueSavedUsers, loggedInUser])
      );
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (typeof accountBalance === "number") {
      setLoggedInUser({
        ...loggedInUser,
        accountBalance,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expensesHistory", JSON.stringify(expensesHistory));
  }, [expensesHistory]);

  const updateAccountBalance = (newBalance) => {
    setLoggedInUser({ ...loggedInUser, accountBalance: newBalance });
    console.log(newBalance);
  };

  return (
    <Router>
      <header className="bankHeaderContainer">
        <img
          className="bankLogo"
          src="https://i.ibb.co/D59sPfC/BankLogo.jpg"
          alt="BankLogo"
          border="0"
        />
        {/* <img
          className="bankLogo"
          src="/src/assets/BankLogo.jpg"
          alt="BankLogo"
        /> */}
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
            element={<SignUpPage savedUsers={savedUsers} />}
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={loggedInUser}
                updateAccountBalance={updateAccountBalance}
                expensesHistory={expensesHistory}
                setExpensesHistory={setExpensesHistory}
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
                savedUsers={savedUsers}
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
                savedUsers={savedUsers}
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
                savedUsers={savedUsers}
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
                setWithdrawHistory={setWithdrawHistory}
                sendMoneyHistory={sendMoneyHistory}
                expensesHistory={expensesHistory}
                updateAccountBalance={updateAccountBalance}
              />
            }
          />
        </Routes>
      </main>

      <footer>
        <h6>&copy; {new Date().getFullYear()} Prosperity Bank</h6>
      </footer>
    </Router>
  );
}

export default App;
