import React from 'react';
import { useNavigate } from 'react-router-dom';

const Transactions = (props) => {
  const { user } = props;
  const navigate = useNavigate;
  return (
    <div className="transactionsHeader">
      <h3 className="transactionsText">Transactions History</h3>
      <table></table>




      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  )
}

export default Transactions;