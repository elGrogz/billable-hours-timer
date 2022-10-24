import React, { useState } from "react";

const Task = (props: any) => {
  const startTimer = () => {};

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>{props.name}</div>
      <div>{props.time}</div>
      <button onClick={props.handleRemoveTask}>Remove task</button>
      <button onClick={() => startTimer()}>Start Timer</button>
    </div>
  );
};

export default Task;
