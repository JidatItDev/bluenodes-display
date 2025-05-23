import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "../../../../../index.css";
const getDateRange = (option) => {
  const now = new Date();
  let startDate, endDate;
  function formatDateToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  switch (option) {
    case "Today": {
      let today = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
      );
      startDate = today.toISOString().slice(0, 10);
      endDate = today.toISOString().slice(0, 10);
      break;
    }
    case "Yesterday": {
      let today = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1)
      );
      startDate = today.toISOString().slice(0, 10);
      endDate = today.toISOString().slice(0, 10);
      break;
    }
    case "Last 7 Days": {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 6); // 7 days ago
      startDate.setHours(0, 0, 0, 0); // Start of the day
      // Set endDate to yesterday
      endDate = new Date(now);
      endDate.setDate(now.getDate()); // Yesterday
      endDate.setHours(23, 59, 59, 999); // End of the day
      // Format the dates to yyyy-mm-dd format
      startDate = formatDateToISO(startDate);
      endDate = formatDateToISO(endDate);
      break;
    }
    case "Last 30 days": {
      // Set startDate to 30 days ago
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 30); // 30 days ago
      startDate.setHours(0, 0, 0, 0); // Start of the day
      // Set endDate to the current day
      endDate = new Date(now);
      startDate.setDate(now.getDate());
      endDate.setHours(23, 59, 59, 999); // End of the day
      // Format startDate and endDate
      startDate = formatDateToISO(startDate);
      endDate = formatDateToISO(endDate);

      break;
    }
    case "Last Year": {
      // Set startDate to the same day last year
      startDate = new Date(now);
      startDate.setFullYear(now.getFullYear() - 1); // Last year
      startDate.setHours(0, 0, 0, 0); // Start of the day
      // Set endDate to the same day of the current year
      endDate = new Date(now);
      endDate.setFullYear(now.getFullYear()); // Last year
      endDate.setHours(23, 59, 59, 999); // End of the day
      // Format startDate and endDate
      startDate = formatDateToISO(startDate);
      endDate = formatDateToISO(endDate);

      break;
    }
    default:
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 1); // Default to include the previous day
      endDate = new Date(now);
      endDate.setDate(endDate.getDate() + 1); // Default to include the next day
      break;
  }
  return [startDate, endDate];
};
const DateFilter = ({
  dateRef,
  dates,
  setDates,
  onDatesChange,
  closeDropdown,
  setCloseDateFilter,
  setApiLocationsToBeSend,
  selectedLocationFilter,
  setSubDropdownValue,
  subDropdownValue,
  setSelectedDropdownOption,
  selectedDropdownOption,
  dropDownValue,
  setDropDownValue,
  Dashboard,
  dateOpen1,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [subDropdownOpen, setSubDropdownOpen] = useState(false);
  useEffect(() => {
    dateOpen1(dropdownOpen);
  }, [dropdownOpen]);
  const subDropdownOptions = [
    { key: "Today", label: "Today", germanLabel: "Heute" },
    { key: "Yesterday", label: "Yesterday", germanLabel: "Gestern" },
    { key: "Last7Days", label: "Last 7 Days", germanLabel: "Letzte 7 Tage" },
    { key: "Last30Days", label: "Last 30 days", germanLabel: "Letzte 30 Tage" },
    { key: "LastYear", label: "Last Year", germanLabel: "Letztes Jahr" },
  ];
  useEffect(() => {
    if (closeDropdown === true) {
      setDropdownOpen(false);
      setSubDropdownOpen(false);
      setShowCalendar(false);
    }
  }, [closeDropdown]);
  useEffect(() => {
    if (Dashboard) {
      setSelectedDropdownOption("Schnellauswahl");
      setSubDropdownValue("Today");
      handleSubDropdownChange({ target: { value: "Today" } });
    }
  }, [Dashboard]);

  const handleBestim = () => {
    setDropDownValue("Bestimmter Datumsbereich");
  };
  const toggleDropdown = () => {
    if (selectedLocationFilter === 0) {
      setApiLocationsToBeSend(null);
    }
    setDropdownOpen(true);
    setSubDropdownOpen(false);
    setCloseDateFilter(false);
    if (selectedDropdownOption === "Schnellauswahl") {
      setSubDropdownOpen(true);
    } else if (selectedDropdownOption === "Bestimmter Datumsbereich") {
      setShowCalendar(true);
    }
  };
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDropdownOption(selectedValue);
    setDropdownOpen(true);
    if (selectedValue === "Schnellauswahl") {
      setDropDownValue(selectedValue);
      setSubDropdownOpen(true);
      setShowCalendar(false);
      setDates(null); // Reset dates for the specific date range
      setDropdownOpen(false);
    } else {
      setSubDropdownOpen(false);
      setShowCalendar(true);
      setSubDropdownValue(null); // Reset sub-dropdown value
      setDates(null); // Ensure dates are reset
    }
  };
  const handleSubDropdownChange = (e) => {
    const value = e.target.value;
    setSubDropdownValue(value);
    const [startDate, endDate] = getDateRange(value);
    setDates([startDate, endDate]);

    onDatesChange([startDate, endDate]);
    // Update the main dropdown with the German label of the selected sub-option
    const selectedGermanLabel = subDropdownOptions.find(
      (option) => option.label === value
    )?.germanLabel;

    setDropDownValue(selectedGermanLabel || "Schnellauswahl");
  };

  const handleCalendarChange = (e) => {
    if (e.value) {
      const formattedDates = e.value.map((date) => {
        if (!date) return null; // Handle null dates
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(d.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
      });
      const formattedDropDownDates = e.value.map((date) => {
        if (!date) return null; // Handle null dates
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(d.getDate()).padStart(2, "0");

        return `${day}.${month}.${year}`;
      });
      if (formattedDropDownDates[1]) {
        setDropDownValue(
          `${formattedDropDownDates[0]} - ${formattedDropDownDates[1]}`
        );
      } else {
        setDropDownValue(`${formattedDropDownDates[0]}`);
      }

      setDates(e.value);
      onDatesChange(formattedDates); // Notify parent component
    } else {
      setDates(null); // Reset or handle accordingly
    }
  };

  const clearFilter = () => {
    setDropdownOpen(false);
    setSubDropdownOpen(false);
    setCloseDateFilter(false);
    setSelectedDropdownOption("Schnellauswahl");
    setDropDownValue("Schnellauswahl");
    setShowCalendar(false);
    setSubDropdownValue(null);
    let startDate = null,
      endDate = null;
    setDates(startDate, endDate);
    onDatesChange(startDate, endDate);
  };
  return (
    <div
      className={`relative flex w-fit items-start space-y-2 z-50 ${
        Dashboard ? "mr-12" : "mr-0"
      }`}
      ref={dateRef}
    >
      <div className="relative w-full flex flex-col gap-x-2">
        <div className="flex gap-3">
          <button
            onClick={toggleDropdown}
            className={`flex justify-between text-gray-500 items-center text-[1rem] ${
              Dashboard ? "px-2 py-1" : "px-4 py-[0.623rem] "
            } bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            style={{ width: "auto" }} // Auto width to adjust based on content
          >
            {dropDownValue}
            <span className="ml-2">
              <MdOutlineKeyboardArrowDown size={29} className="text-gray-400" />
            </span>
          </button>

          {/* Conditionally render clear filter button */}
          {(dates || (subDropdownValue && subDropdownValue.length > 0)) && (
            <button
              className="text-xl text-red-500 rounded-lg"
              onClick={clearFilter}
            >
              <CiCircleRemove size={36} />
            </button>
          )}
        </div>

        <div
          className={` flex flex-col gap-2 absolute top-14 ${
            Dashboard ? "right-0" : ""
          }`}
        >
          {dropdownOpen && (
            <div
              className={`${
                Dashboard ? "py-1 mt-1 " : "mt-2 py-2"
              }  bg-[#ffffff] border border-gray-300 rounded-md shadow-lg w-[28rem] z-20`}
            >
              <div
                className={` ${
                  Dashboard ? "gap-x-2 p-2 " : "gap-x-3 p-2 "
                } flex  justify-center items-center`}
              >
                <div className="flex items-center justify-center">
                  <input
                    type="radio"
                    name="dateFilter"
                    id="Schnellauswahl"
                    value="Schnellauswahl"
                    className={`cursor-pointer ${
                      Dashboard ? "p-[0px] " : "p-[9px]"
                    } `}
                    onChange={handleDropdownChange}
                    checked={selectedDropdownOption === "Schnellauswahl"}
                  />
                  <label htmlFor="Schnellauswahl" className="ml-2">
                    Schnellauswahl
                  </label>
                </div>
                <div
                  className="flex items-center justify-center"
                  onClick={handleBestim}
                >
                  <input
                    type="radio"
                    name="dateFilter"
                    id="Bestimmter Datumsbereich"
                    value="Bestimmter Datumsbereich"
                    className="cursor-pointer p-[9px] radio1st"
                    onChange={handleDropdownChange}
                    checked={
                      selectedDropdownOption === "Bestimmter Datumsbereich"
                    }
                  />
                  <label htmlFor="Bestimmter Datumsbereich" className="ml-2">
                    Bestimmter Datumsbereich
                  </label>
                </div>
              </div>
            </div>
          )}
          {subDropdownOpen && (
            <div className="py-2 px-4 bg-[#ffffff] border border-gray-300 rounded-md shadow-lg w-[23rem] z-20">
              {subDropdownOptions.map((category) => (
                <div key={category.key} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="category"
                    id={category.key}
                    className="cursor-pointer"
                    value={category.label}
                    onChange={handleSubDropdownChange}
                    checked={subDropdownValue === category.label}
                  />
                  <label htmlFor={category.key} className="ml-2">
                    {category.germanLabel}
                  </label>
                </div>
              ))}
            </div>
          )}
          {showCalendar && (
            <div className=" p-6 ccc relative shadow-lg bg-white w-[23rem] rounded-lg border z-50">
              <Calendar
                value={dates}
                onChange={handleCalendarChange}
                selectionMode="range"
                readOnlyInput={true}
                dateFormat="dd.mm.yy"
                hideOnRangeSelection
                showIcon
                appendTo={"self"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DateFilter;
