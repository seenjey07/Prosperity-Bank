import React from 'react';

const Dashboard = (props) => {
	const { user } = props;

	return (
		<>
		<div>
			<h3 className="dashboard welcome">Welcome, {user.username}!</h3>
			<h2 className="dashboard title">My Dashboard</h2>
			<p className="dashboard savings">Savings</p>
			<p className="dashboard expenses">Expenses</p>
			<p className="dashboard deposit">Deposit</p>
			<p className="dashboard withdraw">Withdraw</p>
		</div>
		</>
	);
}

export default Dashboard