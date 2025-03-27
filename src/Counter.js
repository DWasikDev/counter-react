import React, { useState, useEffect } from 'react';

const Counter = () => {
    const [count, setCount] = useState(() => {
        return Number(localStorage.getItem("count")) || 0;
    });
    const [history, setHistory] = useState(() => {
        return JSON.parse(localStorage.getItem("history")) || [];
    });
    const [isRunning, setIsRunning] = useState(false);
    const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode")) || false);

    useEffect(() => {
        localStorage.setItem("count", count);
    }, [count]);

    useEffect(() => {
        localStorage.setItem("history", JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setCount((prev) => prev+1);
            },1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const updateCount = (newCount) => {
        setHistory([...history,count]);
        setCount(newCount);
    };

return (
    <div style={{
        textAlign: "center", 
        marginTop: "50px",
        backgroundColor: darkMode ? "#222" : "#fff",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "20px"
        }}>
        <h1>Counter: {count}</h1>
        <button onClick={() => updateCount(count+1)}>Increase</button>
        <button onClick={() => updateCount(count-1)}>Decrease</button>
        <button onClick={() => updateCount(0)}>Reset</button>
    
    <h2>Change history:</h2>
    <ul>
        {history.map((value, index) => (
            <li key={index}>{value}</li>
        ))}
    </ul>

    <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Stop": "Run"} auto-increase
    </button>
   

    <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light" : "Dark"}
    </button>
    </div>
 );
};

export default Counter;