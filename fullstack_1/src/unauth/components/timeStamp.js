import React from 'react';
import './timeStamp.css';

const TimeStamp = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="timestamp">
      <p className="timestamp-text">{currentDate}</p>
    </div>
  );
};

export default TimeStamp;

