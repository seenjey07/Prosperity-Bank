import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';

const ManageAccounts = (props) => {
const { user } = props;
  const [editedPassword, setEditedPassword] = useState('');
  const [editedConfirmPassword, setEditedConfirmPassword] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const clearError = () => {
		setError('');
	};

    const handleUpdate = (e) => {
      e.preventDefault();

      if (editedPassword !== editedConfirmPassword) {
			  setError('Passwords do not match');
        setEditedPassword('');
        setEditedConfirmPassword('');
        return;
      }

      if (!editedPassword && !editedEmail) {
        setError('Invalid account update. Please choose an information to update.')
        return;
      }

      const savedUsers = JSON.parse(localStorage.getItem('savedUsers'));
		
      const userIndex = savedUsers.findIndex((savedUser) => savedUser.username === user.username);
  
      if (userIndex !== -1) { /*irereturn ang -1 kung hindi magkakaroon ng match yung username, meaning non-existent sa array yung username*/
          const updatedAccountInfo = {
            ...savedUsers[userIndex],
            password: editedPassword || savedUsers[userIndex].password,
            email: editedEmail || savedUsers[userIndex].email,
          };

      savedUsers[userIndex] = updatedAccountInfo;
      
		  localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
      
      clearError();

      setTimeout(() => {
        alert('Account information succesfully updated. Please login again.');
        navigate('/login');
      }, 1000);
    }
	};

  return (
    <div>
      <h3 className="manageAccountText">Manage Your Account Information</h3>
      <form className="manageAccountContainer" onSubmit={handleUpdate}>
        <div> 
          <div className="changePwContainer">
          <p className="changePwText">Change your password:</p>

         <Input
            key="editedPassword"
            label="New Password"
            type="password"
            id="editedPassword"
            value={editedPassword}
            onChange={(e) => { 
              setEditedPassword(e.target.value);
            }}
          />
          <br />

          <Input
            key="editedConfirmPassword"
            label="Confirm New Password"
            type="password"
            id="editedConfirmPassword"
            value={editedConfirmPassword}
            onChange={(e) => { 
              setEditedConfirmPassword(e.target.value);
            }}
          />
        </div>

        <div className="changeEmailContainer">
          <p className="changeEmailText">Change your email address:</p>
          <p className="displayCurrentEmail">Account Email Address: {user.email}</p>

          <Input
            key="editedEmail"
            label="New Email Address"
            type="email"
            id="editedEmail"
            value={editedEmail}
            onChange={(e) => { 
              setEditedEmail(e.target.value);
            }}
          />
        </div>

          {error && <p className="manageAccountError">{error}</p>}

          <button className="saveChangesButton" type="submit">Save Changes</button>
        </div>
      </form>

      <button className="backToDashboard" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  )
}

export default ManageAccounts;