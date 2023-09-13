import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  useEffect(() => {
    const savedUserInfo = {
        username: 'christine',
        password: 'christine',
      };
    
    localStorage.setItem('savedUserInfo', JSON.stringify(savedUserInfo));
  }, []);

  const [loggedInUser, setLoggedInUser] = useState(null);

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
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/dashboard' element={<Dashboard user={loggedInUser} />} />
          </Routes>
        </main>

      <footer>
        <h6>2023 Prosperity Bank</h6>
      </footer>
    </Router>
  )
}

export default App