import React, { useState } from "react";
import Decimal from "./Decimal.js";

export default function Digit({ num, displayNum }) {
  function numPressed(number) {
    displayNum(number);
  }
  return (
    <>
      <button className="number-button" onClick={() => numPressed(num)}>{num}</button>
    </>
  );
}
