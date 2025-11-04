import { useState, useRef } from "react";
import { Timer, timeString } from "@/components/datetime"
import Link from 'next/link';
import Layout from '@/components/layout'

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
    const [currentContraction, setCurrentContraction] = useState(null);
    const [contractionHistory, setContractionHistory] = useState([]);

    function handleStartStop({ startTime = null, duration = null, intensity = null }) {
        if (currentContraction) {
            const newCtxHist = [...contractionHistory];
            newCtxHist.push({
                startTime: currentContraction.startTime,
                duration: duration,
                intensity: intensity
            });
            setCurrentContraction(null);
            setContractionHistory(newCtxHist);
        } else {
            setCurrentContraction({ startTime: startTime });
        }
    }

    return (
        <Layout title="Contraction Timer">
            <StartStopContainer class='' inContraction={currentContraction} handleStartStop={handleStartStop} />
            <ContractionList ctxList={contractionHistory} />
        </Layout>
    );
}

function StartStopContainer({ inContraction, handleStartStop }) {
    if (inContraction) {
        return <NewContractionUI handleStopCtx={handleStartStop} />;
    } else {
        return <StartButton handleStartCtx={handleStartStop} />;
    }
}

function NewContractionUI({ handleStopCtx }) {
    const [duration, setDuration] = useState(0);
    const intensityName = "intensity";
    const intensitySlider = useRef(null);
    const intensityMin = 1;
    const intensityMax = 10;

    function onTimerTick(elapsed) {
        setDuration(elapsed);
    }

    return (
        <div>
            <Timer onTimerTick={onTimerTick} />
            <label for={intensityName}>Intensity</label>
            <input
                ref={intensitySlider}
                id={intensityName}
                name={intensityName}
                min={intensityMin}
                max={intensityMax}
                type="range" />
            <button onClick={() => handleStopCtx({
                duration: duration,
                intensity: intensitySlider.current.value
            })}>Stop</button >
        </div>
    ); // we are ending the contraction, no need to pass a start time.
}

function StartButton({ handleStartCtx }) {
    return (
        <button onClick={() => handleStartCtx({
            startTime: new Date()
        })}>Start</button>
    ); // pass only the start time.
}

function ContractionList({ ctxList }) {
    let interval = null;
    return (
        <ul>
            {ctxList.map((ctx, i, ctxHist) => {
                if (i > 0) {
                    const prevCtx = ctxHist[i - 1];
                    let cadence = new Date(ctx.startTime - prevCtx.startTime);
                    let rest = new Date(cadence - prevCtx.duration);
                    interval = (
                        <li>
                            <p>Contraction Cadence: {timeString(cadence)}</p>
                            <p>Rest Time: {timeString(rest)}</p>
                        </li>
                    );
                }

                return (
                    <>
                        {interval}
                        <li>Contraction
                            <p>Start Time: {ctx.startTime.toLocaleTimeString()}</p>
                            <p>Duration: {timeString(ctx.duration)}</p>
                            <p>Intensity: {ctx.intensity}</p>
                        </li>
                    </>
                );
            })}
        </ul >
    );
}