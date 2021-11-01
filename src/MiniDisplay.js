import React from "react";

export default function MiniDisplay(props) {
  return (
    <>
      <h2>{props.showMiniNum.length ? props.showMiniNum : ""}</h2>
    </>
  );
}
