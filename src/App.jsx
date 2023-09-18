import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import Deposit from './components/Deposit';
// import SendMoney from './components/SendMoney';
// import Transactions from './components/Transactions';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('savedUsers');

    if (savedUsers) {
      setRegisteredUsers(JSON.parse(savedUsers));
    }
  }, []);

  useEffect(() => {
    const savedBalance = localStorage.getItem('savedBalance');

    if (savedBalance) {
      setLoggedInUser({ ...loggedInUser, accountBalance: parseFloat(savedBalance) });
    }
  }, [loggedInUser]);

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
            <Route path='/deposit' element={<Deposit user={loggedInUser}/>} />
            {/* <Route path='/send-money' element={<SendMoney user={loggedInUser}/>} />
            <Route path='/withdraw' element={<Withdraw user={loggedInUser}/>} />
            <Route path='/transactions-history' element={<Transactions user={loggedInUser}/>} /> */}
          </Routes>
        </main>

      <footer>
        <h6>2023 Prosperity Bank</h6>
      </footer>
    </Router>
  )
}

export default App