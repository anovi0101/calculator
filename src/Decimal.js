import React from "react";

export default function Decimal({ handleDecimal }) {
  function decPressed(decimal) {
    handleDecimal(decimal);
    }
  return (
    <>
      <button onClick={() => decPressed(".")}>.</button>
    </>
  );
}