import * as React from "react";

export default function DigitOnlyInput({ inputRef, ...props }) {
  return (
    <input
      {...props}
      ref={inputRef}
      type="tel"
      onKeyDown={ev => {
        if (
          /\d/.test(ev.key) ||
          [8, 37, 38, 39, 40].some(k => k == ev.keyCode)
        ) {
          return true;
        } else {
          ev.preventDefault();
          return false;
        }
      }}
      value={props.value}
      onChange={ev => {
        props.onChange(ev.target.value);
      }}
    />
  );
}
