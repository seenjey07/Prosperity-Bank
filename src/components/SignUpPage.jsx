import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

const SignUpPage = () => {
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [cardType, setCardType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
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

  const clearError = () => {
    setError("");
  };

  const handleRegisterButton = (e) => {
    e.preventDefault();

    if (
      surname.trim() === "" ||
      firstName.trim() === "" ||
      middleName.trim() === "" ||
      accountNumber.trim() === "" ||
      accountBalance.trim() === "" ||
      cardType.trim() === "" ||
      username.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      email.trim() === ""
    ) {
      setError("Please fill out all the blank fields.");
      return;
    }

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setError("Passwords do not match");
      return;
    }

    const newUser = {
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

    let savedUsers = JSON.parse(localStorage.getItem("savedUsers"));

    if (!savedUsers) {
      savedUsers = [];
    }

    if (savedUsers.some((user) => user.username === newUser.username)) {
      setError(
        "Username is already taken. Please choose a different username."
      );
      return;
    }

    const updatedUsers = [...savedUsers, newUser];

    localStorage.setItem("savedUsers", JSON.stringify(updatedUsers));
    setError("");

    setTimeout(() => {
      alert("Account succesfully created.");
      navigate("/login");
    }, 1000);
  };

  return (
    <div>
      <h2 className="onlineBankEnrollment">Online Banking Enrollment</h2>
      <h5 className="completeRegBelow">
        Please complete the registration form below:
      </h5>

      <form className="signUpContainer">
        <Input
          key="surname"
          label="Surname"
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
            clearError();
          }}
        />
        <br />

        <Input
          key="firstName"
          label="First Name"
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            clearError();
          }}
        />
        <br />

        <Input
          key="middleName"
          label="Middle Name"
          type="text"
          id="middleName"
          value={middleName}
          onChange={(e) => {
            setMiddleName(e.target.value);
            clearError();
          }}
        />
        <br />

        <Input
          key="accountNumber"
          label="Account Number"
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => {
            const inputValue = e.target.value.replace(/\D/g, "");
            if (inputValue.length <= 18) {
              setAccountNumber(inputValue);
              clearError();
            }
          }}
        />
        <br />

        <Input
          key="accountBalance"
          label="Account Balance"
          type="text"
          id="accountBalance"
          value={accountBalance}
          onChange={(e) => {
            const inputValue = e.target.value.replace(/\D/g, "");
            if (inputValue.length <= 18) {
              setAccountBalance(inputValue);
              clearError();
            }
          }}
        />
        <br />

        <Input
          key="cardType"
          label="Select a card type"
          list="cardTypes"
          id="cardType"
          value={cardType}
          onChange={(e) => {
            setCardType(e.target.value);
            clearError();
          }}
        />
        <datalist id="cardTypes">
          <option value="Visa" />
          <option value="MasterCard" />
          <option value="American Express" />
          <option value="Discover" />
        </datalist>
        <br />

        <h5 className="setOnlineBankInfo">
          Nominate your Online Banking Information:
        </h5>

        <Input
          key="username"
          label="Username"
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            clearError();
          }}
        />
        <br />

        <Input
          key="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
        />
        <br />

        <Input
          key="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearError();
          }}
        />
        <br />

        <Input
          key="email"
          label="Email Address"
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
        />
        <br />
        <br />

        <div>
          <img
            className="cartoonWithCard"
            src="src/assets/ManWithCard.png"
            alt="cartoonWithCard"
          />
        </div>

        {error && <p className="registrationError">{error}</p>}

        <h5 className="beforeSubmitText">
          Before clicking 'Register', please review and ensure correct
          information in the enrollment details. <br />
          <br />
          <button
            className="registerButton"
            type="submit"
            onClick={handleRegisterButton}
          >
            Register
          </button>
        </h5>
      </form>

      <h6 className="haveAccount">
        Already have an account? <br /> <Link to="/login">Login</Link>!
      </h6>
    </div>
  );
};

export default SignUpPage;
