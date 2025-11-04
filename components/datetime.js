import { useState, useEffect } from 'react'

export function timeString(dateObj) {
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    let formattedTimeStr = '';
    if (hours === 0) {
        formattedTimeStr = `${seconds}s`;
        if (minutes !== 0) {
            formattedTimeStr = minutes + 'm ' + formattedTimeStr;
        }
    } else {
        formattedTimeStr = [hours, minutes, seconds]
            .map(unit => String(unit).padStart(2, '0'))
            .join(':');
    }
    return formattedTimeStr;
}

// timer that automaticaly starts from zero on render and can return its value in (?)ms
export function Timer({ onTimerTick }) {
    // get the current time and set the timer to 0
    const [startTime] = useState(new Date());
    const [elapsedTime, setElapsedTime] = useState(new Date(0));

    useEffect(() => {
        // Set up an interval to update the time every second
        const intervalId = setInterval(() => {
            let now = new Date();
            let elapsed = new Date(now - startTime);
            setElapsedTime(elapsed);
            onTimerTick(elapsed);
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    return (
        <div>
            <h1>Elapsed Time:</h1>
            <p>{timeString(elapsedTime)}</p>
        </div>
    );
}