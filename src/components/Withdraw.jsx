import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import GenerateTransactionId from "./GenerateTransactionId";

const Withdraw = (props) => {
  const { user, withdrawHistory, setWithdrawHistory, savedUsers } = props;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [withdrawOption, setWithdrawOption] = useState("");
  const [createRequest, setCreateRequest] = useState("");
  const [withdrawInput, setWithdrawInput] = useState("");
  const [nominatedPin, setNominatedPin] = useState("");

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers"));
    if (!savedUsers) {
      setWithdrawInput("");
    }
  }, []);

  useEffect(() => {
    setError("");
  }, [withdrawOption, createRequest]);

  const clearError = () => {
    setError("");
  };

  const onWithdrawOptionChange = (e) => setWithdrawOption(e.target.value);
  const onCreateRequestChange = (e) => setCreateRequest(e.target.value);
  const onWithdrawInputChange = (e) => setWithdrawInput(e.target.value);
  const onNominatedPinChange = (e) => setNominatedPin(e.target.value);

  const handleWithdrawSubmitButton = (e) => {
    e.preventDefault();

    if (!withdrawInput || !nominatedPin) {
      setError("Please fill out all the fields");
      return;
    }

    const withdrawAmount = parseFloat(withdrawInput);

    if (isNaN(withdrawAmount) || withdrawAmount > user.accountBalance) {
      setError("Invalid deposit amount");
      return;
    }

    setWithdrawHistory([
      ...withdrawHistory,
      {
        Transaction: withdrawOption,
        "Transaction ID": GenerateTransactionId(7),
        Amount: withdrawAmount,
        Status: "Pending",
        Date: new Date(),
      },
    ]);

    localStorage.setItem(
      "withdrawHistory",
      JSON.stringify([
        ...withdrawHistory,
        {
          Transaction: withdrawOption,
          "Transaction ID": GenerateTransactionId(7),
          Amount: withdrawAmount,
          Date: new Date(),
          Status: "Pending",
        },
      ])
    );

    setWithdrawOption("");
    setCreateRequest("");
    setWithdrawInput("");
    setNominatedPin("");
    clearError();

    setTimeout(() => {
      alert(
        "Proceed to the nearest ATM for your cardless withdrawal transaction."
      );
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div>
      <h3 className="withdrawText">Online Withdrawal</h3>
      <h4 className="currentBalance">
        Your current balance: ₱ {user.accountBalance}
      </h4>

      <p className="withdrawHeader">
        Harness the power of online banking and use Prosperity Bank Online for
        your cardless withdrawals.
      </p>

      <div className="withdrawContainer">
        <div className="withdrawInstructionsContainer">
          <p className="withdrawMainInstruction">Follow these easy steps:</p>
          <p className="withdrawInstructions">
            1. Select “Cardless Withdrawal” and then “Create New Request” on the
            drop-downs.
          </p>
          <p className="withdrawInstructions">
            2. Enter the amount to be withdrawn and nominate your 4-digit PIN.
          </p>
          <p className="withdrawInstructions">
            3. Review that the details are correct, then click “Submit”.
          </p>
          <p className="withdrawInstructions">
            4. Proceed to any ATM, choose "Cardless Withdrawal" and enter your
            4-digit PIN.
          </p>
          <p className="withdrawInstructions">
            5. Enter the amount to be withdrawn then press “Confirm”.
          </p>
          <p className="withdrawInstructionsNote">
            Note: Unclaimed withdrawal/s will be void after 1 hour.
          </p>
        </div>

        <div className="withdrawContainer">
          <select
            key="withdrawOption"
            id="withdrawOption"
            value={withdrawOption}
            onChange={onWithdrawOptionChange}
          >
            <option value="">Select</option>
            <option value="CardlessWithdrawal">Cardless Withdrawal</option>
          </select>
          <br />

          <select
            key="createRequest"
            id="createRequest"
            value={createRequest}
            onChange={onCreateRequestChange}
          >
            <option value="">Select</option>
            <option value="CreateNewRequest">Create New Request</option>
          </select>
          <br />

          <form>
            <Input
              key="withdrawInput"
              label="Enter amount to withdraw:"
              type="text"
              id="withdrawInput"
              value={withdrawInput}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/\D/g, "");
                if (inputValue.length <= 18) {
                  setWithdrawInput(inputValue);
                  clearError();
                }
              }}
            />
            <br />

            <Input
              key="nominatedPin"
              label="Nominate a 4-digit PIN:"
              type="text"
              id="nominatedPin"
              value={nominatedPin}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/\D/g, "");
                if (inputValue.length <= 4) {
                  setNominatedPin(inputValue);
                  clearError();
                }
              }}
            />
            <br />

            {error && <p className="dashboardTransactionsError">{error}</p>}

            <h5 className="beforeDashboardTransactionsSubmitText">
              Before clicking 'Withdraw', please review and ensure correct
              information.
            </h5>
            <button
              className="dashboardTransactionsSubmitButton"
              type="submit"
              onClick={handleWithdrawSubmitButton}
            >
              Withdraw
            </button>
          </form>
        </div>
      </div>

      <button
        className="backToDashboard"
        onClick={() => navigate("/dashboard")}
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default Withdraw;
