import React, { useState } from 'react';
import Input from "./Input";

const SignUpPage = () => {
	const [surname, setSurname] = useState ('');
	const [firstName, setFirstName] = useState ('');
	const [middleName, setMiddleName] = useState ('');
	const [birthday, setBirthday] = useState ('');
	const [username, setUsername] = useState ('');
	const [password, setPassword] = useState ('');
	const [confirmPassword, setConfirmPassword] = useState ('');
	const [mobileNumber, setMobileNumber] = useState ('');
	const [email, setEmail] = useState ('');

	const onSurnameChange = (e) => setSurname(e.target.value);
	const onFirstNameChange = (e) => setFirstName(e.target.value);
	const onMiddleNameChange = (e) => setMiddleName(e.target.value);
	const onBirthdayChange = (e) => setBirthday(e.target.value);
	const onUsernameChange = (e) => setUsername(e.target.value);
	const onPasswordChange = (e) => setPassword(e.target.value);
	const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
	const onMobileNumberChange = (e) => setMobileNumber(e.target.value);
	const onEmailChange = (e) => setEmail(e.target.value);

	const handleRegisterButton = (e) => {
		e.preventDefault();
		console.log('Thank you for registering your account, ', firstName);
	}

	return (
		<div>
			<h2>Online Banking Enrollment</h2>
				<h4>Please complete the registration form below:</h4>
				<form className="signUpContainer">
					
			<Input
				key="surname"
				label="Surname"
				type="text"
				id="surname"
				value={surname}
				onChange={onSurnameChange} /> <br />
		
			<Input
				key="firstName"
				label="First Name"
				type="text"
				id="firstName"
				value={firstName}
				onChange={onFirstNameChange} /> <br />
		
			<Input
				key="middleName"
				label="Middle Name"
				type="text"
				id="middleName"
				value={middleName}
				onChange={onMiddleNameChange} /> <br />
		
			<Input
				key="birthday"
				label="Date of Birth"
				type="text"
				id="birthday"
				value={birthday}
				onChange={onBirthdayChange} /> <br />


			<p className="registerBankingInfoText">Nominate yout Online Banking Information</p>

			<Input
				key="username"
				label="Username"
				type="text"
				id="username"
				value={username}
				onChange={onUsernameChange} /> <br />

			<Input
				key="password"
				label="Password"
				type="password"
				id="password"
				value={password}
				onChange={onPasswordChange} /> <br />

			<Input
				key="confirmPassword"
				label="Confirm Password"
				type="password"
				id="confirmPassword"
				value={confirmPassword}
				onChange={onConfirmPasswordChange} /> <br />

			<Input
				key="mobileNumber"
				label="Mobile Number"
				type="text"
				id="mobileNumber"
				value={mobileNumber}
				onChange={onMobileNumberChange} /> <br />

			<Input
				key="email"
				label="Email Address"
				type="email"
				id="email"
				value={email}
				onChange={onEmailChange} /> <br />

				<h5 className="beforeSubmitText">Before clicking Register, please review and ensure correct information in the enrollment details.</h5>
					<button type="submit" onClick={handleRegisterButton}>Register</button>
				</form>
		</div>
	);
}
  
  export default SignUpPage;