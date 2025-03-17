import { Input } from "@chakra-ui/react";
import { useState } from "react";

const TimeInput = ({ value, onChange }) => {
  const [displayTime, setDisplayTime] = useState("");

  // Function to convert 24-hour time to 12-hour AM/PM format
  const formatTime = (time) => {
    if (!time) return "";
    let [hours, minutes] = time.split(":");
    let period = "AM";
    hours = parseInt(hours, 10);

    if (hours >= 12) {
      period = "PM";
      if (hours > 12) hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes} ${period}`;
  };

  // Handle input change
  const handleChange = (event) => {
    const rawTime = event.target.value;
    setDisplayTime(formatTime(rawTime));
    onChange(rawTime); // Store in 24-hour format
  };

  return (
    <Input
      type="time"
      value={value}
      onChange={handleChange}
      onBlur={(e) => setDisplayTime(formatTime(e.target.value))} // Show AM/PM on blur
      onFocus={() => setDisplayTime(value || "")} // Show raw 24-hour time on focus
      placeholder="Select time"
      fontSize="small"
    />
  );
};

export default TimeInput;