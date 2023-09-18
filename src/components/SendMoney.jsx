import React from 'react';
import { useNavigate } from 'react-router-dom';

const SendMoney = (props) => {
  const { user } = props;
  const navigate = useNavigate();

  return (
    <div className="sendMoneyHeader">
      <h3 className="sendMoneyText">Send Money</h3>
      <input className="sendMoneyInput">Enter amount:</input>




      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>

    </div>
  )
}

export default SendMoney;