import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';

const Withdraw = (props) => {
  const { user, widthrawHistory, setWithdrawHistory, savedUsers, updateAccountBalance } = props;
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [withDrawOption, setWithdrawOption] = useState('');
  const [withdrawInput, setWithdrawInput] = useState('');


  return (
    <div className="withdrawHeader">
      <h3 className="withdrawText">Online Withdrawal</h3>
      <input className="withdrawInput">Enter amount:</input>

      <button className="backToDashboard" onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
    </div>
  )
}

export default Withdraw;