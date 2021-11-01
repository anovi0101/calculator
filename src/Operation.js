import React, { useState } from "react";
import Decimal from "./Decimal.js";
import Digit from "./Digit.js";

export default function Operation({ op, handleOperation }) {
  function opPressed(operation) {
    handleOperation(operation);
  }
  return (
    <>
      <button onClick={() => opPressed(op)}>
        {op}
      </button>
    </>
  );
}
