import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';

const ManageAccounts = (props) => {
  const { user, updateAccountBalance } = props;
  const [editedUsername, setEditedUsername] = useState(user.username);
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

    const updatedAccountInfo = {
			...user,
      accountBalance: editedAccountBalance,
			editedUsername,
			editedPassword,
			editedEmail,
		};

		const savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || [];
		
    const userIndex = savedUsers.findIndex((user) => user.id === loggedInUser.id);

    if (userIndex !== -1) {
      savedUsers[userIndex] = updatedAccountInfo;
    } else {
      savedUsers.push(updatedAccountInfo)
    }

		localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
      updateAccountBalance(editedAccountBalance);
			setError('');
      alert('Account information succesfully updated.');
		  navigate('/dashboard');
	};

  return (
    <div>
      <h3 className="manageAccountText">Manage your Account Information</h3>
      <form>
        <div className="manageAccountContainer"> 
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
              key="editedUsername"
              label="New Username"
              type="text"
              id="editedUsername"
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
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

      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  )
}

export default ManageAccounts;