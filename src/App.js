import React, { useState , useRef} from "react";
import "./styles.css";
import Display from "./Display.js";
import Digit from "./Digit.js";
import Operation from "./Operation.js";
import Decimal from "./Decimal.js";
import TitleBar from "./TitleBar";

let equals = false;
const numCache = [];
export default function App() {
  const [result, setResult] = useState([]);
  const [showNum, setShowNum] = useState("0");

  function displayNum(number) {
    if (equals) {
      setShowNum([number]);
      equals = false;
    } else {
      setShowNum([...showNum, number]);
    }
  }

  function reset() {
    setShowNum([]);
    setResult([]);
    numCache.splice(0, numCache.length);
  }

  function handleMiniNum(arr) {
    setResult([arr.join("")]);
  }

  function handleDecimal(decimal) {
    if (showNum.some((e) => e === ".")) {
      console.log("HAS DECIMAL");
    } else {
      setShowNum([...showNum, decimal]);
    }
  }

  function handleOperation(operation) {
    // Calls reset if C is pressed
    if (operation === "C") {
      return reset();
    }
    // Check if has values to calculate
    if (operation === "=" && numCache.length < 2) {
      return;
    }

    if (operation === "+/-") {
      if (showNum[0] > 0) {
        setShowNum(["-", ...showNum]);
      } else {
        const cloneShow = showNum;
        cloneShow.shift();
        setShowNum([...cloneShow]);
      }
      return;
    }

    console.log("New operation click", operation);
    if (showNum.length > 0) {
      numCache.push(showNum.join(""), operation);
      console.log(numCache);
      setShowNum([]);
      handleMiniNum(numCache);
      if (operation === "=" && numCache.length > 2) {    
        processOperations("*");
        processOperations("÷");
        processOperations("+");
        processOperations("-");
        numCache.splice(0, numCache.length);
        equals = true;
      }
    }
  }

  function processOperations(operation) {
    let afterOperation = numCache;
    let operationCount = numCache.filter((x) => x === operation).length;
    if (operationCount > 0) {
      for (let i = 0; i < operationCount; i++) {
        let index = numCache.findIndex((x) => x === operation);
        let result = calculate(
          numCache[index - 1],
          numCache[index],
          numCache[index + 1]
        );
        afterOperation.splice(index - 1, 3, result);
      }
    }
    setShowNum([afterOperation[0]]);
  }

  function calculate(num1, operation, num2) {
    if (operation === "*") {
      return parseFloat(num1) * parseFloat(num2);
    } else if (operation === "÷") {
      return parseFloat(num1) / parseFloat(num2);
    } else if (operation === "+") {
      return parseFloat(num1) + parseFloat(num2);
    } else if (operation === "-") {
      return parseFloat(num1) - parseFloat(num2);
    }
  }

  return (
      <div className="container">
        <TitleBar />
        <div className="top" >
              <Display showNum={showNum} />
        </div>

        <div className="bottom">
          <div className="row">
              <Operation op={"C"} handleOperation={handleOperation}/>
              <Operation op={"+/-"} handleOperation={handleOperation} />
              <Digit num={"%"} displayNum={displayNum} />
              <Operation op={"÷"} handleOperation={handleOperation} />
          </div>

          <div className="row">
              <Digit num={7} displayNum={displayNum} />
              <Digit num={8} displayNum={displayNum} />
              <Digit num={9} displayNum={displayNum} />
              <Operation op={"*"} handleOperation={handleOperation} />
          </div>

          <div className="row">
              <Digit num={4} displayNum={displayNum} />
              <Digit num={5} displayNum={displayNum} />
              <Digit num={6} displayNum={displayNum} />
              <Operation op={"-"} handleOperation={handleOperation} />
          </div>

          <div className="row">
              <Digit num={1} displayNum={displayNum} />
              <Digit num={2} displayNum={displayNum} />
              <Digit num={3} displayNum={displayNum} />
              <Operation op={"+"} handleOperation={handleOperation} />
          </div>

          <div className="last-row">
              <Digit num={0} displayNum={displayNum} />
              <Decimal handleDecimal={handleDecimal} />
              <Operation op={"="} handleOperation={handleOperation} />
          </div>
        </div>
      </div>
  );
}