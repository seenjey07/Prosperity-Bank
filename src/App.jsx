import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import Deposit from './components/Deposit';
import ManageAccounts from './components/ManageAccounts';
import SendMoney from './components/SendMoney';
import Withdraw from './components/Withdraw';
import Transactions from './components/Transactions';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);
  
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('savedUsers'));
    const savedBalance = JSON.parse(localStorage.getItem('savedBalance'));
 
    if (Array.isArray(savedUsers)) {
      setRegisteredUsers(savedUsers);
    }

    if (typeof savedBalance === 'number') {
      setLoggedInUser({ ...loggedInUser, accountBalance: savedBalance });
    }
  }, []);

    const updateAccountBalance = (newBalance) => {
      setLoggedInUser({ ...loggedInUser, accountBalance: newBalance });
    }

  return (
    <Router>
      <header>
        <img className="bankLogo" src="src/assets/BankLogo.jpg" alt="BankLogo" />
        <h1 className="bankName">Prosperity Bank</h1>
        <p className="bankTagline">Prosperity Unleashed: Banking with a Vision</p>
      </header>

        <main>
          <Routes>
            <Route path='/' element={<WelcomePage />} />
            <Route path='/login' element={<LoginPage setLoggedInUser={setLoggedInUser} />} />
            <Route path='/signup' element={<SignUpPage registeredUsers={registeredUsers}/>} />
            <Route path='/dashboard' element={<Dashboard user={loggedInUser} />} />
            <Route path='/manage-account' element={<ManageAccounts user={loggedInUser} updateAccountBalance={updateAccountBalance} />} />
            <Route path='/deposit' element={<Deposit user={loggedInUser} depositHistory={depositHistory} setDepositHistory={setDepositHistory} updateAccountBalance={updateAccountBalance} />} />
            <Route path='/send-money' element={<SendMoney user={loggedInUser}/>} />
            <Route path='/withdraw' element={<Withdraw user={loggedInUser}/>} />
            <Route path='/transactions-history' element={<Transactions user={loggedInUser} depositHistory={depositHistory}/>} />
          </Routes>
        </main>

      <footer>
        <h6>2023 Prosperity Bank</h6>
      </footer>
    </Router>
  )
}

export default App