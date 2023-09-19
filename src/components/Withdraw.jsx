import React from 'react';
import { useNavigate } from 'react-router-dom';

const Withdraw = (props) => {
  const { user } = props;
  const navigate = useNavigate

  return (
    <div className="withdrawHeader">
      <h3 className="withdrawText">Online Withdrawal</h3>
      <input className="withdrawInput">Enter amount:</input>

      <button className="backToDashboard" onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
    </div>
  )
}

export default Withdraw;