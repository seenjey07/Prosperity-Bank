import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from "./Input";

const SignUpPage = () => {
	const [surname, setSurname] = useState('');
	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [accountNumber, setAccountNumber] = useState('');
	const [accountBalance, setAccountBalance] = useState('');
	const [cardType, setCardType] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const onSurnameChange = (e) => setSurname(e.target.value);
	const onFirstNameChange = (e) => setFirstName(e.target.value);
	const onMiddleNameChange = (e) => setMiddleName(e.target.value);
	const onAccountNumberChange = (e) => setAccountNumber(e.target.value);
	const onAccountBalanceChange = (e) => setAccountBalance(e.target.value);
	const onCardTypeChange = (e) => setCardType(e.target.value);
	const onUsernameChange = (e) => setUsername(e.target.value);
	const onPasswordChange = (e) => setPassword(e.target.value);
	const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
	const onEmailChange = (e) => setEmail(e.target.value);

	const handleRegisterButton = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setPassword('');
			setConfirmPassword('');
			setError('Passwords do not match');
			return;
		}
	
		const registeredUser = {
			surname,
			firstName,
			middleName,
			accountNumber,
			accountBalance,
			cardType,
			username,
			password,
			email,
		};
	
		localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
		setError('');
		navigate('/login');

	};

	return (
		<div>
			<h2 className="onlineBankEnrollment">Online Banking Enrollment</h2>
			<h5 className="completeRegBelow">Please complete the registration form below:</h5>
						
				<form className="signUpContainer">
				
					<Input
						key="surname"
						label="Surname"
						type="text"
						id="surname"
						value={surname} 
						onChange={onSurnameChange}
						required 
					/> 
					<br />
				
					<Input
						key="firstName"
						label="First Name"
						type="text"
						id="firstName"
						value={firstName}
						onChange={onFirstNameChange}
						required
					/> 
					<br />
				
					<Input
						key="middleName"
						label="Middle Name"
						type="text"
						id="middleName"
						value={middleName}
						onChange={onMiddleNameChange}
						required
					/> 
					<br />

					<Input
						key="accountNumber"
						label="Account Number"
						type="number"
						id="accountNumber"
						value={accountNumber}
						onChange={onAccountNumberChange}
						required
					/>
					<br />

					<Input
						key="accountBalance"
						label="Account Balance"
						type="number"
						id="accountBalance"
						value={accountBalance}
						onChange={onAccountBalanceChange}
						required
					/>
					<br />

					<Input
						key="cardType"
						label="Select a card type"
						list="cardTypes"
						id="cardType"
						value={cardType}
						onChange={onCardTypeChange}
						required
					/>
					<datalist id="cardTypes">
						<option value="Visa" />
						<option value="MasterCard" />
						<option value="American Express" />
					</datalist>
					<br />
				
					<h5 className="setOnlineBankInfo">Nominate your Online Banking Information:</h5>

					<Input
						key="username"
						label="Username"
						type="text"
						id="username"
						value={username}
						onChange={onUsernameChange}
						required
					/>
					<br />

					<Input
						key="password"
						label="Password"
						type="password"
						id="password"
						value={password}
						onChange={onPasswordChange}
						required
					/>
					<br />

					<Input
						key="confirmPassword"
						label="Confirm Password"
						type="password"
						id="confirmPassword"
						value={confirmPassword}
						onChange={onConfirmPasswordChange}
						required
					/>
					<br />

					<Input
						key="email"
						label="Email Address"
						type="email"
						id="email"
						value={email}
						onChange={onEmailChange}
						required 
					/>
					<br /><br />

					{/* <div>
						<img className="cartoonWithCard" src="src/assets/ManWithCard.png" alt="cartoonWithCard" />
					</div> */}

					{error && <p className="passwordError">{error}</p>}

					<h5 className="beforeSubmitText">Before clicking 'Register', please review and ensure correct information in the enrollment details. <br />
						<button className="registerButton" type="submit" onClick={handleRegisterButton}>Register</button> 
					</h5>
				
				</form>
					<h6 className="haveAccount">Already have an account? <br /> <Link to="/login">Login</Link>!</h6>
		</div>
	);
}
  
  export default SignUpPage