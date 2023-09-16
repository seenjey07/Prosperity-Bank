import React from 'react';
import { Link } from 'react-router-dom';
// import ExpensesTable from './ExpensesTable';

const Dashboard = (props) => {
	const { user } = props;
// const data = [
// 	{ name: 'Expense Name', cost: cost, actions: ''}
// ]

	return ( //Aayusin na lang layout, will also add Manage account feature pag kaya pa
		<>
		<div>
				<h3 className="dashboard welcome">Welcome, {user.username}!</h3>
					<button className="dashboard manageAccount">Manage Account</button> 
					<section className="dashboard accountSection">
						<p className="dasboard accountBalanceText">Account Balance:</p>
						<p className="dasboard accountBalance">{user.accountBalance}</p>
						<p className="dashboard accountNumberText">Account Number:</p>
						<p className="dashboard accountNumber">{user.accountNumber}</p>
						<p className="dashboard cardType">{user.cardType}</p>
					</section>
					<section className="dashboard actionsSection">
						<button className="dashboard deposit">Deposit</button>
						<button className="dashboard sendMoney">Send Money</button>
						<button className="dashboard withdraw">Withdraw</button>
						<button className="dashboard transactions">Transaction History</button>
					</section>
					<section className="dashboard expensesSection">
						<p className="dashboard expenses">Expenses</p>
						{/* <ExpensesTable data={data} />  */}
						<button className="dashboard addExpense">Add Expense</button>	
					</section>
					<Link to="/" className="logoutLinkInDashboard">Logout</Link>
		</div>
		</>
	);
}

export default Dashboard