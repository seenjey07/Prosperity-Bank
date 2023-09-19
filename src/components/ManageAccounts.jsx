import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';

const ManageAccounts = (props) => {
  const { user, updateAccountBalance } = props;
  const [editedPassword, setEditedPassword] = useState('');
  const [editedConfirmPassword, setEditedConfirmPassword] = useState('');
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedAccountBalance, setEditedAccountBalance] = useState(user.accountBalance);
  const navigate = useNavigate();
  const [error, setError] = useState('');

    const handleUpdate = (e) => {
      e.preventDefault();

      if (editedPassword !== editedConfirmPassword) {
        setEditedPassword('');
			  setEditedConfirmPassword('');
			  setError('Passwords do not match');
        return;
      }

      const savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || [];
		
      const userIndex = savedUsers.findIndex((savedUser) => savedUser.username === user.username);
  
      if (userIndex !== -1) { /*irereturn ang -1 kung hindi magkakaroon ng match yung username, meaning non-existent sa array yung username*/
          const updatedAccountInfo = {
            ...savedUsers[userIndex],
            accountBalance: parseFloat(editedAccountBalance),
            password: editedPassword || savedUsers[userIndex].password,
            email: editedEmail || savedUsers[userIndex].email,
          };

      savedUsers[userIndex] = updatedAccountInfo;
      
		  localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
      updateAccountBalance(parseFloat(editedAccountBalance));

      setTimeout(() => {
        setError('');
        alert('Account information succesfully updated. Please login again.');
        navigate('/login');
      }, 1000);
    }
	};

  return (
    <div>
      <h3 className="manageAccountText">Manage Your Account Information</h3>
      <form className="manageAccountContainer">
        <div> 
          <Input
              key="editedAccountBalance"
              label="New Account Balance"
              type="number"
              id="editedAccountBalance"
              value={editedAccountBalance}
              onChange={(e) => setEditedAccountBalance(e.target.value)}
          />
          <br />

         <Input
            key="editedPassword"
            label="New Password"
            type="password"
            id="editedPassword"
            value={editedPassword}
            onChange={(e) => setEditedPassword(e.target.value)}
          />
          <br />

          <Input
            key="editedConfirmPassword"
            label="Confirm New Password"
            type="password"
            id="editedConfirmPassword"
            value={editedConfirmPassword}
            onChange={(e) => setEditedConfirmPassword(e.target.value)}
          />
          <br />

          {error && <p className="passwordError">{error}</p>}


          <Input
            key="editedEmail"
            label="New Email Address"
            type="email"
            id="editedEmail"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
          <br />
        </div>
         <button className="saveChangesButton" type="submit" onClick={handleUpdate}>Save Changes</button>
      </form>

      <button className="backToDashboard" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  )
}

export default ManageAccounts;