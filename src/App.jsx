import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
  <>
    <div>
      <img className="bankLogo" src="/src/BankLogo.jpg" alt="BankLogo" />
      <header>Prosperity Bank</header>
      <p className="bankTagline">Prosperity Unleashed: Banking with a Vision</p>
    </div>

    <Router>
     <main>
        <nav>
          <ul>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Routes>
     </main>
    </Router>

    <div className="footerContainer">
      <footer>Copyright 2023</footer>
    </div>
  </>
  )
}

export default App