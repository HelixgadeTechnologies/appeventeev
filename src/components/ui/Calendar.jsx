import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, add, isSameDay } from "date-fns";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  // Get start and end of the month
  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const startDay = startOfWeek(startMonth);
  const endDay = endOfWeek(endMonth);  // Ensure full last week is included

  const days = [];
  let day = startDay;

  while (day <= endDay) {  // Use endDay instead of endMonth
    days.push(new Date(day));  // Clone date to avoid mutation issues
    day = add(day, { days: 1 });
  }

  return (
    <div className="w-full mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(add(currentDate, { months: -1 }))}>
            <FaChevronLeft />
        </button>
        <h2 className="text-[14px] font-semibold text-[#212934]">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentDate(add(currentDate, { months: 1 }))}>
            <FaChevronRight />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-gray-700">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="text-[14px] font-semibold text-[#212934]">{day}</div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-2 rounded-full flex h-10 w-10 justify-center items-center text-sm ${
              isSameDay(day, today) ? "bg-gray-200 font-bold" : ""
            } ${format(day, "MM") !== format(currentDate, "MM") ? "text-gray-400" : ""}`}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
