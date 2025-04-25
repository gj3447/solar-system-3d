import React, { useState } from 'react';
import './Pages.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="page counter-page">
      <h1>카운터 ⚡</h1>
      <div className="counter-display">
        <span className="count-label">현재 카운트</span>
        <span className="count-value">{count}</span>
      </div>
      <div className="counter-controls">
        <button 
          className="counter-button decrease"
          onClick={() => setCount(count - 1)}
        >
          <span>-</span>
        </button>
        <button 
          className="counter-button increase"
          onClick={() => setCount(count + 1)}
        >
          <span>+</span>
        </button>
      </div>
      <p className="counter-info">
        버튼을 클릭하여 카운터를 조작해보세요!
      </p>
    </div>
  );
};

export default Counter; 