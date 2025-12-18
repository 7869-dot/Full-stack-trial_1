import React from 'react';
import './timeStamp.css';

const TimeStamp = ({ videoTitle, timestamps }) => {
  if (!timestamps || timestamps.length === 0) {
    return null;
  }

  return (
    <section className="timestamp">
      <div className="timestamp-inner">
        {videoTitle && <h2 className="timestamp-title">{videoTitle}</h2>}
        <ul className="timestamp-list">
          {timestamps.map((item, index) => (
            <li key={index} className="timestamp-item">
              <span className="timestamp-time">{item.time}</span>
              <span className="timestamp-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TimeStamp;
