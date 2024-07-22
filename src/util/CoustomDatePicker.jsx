import React, { useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { FaCalendarDays } from "react-icons/fa6";
import { useClickOutside } from "../../src/hooks/CustomHooks";

function CustomDatePicker({ onDateRangeChange, inputs }) {
  const datepickerRef = useRef();
  const [showDatePicker, setShowDatePicker] = useState(false);

  useClickOutside(datepickerRef, () => {
    if (showDatePicker) {
      setShowDatePicker(false);
    }
  });

  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div>
      <div onClick={handleToggleDatePicker}>
        <FaCalendarDays strokeWidth={2} stroke="#000" />
      </div>

      {showDatePicker && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-10">
          <div ref={datepickerRef}>
            <DateRangePicker
              ranges={inputs.dateRange}
              onChange={onDateRangeChange}
              className={"style.CustomDatePicker,static top-1/2 z-10"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomDatePicker;
