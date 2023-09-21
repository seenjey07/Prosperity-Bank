import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';

const ManageAccounts = (props) => {
const { user } = props;
  const [editedPassword, setEditedPassword] = useState('');
  const [editedConfirmPassword, setEditedConfirmPassword] = useState('');
  const [editedEmail, setEditedEmail] = useState(user.email);
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
      <form className="manageAccountContainer" onSubmit={handleUpdate}>
        <div> 

          <p className="changePwText">Change your password:</p>

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

          <p className="changeEmailText">Change your email address:</p>

          <Input
            key="editedEmail"
            label="New Email Address"
            type="email"
            id="editedEmail"
            value={''}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
          <br />
          <button className="saveChangesButton" type="submit">Save Changes</button>
        </div>
      </form>

      <button className="backToDashboard" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  )
}

export default ManageAccounts;