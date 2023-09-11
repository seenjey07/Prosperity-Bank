import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from "./Input";


const LoginPage = () => {
	const [username, setUsername] = useState ('');
	const [password, setPassword] = useState ('');

	const onUsernameChange = (e) => setUsername(e.target.value)
	const onPasswordChange = (e) => setPassword(e.target.value)

	const handleSubmitButton = (e) => {
		e.preventDefault();
		console.log('Logging in ', username);
	}

	return (
		<>
		<form className="loginForm">

			<Input
				key="username"
				label="Username"
				type="text"
				id="username"
				value={username}
				onChange={onUsernameChange} /> <br /><br />

			<Input
				key="password"
				label="Password"
				type="password"
				id="password"
				value={password}
				onChange={onPasswordChange} /> <br /><br />

			<button className="signInButton" type="submit" onClick={handleSubmitButton}>Sign in</button>
		</form>
		
		<p className="signUp">Don't have an account yet? <br /> <Link to="./components/SignUpPage">Sign up</Link>!</p>
		</>

	);
}
  
  export default LoginPage