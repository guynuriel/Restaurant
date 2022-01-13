import useInput from "../../hooks/useInput";
import "./CheckoutForm.css";
function CheckoutForm(props) {
  const {
    value: enteredName,
    isValid: nameInputIsInvalid,
    hasError: nameInputHasError,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameInputReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredClientID,
    isValid: clientIDInputIsInvalid,
    hasError: clientIDInputHasError,
    inputChangeHandler: clientIDInputChangeHandler,
    inputBlurHandler: clientIDInputBlurHandler,
    reset: clientIDInputReset,
  } = useInput((value) => value.trim().length === 9);
  const {
    value: enteredCardNumber,
    isValid: cardNumberInputIsInvalid,
    hasError: cardNumberInputHasError,
    inputChangeHandler: cardNumberInputChangeHandler,
    inputBlurHandler: cardNumberInputBlurHandler,
    reset: cardNumberInputReset,
  } = useInput((value) => value.trim().length === 16);
  const {
    value: enteredCVV,
    isValid: CVVInputIsInvalid,
    hasError: CVVInputHasError,
    inputChangeHandler: CVVInputChangeHandler,
    inputBlurHandler: CVVInputBlurHandler,
    reset: CVVInputReset,
  } = useInput((value) => value.trim().length === 3);
  const {
    value: enteredMonth,
    isValid: monthInputIsInvalid,
    hasError: monthInputHasError,
    inputChangeHandler: monthInputChangeHandler,
    inputBlurHandler: monthInputBlurHandler,
    reset: monthInputReset,
  } = useInput((value) => value !== "select" && value !== "");
  const {
    value: enteredYear,
    isValid: yearInputIsInvalid,
    hasError: yearInputHasError,
    inputChangeHandler: yearInputChangeHandler,
    inputBlurHandler: yearInputBlurHandler,
    reset: yearInputReset,
  } = useInput((value) => value !== "select" && value !== "");

  let formIsValid = false;
  if (
    nameInputIsInvalid &&
    clientIDInputIsInvalid &&
    cardNumberInputIsInvalid &&
    CVVInputIsInvalid &&
    monthInputIsInvalid &&
    yearInputIsInvalid
  ) {
    formIsValid = true;
  }

  const checkoutHandler = (event) => {
    event.preventDefault();
    let clientData = {
      name: enteredName,
      id: enteredClientID,
    };

    props.orderComplete(clientData);

    nameInputReset();
    clientIDInputReset();
    cardNumberInputReset();
    CVVInputReset();
    monthInputReset();
    yearInputReset();
  };
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  const clientIDInputClasses = clientIDInputHasError
    ? "form-control invalid"
    : "form-control";
  const cardNumberInputClasses = cardNumberInputHasError
    ? "form-control invalid"
    : "form-control";
  const CVVInputClasses = CVVInputHasError
    ? "form-control invalid"
    : "form-control";
  const monthInputClasses = monthInputHasError
    ? "form-control invalid"
    : "form-control";
  const yearInputClasses = yearInputHasError
    ? "form-control invalid"
    : "form-control";

  let thisYear = new Date().getFullYear() + "";
  thisYear = thisYear.substr(2, 3);
  thisYear = +thisYear;

  return (
    <form className="form" onSubmit={checkoutHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="fullName">Full Name</label>
        <input
          value={enteredName}
          id="fullName"
          type="text"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasError && <p className="error-text">Please enter name.</p>}
      </div>
      <div className={clientIDInputClasses}>
        <label htmlFor="clientID">ID</label>
        <input
          value={enteredClientID}
          id="clientID"
          type="text"
          onChange={clientIDInputChangeHandler}
          onBlur={clientIDInputBlurHandler}
        />
        {clientIDInputHasError && (
          <p className="error-text">Please enter valid ID (9 digits).</p>
        )}
      </div>
      <div className={cardNumberInputClasses}>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          value={enteredCardNumber}
          id="cardNumber"
          type="text"
          onChange={cardNumberInputChangeHandler}
          onBlur={cardNumberInputBlurHandler}
        />
        {cardNumberInputHasError && (
          <p className="error-text">
            Please enter valid card number (16 digits).
          </p>
        )}
      </div>
      <div className={CVVInputClasses}>
        <label htmlFor="CVV">CVV</label>
        <input
          value={enteredCVV}
          id="CVV"
          type="text"
          onChange={CVVInputChangeHandler}
          onBlur={CVVInputBlurHandler}
        />
        {CVVInputHasError && (
          <p className="error-text">Please enter valid CVV (3 digits).</p>
        )}
      </div>
      <div className={monthInputClasses}>
        <label htmlFor="month">Month</label>
        <select
          value={enteredMonth}
          id="month"
          type="text"
          onChange={monthInputChangeHandler}
          onBlur={monthInputBlurHandler}
        >
          <option value="select">Select</option>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        {monthInputHasError && (
          <p className="error-text">Please select month.</p>
        )}
      </div>
      <div className={yearInputClasses}>
        <label htmlFor="year">Year</label>
        <select
          value={enteredYear}
          id="year"
          type="text"
          onChange={yearInputChangeHandler}
          onBlur={yearInputBlurHandler}
        >
          <option value="select">Select</option>
          <option value={thisYear}>{thisYear}</option>
          <option value={thisYear + 1}>{thisYear + 1}</option>
          <option value={thisYear + 2}>{thisYear + 2}</option>
          <option value={thisYear + 3}>{thisYear + 3}</option>
          <option value={thisYear + 4}>{thisYear + 4}</option>
        </select>
        {yearInputHasError && <p className="error-text">Please select year.</p>}
      </div>
      <div className="actions">
        <button className="button--alt" onClick={props.hideCart}>
          Close
        </button>
        <button disabled={!formIsValid} type="submit" className="button">
          Order
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
