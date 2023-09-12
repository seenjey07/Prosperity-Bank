import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from "./Input";

const LoginPage = () => {
	const [username, setUsername] = useState ('');
	const [password, setPassword] = useState ('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const onUsernameChange = (e) => setUsername(e.target.value);
	const onPasswordChange = (e) => setPassword(e.target.value);

	const handleLogin = (e) => {
		e.preventDefault();

		const savedUserInfo = JSON.parse(localStorage.getItem('savedUserInfo'));
		const setLoggedInUser = savedUserInfo;

		if (savedUserInfo && username === savedUserInfo.username && password === savedUserInfo.password) {
			setError(null);
				setLoggedInUser(savedUserInfo);
				console.log('Redirect to Dashboard');
				navigate('/dashboard');
		} else {
				setUsername('');
				setPassword('');
				setError('Invalid username or password. Please try again.');
		}
	};

	return (
		<div>
			<form className="loginForm" onSubmit={handleLogin}>
				<Input
					key="username"
					label="Username"
					type="text"
					id="username"
					value={username}
					onChange={onUsernameChange}
					required
				/> 
				<br /><br />

				<Input
					key="password"
					label="Password"
					type="password"
					id="password"
					value={password}
					onChange={onPasswordChange}
					required
				/> 
				<br /><br />

				{error && <p className="error">{error}</p>}

				<button className="loginButton" type="submit">Login</button>
			</form>

				<h5 className="loginLink">Don't have an account yet? <br /><Link to="/signup">Sign up</Link>!</h5>
		</div>
	);
}
  
  export default LoginPage