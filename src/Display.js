import React from "react";
import {Textfit} from "react-textfit";

export default function Display(props) {
  return (
    <div className="display">
      <Textfit mode="single" max={45} className="display-numbers">{props.showNum.length ? props.showNum : "0"}</Textfit>
    </div>
  );
}