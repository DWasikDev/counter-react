import React, { useState, useEffect } from 'react';
import "./App.css";

const Counter = () => {
    const [count, setCount] = useState(() => {
        return Number(localStorage.getItem("count")) || 0;
    });
    const [history, setHistory] = useState(() => {
        return JSON.parse(localStorage.getItem("history")) || [];
    });
    const [isRunning, setIsRunning] = useState(false);
    const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode")) || false);
    const [inputValue, setInputValue] = useState("");
    const [animate, setAnimate] = useState(false);

    const minValue = 0;
    const maxValue = 100;
    const sound = new Audio("/soundCounter.mp3");

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
        if(newCount >= minValue && newCount <= maxValue)
        {
            sound.play();
            setHistory([...history,count]);
            setCount(newCount);

            setAnimate(false);  // 🔹 Najpierw usuwamy klasę
            setTimeout(() => {
                setCount(newCount);
                setAnimate(true); // 🔹 Po krótkim czasie dodajemy ją ponownie
            }, 10);
        }
    };

    const resetCounter = () => {
        setCount(0);
        setHistory([]);
        localStorage.removeItem("count");
        localStorage.removeItem("history");
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
         <h1 className={animate ? "pulse" : ""}>Counter: {count}</h1>
        <button onClick={() => updateCount(count+1)}>Increase</button>
        <button onClick={() => updateCount(count-1)}>Decrease</button>
        <button onClick={resetCounter}>Reset</button>
        <br></br><br></br>
        <button onClick={() => setCount(Number(inputValue))}>
            Set value
        </button>
        <input
            type="number"
            min="0"
            max="100"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />

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

    <button className="test">Test</button>
    </div>
 );
};

export default Counter;