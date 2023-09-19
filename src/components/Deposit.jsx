import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';

const Deposit = (props) => {
  const { user, depositHistory, setDepositHistory } = props;
  const [depositInput, setDepositInput] = useState('');
  const [depositOption, setDepositOption] = useState('');
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [additionalAccountInfo, setAdditionalAccountInfo] = useState('');
  const [additionalNumberInfo, setAdditionalNumberInfo] = useState('');
  const [westernReference, setWesternReference] = useState('');
  const [westernSender, setWesternSender] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedBalance = localStorage.getItem('savedBalance');
    if (savedBalance !== null) {
        setDepositInput('');
    }
  }, [depositOption]);
  
  const onDepositOptionChange = (e) => {
    setDepositOption(e.target.value);
    setSelectedOption(e.target.value);
  };

  const onDepositInputChange = (e) => setDepositInput(e.target.value);
  const onAdditionalAccountInfoChange = (e) => setAdditionalAccountInfo(e.target.value);
  const onAdditionalNumberInfoChange = (e) => setAdditionalNumberInfo(e.target.value);
  const onWesternReferenceChange = (e) => setWesternReference(e.target.value);
  const onWesternSenderChange = (e) => setWesternSender(e.target.value);

  const handleDepositSubmitButton = (e) => {
    e.preventDefault();

    if (!depositOption) {
      setError('Please choose a deposit option.');
      return;
    }
  
    if (selectedOption === "Another Bank Account") {
      if (!additionalAccountInfo || !additionalNumberInfo || !depositInput) {
        setError('Please fill out all the fields for Another Bank Account deposit.');
        return;
      }
    } else if (selectedOption === "Western Union") {
      if (!westernReference || !westernSender || !depositInput) {
        setError('Please fill out all the fields for Western Union deposit.');
        return;
      }
    }

    const depositAmount = parseFloat(depositInput);

    if (isNaN(depositAmount) || depositAmount <=0) {
      setError('Invalid deposit amount');
      return;
    }

    const newBalance = user.accountBalance + depositAmount;
    user.accountBalance = newBalance;
    localStorage.setItem('savedBalance', newBalance.toString());
    
    setDepositHistory([...depositHistory, {amount: depositAmount, date: new Date() }]);
    localStorage.setItem('depositHistory', JSON.stringify([...depositHistory, {amount: depositAmount, date: new Date() }]));
    
    setTimeout(() => {
      alert('Deposit was successful.');
      navigate('/dashboard');
      }, 1000);
  };

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
          list="depositOption"
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
                key="additionalAccountInfo"
                label="Account Name:"
                type="text"
                id="additionalAccountInfo"
                value={additionalAccountInfo}
                onChange={onAdditionalAccountInfoChange}
                required
              />
              <br />

              <Input
                key="additionalNumberInfo"
                label="Account Number:" /**Dapat gawan ng function for subtracting sa other account, need din gawan ng option for another account */
                type="number"
                id="additionalNumberInfo"
                value={additionalNumberInfo}
                onChange={onAdditionalNumberInfoChange}
                required
              />
              <br />

              <Input
                key="depositInput"
                label="Enter amount to deposit:"
                type="number"
                id="depositInput"
                value={depositInput}
                onChange={onDepositInputChange}
                required
              />
              <br />

              {error && <p className="depositError">{error}</p>}

              <h5 className="beforeDepositSubmitText">Before clicking 'Deposit', please review and ensure correct information.</h5> 
              <button className="depositButton" type="submit" onClick={handleDepositSubmitButton}>Deposit</button> 
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
                    key="westernSender"
                    label="Name of Sender:"
                    type="text"
                    id="westernSender"
                    value={westernSender}
                    onChange={onWesternSenderChange}
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
                    label="Enter amount:"
                    type="number"
                    id="depositInput"
                    value={depositInput}
                    onChange={onDepositInputChange}
                  />
                  <br />

                  {error && <p className="depositError">{error}</p>}

                  <h5 className="beforeDepositSubmitText">Before clicking 'Deposit', please review and ensure correct information.</h5> 
                  <button className="depositButton" type="submit" onClick={handleDepositSubmitButton}>Deposit</button>

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