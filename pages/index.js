import { useState } from "react";

/*
State consists of:
user hits Start to start contraction. Then we are "in" a contraction.
-The start button turns to a Stop button,
-a slider appears below to rate the intensity 1-10.
-a timer appears to time how long the current contraction lasts.

User hits stop, we are "out" of a contraction.
The list of previous contractions populates. Each item:
-the time it started
-the duration
-The intensity

Alternating between each contraction in the list is an interval:
-The time since the start of the last contraction (cadence)
-(smaller font) the "rest time," or the time BETWEEN contractions


*/

export default function ContractionTimer() {
  const [inContraction, setInContraction] = useState(false);
  const [contractionHistory, setContractionHistory] = useState([]);
  const [testInc, setTestInc] = useState(0);

  function handleStartStop(startTime = null, duration = null, intensity = null) {
    if (inContraction) {
      setInContraction(false);
      setTestInc(testInc + 1);

      const newCtxHist = [...contractionHistory];
      newCtxHist.push({
        startTime: startTime,
        duration: duration,
        intensity: intensity
      });
      setContractionHistory(newCtxHist);
    } else {
      setInContraction(true);
    }
  }

  return (
    <div>
      <StartStopContainer inContraction={inContraction} onButtonPress={handleStartStop} />
      <ContractionList ctxList={contractionHistory} />
    </div>
  );
}

function StartStopContainer({ inContraction, onButtonPress }) {
  if (inContraction) {
    return <NewContractionUI handleStopCtx={onButtonPress} />;
  } else {
    return <StartButton handleStartCtx={onButtonPress} />;
  }
}

function NewContractionUI({ handleStopCtx }) {
  const startTime = '12:37pm';
  const duration = 10;
  const intensity = 3;
  return <button onClick={() => handleStopCtx(startTime, duration, intensity)}>Stop</button>
}

function StartButton({ handleStartCtx }) {
  return <button onClick={handleStartCtx}>Start</button>
}

function ContractionList({ ctxList }) {
  let interval = null;
  return (
    <ul>
      {ctxList.map((ctx, i, ctxHist) => {
        if (i > 0) {
          const prevCtx = ctxHist[i - 1];
          interval =
            <li>
              <p>Contraction Cadence: {ctx.startTime - prevCtx.startTime}</p>
              <p>Rest Time: {ctx.startTime - (prevCtx.startTime + prevCtx.duration)}</p>
            </li>;
        }
        return (
          <>
            {interval}
            <li> Contraction
              <ul>
                <li>Start Time: {ctx.startTime}</li>
                <li>Duration: {ctx.duration}</li>
                <li>Intensity: {ctx.intensity}</li>
              </ul>
            </li>
          </>
        );
      })}
    </ul >
  );
}