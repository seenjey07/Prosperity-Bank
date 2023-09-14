import { useState } from 'react';

const ManageAccounts = (props) => {
  const [editedUsername, setEditedUsername] = useState(loggedInUser.username);
  const [editedPassword, setEditedPassword] = useState(loggedInUser.password);
  const [editedEmail, setEditedEmail] = useState(loggedInUser.email);
  const [editedAccountBalance, setEditedAccountBalance] = useState(loggedInUser.accountBalance);

    const handleUsernameChange = (e) => {
      setEditedUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setEditedPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
      setEditedEmail(e.target.value);
    };

    const handleAccountBalanceChange = (e) => {
      setEditedAccountBalance(e.target.value);
    };

}

export default ManageAccounts;

//Saka na muna to ulit
