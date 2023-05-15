import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Calculator() {
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState("");
  const [data, setData] = useState({});

  const inputRef = useRef(null);

  //   const userEmail = localStorage.getItem("email");
  const userEmail = useSelector((state) => state.auth.userEmail);
  const sanatizedEmail = userEmail.replace(/[.@]/g, "");

  function handleButtonClick(value) {
    if (!isNaN(value) || value === ".") {
      setCurrentValue(currentValue + value);
    } else if (value === "C") {
      setCurrentValue("");
      setPreviousValue("");
      setOperator("");
    } else if (value === "+/-") {
      setCurrentValue(currentValue * -1);
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      value === "/"
    ) {
      setPreviousValue(currentValue);
      setCurrentValue("");
      setOperator(value);
    } else if (value === "=") {
      let result;

      handelSave(previousValue, operator, currentValue);

      switch (operator) {
        case "+":
          result = parseFloat(previousValue) + parseFloat(currentValue);
          break;
        case "-":
          result = parseFloat(previousValue) - parseFloat(currentValue);
          break;
        case "*":
          result = parseFloat(previousValue) * parseFloat(currentValue);
          break;
        case "/":
          result = parseFloat(previousValue) / parseFloat(currentValue);
          break;
        default:
          result = currentValue;
      }
      setCurrentValue(result);
      setPreviousValue("");
      setOperator("");
    }
  }

  const handelSave = (previousValue, operator, currentValue) => {
    console.log(`${previousValue} ${operator} ${currentValue}`);
    let result;
    switch (operator) {
      case "+":
        result = parseFloat(previousValue) + parseFloat(currentValue);
        break;
      case "-":
        result = parseFloat(previousValue) - parseFloat(currentValue);
        break;
      case "*":
        result = parseFloat(previousValue) * parseFloat(currentValue);
        break;
      case "/":
        result = parseFloat(previousValue) / parseFloat(currentValue);
        break;
      default:
        result = currentValue;
    }
    console.log(result);
    localStorage.setItem("previousValue", previousValue);
    localStorage.setItem("operator", operator);
    localStorage.setItem("currentValue", currentValue);
    localStorage.setItem("result", result);
  };

  const handleUpload = () => {
    const previousValue = localStorage.getItem("previousValue");
    const operator = localStorage.getItem("operator");
    const currentValue = localStorage.getItem("currentValue");
    const result = localStorage.getItem("result");
    console.log(previousValue, operator, currentValue, result);

    const data = {
      calculation: previousValue + operator + currentValue,
      result: result,
      name: inputRef.current.value,
    };
    console.log("------------------");
    // console.log(userEmail);
    console.log(userEmail);
    console.log(sanatizedEmail);
    console.log("------------------");

    axios
      .post(
        `https://roboshala-8a01a.firebaseio.com/${sanatizedEmail}.json`,
        data
      )
      .then((response) => {
        console.log(response);
        inputRef.current.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://roboshala-8a01a.firebaseio.com/${sanatizedEmail}.json`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [handelSave]);

  return (
    <div className=" row d-flex align-items-center justify-content-center container mx-auto">
      <div className=" col-md-6">
        <div>
          <div
            className="mb-3 mt-5"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              className="form-control"
              id="calculation-input"
              type="text"
              value={`${previousValue} ${operator} ${currentValue}`}
              readOnly
              style={{ width: "400px" }}
            />
          </div>
          <div className="mb-3">
            <button
              className="btn btn-danger me-2"
              onClick={() => handleButtonClick("C")}
            >
              AC
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick("+/-")}
            >
              +/-
            </button>
            {/* <button className="btn btn-secondary me-2" onClick={() => handleButtonClick('%')}>%</button> */}
            <button
              className="btn btn-secondary"
              onClick={() => handleButtonClick("/")}
            >
              /
            </button>
          </div>
          <div className="mb-3">
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick("7")}
            >
              7
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick("8")}
            >
              8
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick("9")}
            >
              9
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleButtonClick("*")}
            >
              *
            </button>
          </div>
          <div className="mb-3">
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick("4")}
            >
              4
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick("5")}
            >
              5
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick("6")}
            >
              6
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleButtonClick("-")}
            >
              -
            </button>
          </div>
          <div className="mb-3">
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick("1")}
            >
              1
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick("2")}
            >
              2
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick("3")}
            >
              3
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleButtonClick("+")}
            >
              +
            </button>
          </div>
          <div className="mb-3">
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick("0")}
            >
              0
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() => handleButtonClick(".")}
            >
              .
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleButtonClick("=")}
            >
              =
            </button>
          </div>
        </div>
        <div>
          <h3>Save calcution to database</h3>
          <input type="text" ref={inputRef} placeholder="Name of calculation" />
          <button
            className="btn btn-primary mx-3"
            onClick={() => handleUpload()}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="mt-5 col-md-6 d-flex align-items-center flex-column">
        <h4>Saved calculations of {userEmail}</h4>
        <table class="table table-bordered">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Calculation</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
    {data &&
      Object.keys(data).map((key, index) => (
        <tr key={key}>
          <td>{index + 1}</td>
          <td>{data[key].name}</td>
          <td>{data[key].calculation}</td>
          <td>{data[key].result}</td>
        </tr>
      ))}
  </tbody>
</table>

      </div>
    </div>
  );
}

export default Calculator;
