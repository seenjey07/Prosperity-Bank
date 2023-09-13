import React from 'react';

const Dashboard = (props) => {
	const { user } = props;

	console.log('user prop in Dashboard:', user);

	return (
		<div>
			{user ? (
				<>
					<h3 className="dashboardWelcome">Welcome, {user.username}!</h3>
					<h2 className="dashboardTitle">My Dashboard</h2>
				</>
			) : (
				<p>Test text...</p>
			)}
		</div>
	);
}

export default Dashboard