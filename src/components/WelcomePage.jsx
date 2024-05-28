import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="welcomePageContainer">
      <h1 className="welcomeMessage">
        Welcome to <br /> Prosperity Bank
      </h1>
      <h4 className="howToHelpMessage">How can we help you today?</h4>
      <nav>
        <ul>
          <li className="welcomeOptions">
            <Link to="/login">Log me in</Link>
          </li>
          <li className="welcomeOptions">
            <Link to="/signup">I wanna bank with you</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default WelcomePage;
