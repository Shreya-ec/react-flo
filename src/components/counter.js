import React, { useState, useEffect } from "react";

const Counter = ({ value, duration = 2000, interval = 50 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const step = Math.ceil(value / (duration / interval));
    let currentValue = 0;

    const intervalId = setInterval(() => {
      currentValue += step;
      if (currentValue >= value) {
        currentValue = value;
        clearInterval(intervalId);
      }
      setCount(currentValue);
    }, interval);

    return () => clearInterval(intervalId);
  }, [value, duration, interval]);

  return <span>{count || 0}</span>;
};

export default Counter;
