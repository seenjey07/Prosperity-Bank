import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';

const Deposit = (props) => {
  const { user, depositHistory, setDepositHistory, savedUsers, updateAccountBalance } = props;
  const [depositOption, setDepositOption] = useState('');
  const [depositInput, setDepositInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [depositorName, setDepositorName] = useState('');
  const [depositorAccountNumber, setDepositorAccountNumber] = useState('');
  const [westernReference, setWesternReference] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const savedBalance = localStorage.getItem('savedUser'); /*Tinanggal ko na yung hiwalay na localStorage for savedBalance*/
    if (savedBalance !== null) {
        setDepositInput('');
    }
  }, [depositOption]);
  
  useEffect(() => {
    setError('');
  }, [selectedOption]);

  const onDepositOptionChange = (e) => {
    setDepositOption(e.target.value);
    setSelectedOption(e.target.value);
  };

  const onDepositInputChange = (e) => setDepositInput(e.target.value);
  const onDepositorNameChange = (e) => setDepositorName(e.target.value);
  const onDepositorAccountNumberChange = (e) => setDepositorAccountNumber(e.target.value);
  const onWesternReferenceChange = (e) => setWesternReference(e.target.value);
 
  const handleDepositSubmitButton = (e) => {
    e.preventDefault();

      if (selectedOption === "Another Bank Account") {
        if (!depositorName || !depositorAccountNumber || !depositInput) {
          setError('Please fill out all the fields for Another Bank Account deposit.');
          return;
          } 
      } else if (selectedOption === "Western Union") {
        if (!depositorName || !westernReference || !depositInput) {
           setError('Please fill out all the fields for Western Union deposit.');
           return;
        } 
    }     

    const depositAmount = parseFloat(depositInput);

      if (isNaN(depositAmount) || depositAmount <= 0) {
        setError('Invalid deposit amount');
        return;
    }

    const newBalance = user.accountBalance + depositAmount;
    user.accountBalance = newBalance;
   
    const userIndex = savedUsers.findIndex((savedUser) => savedUser.username === user.username);

    if (userIndex !== -1) { /*update user's account info with the new balance*/
          const updatedUsers = [...savedUsers]; 
          const updatedAccountInfo = {
            ...updatedUsers[userIndex],
            accountBalance: newBalance,
          };

      updatedUsers[userIndex] = updatedAccountInfo;

      localStorage.setItem('savedUsers', JSON.stringify(updatedUsers)); /* update ng bagong array sa localStorage ng user data*/
      updateAccountBalance(parseFloat(newBalance)); /*update ng UI by calling the account balance function*/

      setDepositHistory([...depositHistory, {Sender: depositorName, Transaction: "Deposit", Amount: '₱ ' + depositAmount, Date: new Date() }]); /*update sa deposit history*/
      localStorage.setItem('depositHistory', JSON.stringify([...depositHistory, {Sender: depositorName, Transaction: "Deposit", Amount: '₱ ' + depositAmount, Date: new Date() }])); /*update ng localStorage sa bagong deposit history*/
      
      setDepositorName('');
      setDepositorAccountNumber('');
      setWesternReference('');
      setDepositInput('');
      setError('');

      setTimeout(() => {
        alert('Deposit was successful.');
        navigate('/dashboard');
        }, 1000);
    };
  }

  return (
    <div>
      <h3 className="depositText">Online Deposit</h3>
      <h4 className="currentBalance">Your current balance: ₱ {user.accountBalance}</h4>

      <div className="depositContainer">
        <p className="depositInstruction">Choose how you want to deposit to your account:</p> 
        <p className="depositInstruction">Another Bank Account or Western Union.</p>
        <br />
            <select
              key="depositOption"
              id="depositOption"
              value={depositOption}
              onChange={onDepositOptionChange}
              required
            >
              <option value=""></option>
              <option value="Another Bank Account">Another Bank Account</option>
              <option value="Western Union">Western Union</option>
            </select>
            <br />

          {selectedOption === "Another Bank Account" && (
            <form>
              <Input
                key="depositorName"
                label="Account Name:"
                type="text"
                id="depositorName"
                value={depositorName}
                onChange={onDepositorNameChange}
              />
              <br />

              <Input
                key="depositorAccountNumber"
                label="Account Number:" /**Dapat gawan ng function for subtracting sa other account, need din gawan ng option for another account */
                type="number"
                id="depositorAccountNumber"
                value={depositorAccountNumber}
                onChange={onDepositorAccountNumberChange}
              />
              <br />

              <Input
                key="depositInput"
                label="Enter amount to deposit:"
                type="number"
                id="depositInput"
                value={depositInput}
                onChange={(e) => setDepositInput(e.target.value)}
              />
              <br />

              {error && <p className="dashboardTransactionsError">{error}</p>}

              <h5 className="beforeDashboardTransactionsSubmitText">Before clicking 'Deposit', please review and ensure correct information.</h5> 
              <button className="dashboardTransactionsSubmitButton" type="submit" onClick={handleDepositSubmitButton}>Deposit</button> 
            </form>
          )}

          {selectedOption === "Western Union" && (
            <div>
              <p className="westernUnionMainInstruction">To deposit through Western Union, please follow these guide:</p>
              <ol>
                <li className="westernUnionInstructions">The sender goes to a partner branch for the payment and provides your details to the cashier.</li>
                <li className="westernUnionInstructions">The sender takes note and gives you the reference number provided by the cashier.</li>
                <li className="westernUnionInstructions">You proceed to receive the money via Western Union on Prosperity Bank Online, input the reference number and receive the funds to your account.</li>
              </ol>
              <br />

              <h5 className="westernUnionDeposit">Already have the reference number?</h5>
              <h5 className="westernUnionDeposit">Enter the following details:</h5>
              
              <div>
                <form>
                <Input
                    key="depositorName"
                    label="Name of Sender:"
                    type="text"
                    id="depositorName"
                    value={depositorName}
                    onChange={onDepositorNameChange}
                  />
                  <br />

                  <Input
                    key="westernReference"
                    label="MTCN Code:"
                    type="text"
                    id="westernReference"
                    value={westernReference}
                    onChange={onWesternReferenceChange}
                  />
                  <br />

                  <Input
                    key="depositInput"
                    label="Enter amount to deposit:"
                    type="number"
                    id="depositInput"
                    value={depositInput}
                    onChange={(e) => setDepositInput(e.target.value)}
                  />
                  <br />

                  {error && <p className="dashboardTransactionsError">{error}</p>}

                  <h5 className="beforeDashboardTransactionsSubmitText">Before clicking 'Deposit', please review and ensure correct information.</h5> 
                  <button className="dashboardTransactionsSubmitButton" type="submit" onClick={handleDepositSubmitButton}>Deposit</button>

                </form>
              </div>
            </div>
          )}
      </div>
        <br />  
        <button className="backToDashboard" onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
    </div>
  )
}

export default Deposit;