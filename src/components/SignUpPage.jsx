import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from "./Input";

const SignUpPage = () => {
	const [surname, setSurname] = useState('');
	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [birthday, setBirthday] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [mobileNumber, setMobileNumber] = useState ('');
	const [email, setEmail] = useState('');

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
						key="birthday"
						label="Date of Birth"
						type="date"
						id="birthday"
						value={birthday}
						onChange={onBirthdayChange}
						required
					/>
					<br /><br />

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
						key="mobileNumber"
						label="Mobile Number"
						type="text"
						id="mobileNumber"
						value={mobileNumber}
						onChange={onMobileNumberChange}
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

					<h5 className="beforeSubmitText">Before clicking 'Register', please review and ensure correct information in the enrollment details. <br /><button className="registerButton" type="submit" onClick={handleRegisterButton}>Register</button> </h5>
				
				</form>
					<h6 className="haveAccount">Already have an account? <br /> <Link to="/login">Login</Link>!</h6>
		</div>
	);
}
  
  export default SignUpPage