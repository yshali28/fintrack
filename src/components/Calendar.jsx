import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../index.css";

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [emojis, setEmojis] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef(null);

  const handleDateClick = (date, event) => {
    event.stopPropagation();
    const dateString = date.toDateString();

    if (emojis[dateString]) {
      setEmojis(prev => {
        const updated = { ...prev };
        delete updated[dateString];
        return updated;
      });
      return;
    }

    setSelectedDate(dateString);
    setShowOptions(!showOptions);
  };

  const selectEmoji = (emoji, e) => {
    e.stopPropagation();
    if (selectedDate) {
      setEmojis(prev => ({ ...prev, [selectedDate]: emoji }));
      setShowOptions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="calendar-container">
      <h3>Monthly Calendar</h3>
      <Calendar
        className="custom-calendar"
        tileContent={({ date, view }) => {
          if (view !== "month") return null;
          
          const dateString = date.toDateString();
          const hasEmoji = emojis[dateString];
          const isSelected = showOptions && selectedDate === dateString;

          return (
            <div 
              className="tile-content" 
              onClick={(e) => handleDateClick(date, e)}
            >
              {hasEmoji && (
                <span className="emoji-marker">
                  {emojis[dateString]}
                </span>
              )}
              {isSelected && (
                <div className="emoji-options" ref={menuRef}>
                  <button onClick={(e) => selectEmoji("💰", e)}>💰</button>
                  <button onClick={(e) => selectEmoji("💸", e)}>💸</button>
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CustomCalendar;
