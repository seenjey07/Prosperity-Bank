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
    const savedBalance = parseFloat(localStorage.getItem('savedBalance'));
    const savedDepositHistory = JSON.parse(localStorage.getItem('depositHistory'));

    if (Array.isArray(savedUsers)) {
      setRegisteredUsers(savedUsers);
    }

    if (typeof savedBalance === 'number') {
      setLoggedInUser({ ...loggedInUser, accountBalance: savedBalance });
    }

    if (Array.isArray(savedDepositHistory)) {
      setDepositHistory(savedDepositHistory);
    }
  }, []); /*pag inaalis yung loggedInUser, hindi nase-save para sa next log-in yung deposits from previous transactions, if nasa loob naman yung loggedInUser, may infinite loop error*/

    const updateAccountBalance = (newBalance) => {
      setLoggedInUser({ ...loggedInUser, accountBalance: newBalance });
      localStorage.setItem('savedBalance', newBalance.toString());
    }

  //     if (Array.isArray(savedUsers) && savedUsers.length > 0) {
  //       setLoggedInUser(savedUsers[0]);
  //     }

  //     if (Array.isArray(savedUsers)) {
  //       setRegisteredUsers(savedUsers);
  //     }

  //     if (typeof savedBalance === 'number') {
  //       setLoggedInUser((prevUser) => ({ ...prevUser, accountBalance: savedBalance }));
  //     }

  //     if (Array.isArray(savedDepositHistory)) {
  //       setDepositHistory(savedDepositHistory);
  //     }
  // }, []);

  //     const updateAccountBalance = (newBalance) => { 
  //       setLoggedInUser((prevUser) => ({ ...prevUser, accountBalance: newBalance }));
  //       localStorage.setItem('savedBalance' , newBalance.toString());
  //     };

  return (
    <Router>
      <header className='bankHeaderContainer'>
        <img className="bankLogo" src="src/assets/BankLogo.jpg" alt="BankLogo" />
        <h1 className="bankName">Prosperity Bank</h1>
        <p className="bankTagline">Prosperity Unleashed: Banking with a Vision</p>
      </header>

        <main className="bankMainContainer">
          <Routes>
            <Route path='/' element={<WelcomePage />} />
            <Route path='/login' element={<LoginPage setLoggedInUser={setLoggedInUser} />} />
            <Route path='/signup' element={<SignUpPage registeredUsers={registeredUsers}/>} />
            <Route path='/dashboard' element={<Dashboard user={loggedInUser} depositHistory={depositHistory} setDepositHistory={setDepositHistory} updateAccountBalance={updateAccountBalance} />} />
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