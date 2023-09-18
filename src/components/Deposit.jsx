import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';

const Deposit = (props) => {
  const { user } = props;
  const [depositInput, setDepositInput] = useState('');
  const [depositOptions, setDepositOptions] = useState('');
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [westernReference, setWesternReference] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedBalance = JSON.parse(localStorage.getItem('savedBalance'));
    const currentBalance = savedBalance.reduce(
      (total, deposit) => total + parseFloat(deposit.depositInput),
      0
    );
  
    user.accountBalance = currentBalance;
  }, [user]);

  const onDepositInputChange = (e) => setDepositInput(e.target.value);
  const onDepositOptionsChange = (e) => {
    setDepositOptions(e.target.value);
    setSelectedOption(e.target.value);
  };

  const onAdditionalInfo = (e) => setAdditionalInfo(e.target.value);
  const onWesternReference = (e) => setWesternReference(e.target.value);

  const handleDepositSubmitButton = (e) => {
    e.preventDefault();

    if (depositInput.trim() === '' || depositOptions.trim() === '') {
      setError('Please fill out all the blank fields.')
      return;
    }

    const newAccountBalance = currentBalance;
    const savedBalance = JSON.parse(localStorage.getItem('savedBalance')) || [];
    
    user.accountBalance += parseFloat(depositInput);
    
    const updatedBalance = [...savedBalance, newAccountBalance];

    localStorage.setItem('savedBalance', JSON.stringify(updatedBalance));
    setError('');
    alert('Deposit was successful.');
    navigate('/dashboard');
  };

  return (
    <div className="depositHeader">
      <h3 className="depositText">Online Deposit</h3>
      <h5 className="currentBalance">Your current balance: {user.accountBalance}</h5>

      <div className="depositContainer">

        <Input
          key="depositOptions"
          label="Deposit from:"
          list="depositOptions"
          id="depositOptions"
          value={depositOptions}
          onChange={onDepositOptionsChange}
          required
        />
          <datalist id="depositOptions">
            <option value="Another Prosperity Bank Account" />
            <option value="Western Union" />
          </datalist>
        <br />

          {selectedOption === "Another Prosperity Bank Account" && (
            <form>
              <Input
              key="additionalInfo"
              label="Account Number:" /**Dapat gawan ng function for subtracting sa other account, need din gawan ng option for another account */
              type="number"
              id="additionalInfo"
              value={additionalInfo}
              onChange={onAdditionalInfo}
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

              <h5 className="beforeDepositSubmitText">Before clicking 'Deposit', please review and ensure correct information. <br />
                <button className="depositButton" type="submit" onClick={handleDepositSubmitButton}>Deposit</button> 
              </h5> 
            </form>
          )}

          {selectedOption === "Western Union" && (
            <div className="westernUnionContainer">
              <ol className="westernUnionInstructions">To deposit through Western Union:</ol>
                <li className="westernUnionInstructions">The sender goes to a partner branch for the payment and provides your details to the cashier.</li>
                <li className="westernUnionInstructions">The sender takes note and gives you the reference number provided by the cashier.</li>
                <li className="westernUnionInstructions">You proceed to receive the money via Western Union on Prosperity Bank Online, input the reference number and receive the funds to your account.</li>
              <br />

              <h5 className="westernUnionDeposit">Already have the reference number?</h5>
              <h5 className="westernUnionDeposit">Enter the following details:</h5>
              
              <div>
                <form>
                  <Input
                    key="westernReference"
                    label="MTCN Code:"
                    type="text"
                    id="westernReference"
                    value={westernReference}
                    onChange={onWesternReference}
                    required
                  />
                  <br />

                  <Input
                    key="depositInput"
                    label="Enter amount:"
                    type="number"
                    id="depositInput"
                    value={depositInput}
                    onChange={onDepositInputChange}
                    required
                  />
                  <br />

                  {error && <p className="depositError">{error}</p>}

                  <h5 className="beforeDepositSubmitText">Before clicking 'Deposit', please review and ensure correct information. <br />
                    <button className="depositButton" type="submit" onClick={handleDepositSubmitButton}>Deposit</button> 
                  </h5>
                </form>
              </div>
            </div>
            )
          }
      </div>     
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  )
}

export default Deposit;