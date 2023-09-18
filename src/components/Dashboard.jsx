import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import ExpensesTable from './ExpensesTable';

const Dashboard = (props) => {
	const { user } = props;
	const navigate = useNavigate();
// const data = [
// 	{ name: 'Expense Name', cost: cost, actions: ''}
// ]

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
				<h3 className="dashboard welcome">Welcome, {user.username}!</h3>
					<button className="dashboard manageAccountButton" type="button" onClick={handleManageAccountButton}>Manage Account</button> 
					<section className="dashboard accountSection">
						<p className="dasboard accountBalanceText">Account Balance:</p>
						<h4 className="dasboard accountBalance">{user.accountBalance}</h4>
						<p className="dashboard accountNumberText">Account Number:</p>
						<p className="dashboard accountNumber">{user.accountNumber}</p>
						<p className="dashboard cardType">{user.cardType}</p>
					</section>
					<section className="dashboard actionsSection">
						<button className="dashboard deposit" type="button" onClick={handleDepositButton}>Deposit</button>
						<button className="dashboard sendMoney" type="button" onClick={handleSendMoneyButton}>Send Money</button>
						<button className="dashboard withdraw" type="button" onClick={handleWithdrawButton}>Withdraw</button>
						<button className="dashboard transactions" type="button" onClick={handleTransactionsButton}>Transaction History</button>
					</section>
					<section className="dashboard expensesSection">
						<p className="dashboard expenses">Expenses</p>
						{/* <ExpensesTable data={data} />  not sure if tama bang i-table format or not */}
						<button className="dashboard addExpense" type="button">Add Expense</button>	
					</section>
					<Link to="/" className="logoutLinkInDashboard">Logout</Link>
		</div>
		</>
	);
}

export default Dashboard