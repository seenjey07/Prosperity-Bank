import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Dashboard = (props) => {
	const { user } = props;
	const navigate = useNavigate();

	const handleManageAccountButton = (e) => { 
		navigate('/manage-account');
	}

	const handleDepositButton = (e) => {
		navigate('/deposit');
	}

	const handleSendMoneyButton = (e) => {
		navigate('/send-money');
	}

	const handleWithdrawButton = (e) => {
		navigate('/withdraw');
	}

	const handleTransactionsButton = (e) => {
		navigate('/transactions-history');
	}

	return (
		<>
		<div>
				<h3 className="welcome">Welcome, {user.username}!</h3>
					<button className="manageAccountButton" type="button" onClick={handleManageAccountButton}>Manage Account</button> 
					<section className="accountActionsSection">
						<p className="accountBalanceText">Account Balance:</p>
						<h4 className="accountBalance">₱ {user.accountBalance}</h4>
						<p className="accountNumberText">Account Number:</p>
						<p className="accountNumber">{user.accountNumber}</p>
						<p className="cardType">{user.cardType}</p>

						<button className="deposit" type="button" onClick={handleDepositButton}>Deposit</button>
						<button className="sendMoney" type="button" onClick={handleSendMoneyButton}>Send Money</button>
						<button className="withdraw" type="button" onClick={handleWithdrawButton}>Withdraw</button>
						<button className="transactions" type="button" onClick={handleTransactionsButton}>Transactions</button>
					</section>
					<section className="expensesSection">
						<p className="expenses">Expenses</p>
						{/* Insert dito yung sa transaction history container nd content*/}
						<button className="addExpense" type="button">Add Expense</button>	
					</section>
					<Link to="/" className="logoutLinkInDashboard">Logout</Link>
		</div>
		</>
	);
}

export default Dashboard