import React, { useState, useEffect } from "react";
import "../css/WaterTracker.css";

const WaterTracker = () => {
  const goal = 2000;

  // 🔑 Unique key for today's date
  const getTodayKey = () => {
    const d = new Date();
    return `waterIntake_${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  };

  // 🔢 States
  const [intake, setIntake] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);

  // 🧠 Load today's saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(getTodayKey());
    if (saved) {
      setIntake(parseInt(saved));
    }

    updateHistory(); // Load history initially
  }, []);

  // 🧠 Save today's data and update history on intake change
  useEffect(() => {
    localStorage.setItem(getTodayKey(), intake.toString());
    updateHistory();
  }, [intake]);

  // 🧾 Update history list
  const updateHistory = () => {
    const newHistory = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("waterIntake_")) {
        const value = localStorage.getItem(key);
        newHistory.push({ date: key.replace("waterIntake_", ""), value });
      }
    }
    newHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
    setHistory(newHistory);
  };

  // 💧 Add water amount
  const handleAdd = (amount) => {
    if (intake >= goal) {
      alert("🎉 You have already reached your daily goal!");
      return;
    }

    const newIntake = Math.min(goal, intake + amount);

    if (newIntake >= goal && intake < goal) {
      alert("🎉 Congratulations! You’ve reached your goal!");
    }

    setIntake(newIntake);
  };

  // ➕ Manual water input
  const handleManualAdd = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      handleAdd(value);
      setInputValue("");
    }
  };

  // 📊 Progress bar value
  const progress = (intake / goal) * 100;

  return (
    <div className="tracker-card">
      <div className="header">
        <h2>💧 Water Tracker</h2>
      </div>

      <p className="goal-text">Goal: {goal} ml</p>
      <h3 className="progress-text">
        Today: {intake} / {goal} ml ({progress.toFixed(1)}%)
      </h3>

      <div className="progress-bar">
        <div className="filled" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="summary-section">
        <h4>Today vs Daily Goal</h4>
        <p><strong>Consumed:</strong> {intake} ml</p>
        <p><strong>Goal:</strong> {goal} ml</p>
        <p><strong>Remaining:</strong> {goal - intake} ml</p>
        <p><strong>Completed:</strong> {progress.toFixed(1)}%</p>
      </div>

      <div className="input-section">
        <input
          type="number"
          placeholder="Enter amount (ml)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleManualAdd}>Add</button>
      </div>

      <div className="quick-buttons">
        <button onClick={() => handleAdd(250)}>+250 ml</button>
        <button onClick={() => handleAdd(500)}>+500 ml</button>
      </div>

      <div className="history-section">
        <h4>History (All Days)</h4>
        {history.length > 0 ? (
          history.map((item, index) => (
            <p key={index}>
              <strong>{item.date}:</strong> {item.value} ml
            </p>
          ))
        ) : (
          <p>No history yet.</p>
        )}
      </div>

      <button
        className="clear-btn"
        onClick={() => {
          Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("waterIntake_")) {
              localStorage.removeItem(key);
            }
          });
          setIntake(0);
          setHistory([]);
        }}
      >
        Clear History
      </button>
    </div>
  );
};

export default WaterTracker;
