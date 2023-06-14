import React, { useEffect, useState } from "react";
import { Button } from "antd";

const WeekdaysComponent = ({ WeekSelector, index }) => {
  // State to track the selected days
  const [selectedDays, setSelectedDays] = useState(index);

  // Function to handle day button click
  const handleDayClick = (index) => {
    if (selectedDays.includes(index)) {
      // If the day is already selected, remove it from the selected days
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== index)
      );
    } else {
      // If the day is not selected, add it to the selected days
      setSelectedDays([...selectedDays, index]);
    }
  };

  // Array of weekdays
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  // Effect to trigger the WeekSelector callback when selectedDays change
  useEffect(() => {
    WeekSelector(selectedDays);
  }, [selectedDays]);

  return (
    <div>
      {/* Map over the days array and render a button for each day */}
      {days.map((day, index) => (
        <Button
          key={index}
          // Handle button click event
          onClick={() => handleDayClick(index)}
          // Apply "selected" class to the button if it is included in selectedDays
          className={`button ${selectedDays.includes(index) ? "selected" : ""}`}
          // Set button type to "primary" if it is included in selectedDays
          type={selectedDays.includes(index) ? "primary" : ""}
          // Set button text color based on selection
          style={{
            color: selectedDays.includes(index) ? "white" : "black",
            marginRight: "10px",
          }}
          // Set button shape to circle
          shape="circle"
        >
          {day}
        </Button>
      ))}
    </div>
  );
};

export default WeekdaysComponent;
