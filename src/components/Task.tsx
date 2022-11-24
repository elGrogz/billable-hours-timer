import { collection, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TaskType } from "../types/TaskType";
import { db } from "../utils/firebase";

type Props = {
  handleRemoveTask: () => void;
  data: TaskType;
};

const Task = (props: any) => {
  const [taskName, setTaskName] = useState<string>(props.data.name);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: any = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleRemoveTask = async (event: any) => {
    event.preventDefault();
    await deleteDoc(doc(db, "tasks", props.data.id));
  };

  const handleStartStopwatch = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseStopwatch = () => {
    setIsPaused(true);
    setIsActive(false);
  };

  const handleTimerReset = () => {
    setTime(0);
  };

  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          flexDirection: "row",
          marginBlock: 2,
          marginLeft: 5,
          padding: 10,
          border: "5px solid",
          borderRadius: "5px",
          backgroundColor: "white",
          gap: 5,
        }}
      >
        <div style={{ width: 200 }}>{props.data.name}</div>
        <div className="stopwatch">
          <div className="numbers">
            <span>{("0" + Math.floor((time / 86400000) % 24)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
          </div>
        </div>
        <button onClick={(event) => handleRemoveTask(event)}>
          Remove task
        </button>
        <button onClick={handleStartStopwatch}>Start Timer</button>
        <button onClick={handlePauseStopwatch}>Pause Timer</button>
        <button onClick={handleTimerReset}>Reset Timer</button>
      </div>
    </div>
  );
};

export default Task;
