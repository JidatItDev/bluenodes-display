/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Select } from "flowbite-react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { GiTireIronCross } from "react-icons/gi";
import { fetchUnassignedRoomsData } from "../data/Statuspageapis";

const UnassignedTable = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Last Year");
  const [selectedEvent, setSelectedEvent] = useState("All events");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const itemsPerPage = 10;

  const getData = async () => {
    try {
      const data = await fetchUnassignedRoomsData(currentPage, itemsPerPage);
      setTotalRows(data.count);
      setTableData(data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [currentPage]);

  const totalItems = totalRows && totalRows;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const paginationRange = 1;

  let startPage = Math.max(1, currentPage - paginationRange);
  let endPage = Math.min(totalPages, currentPage + paginationRange);

  return (
    <div className="flex flex-col w-full gap-4 ">
      <div className="flex flex-col items-start justify-center w-full">
        <h1 className=" font-[500] text-lg text-gray-900">Rooms Unassigned</h1>
      </div>
      <div className="relative w-full overflow-x-auto bg-white shadow-md sm:rounded-lg">
        <div className="flex flex-wrap items-center justify-between mx-2 my-2 space-y-4 bg-transparent flex-column sm:flex-row sm:space-y-0">
          {/* Filter buttons */}
          <div className="flex flex-row items-center justify-center gap-1">
            <Select
              id="dayFilter"
              icon={MdOutlineAccessTimeFilled}
              required
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option className=" text-md" value="Last 30 days">
                Letzte 30 Tage
              </option>
              <option className=" text-md" value="Last 7 days">
                Letzte 7 Tage
              </option>
              <option className=" text-md" value="Last Month">
                Letzter Monat
              </option>
              <option className=" text-md" value="Last Year">
                Letztes Jahr
              </option>
            </Select>
            <Select
              id="eventFilter"
              required
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option className="font-semibold text-md" value="Last 30 days">
                Alle Events
              </option>
            </Select>
          </div>
          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none rtl:inset-r-0 rtl:right-0 ps-3">
              <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Suche"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery.length > 0 && (
              <GiTireIronCross
                onClick={(e) => setSearchQuery("")}
                className="w-5 h-5 cursor-pointer absolute p-1 bg-gray-200 text-black rounded-full right-[7px] top-[9px] hover:scale-75 transition-all delay-100"
              />
            )}
          </div>
        </div>
        {/* Table */}
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs font-semibold text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="uppercase ">
              <th scope="col" className="p-4 w-[20%]">
                ID
              </th>
              <th scope="col" className="p-4 w-[30%]">
                RAUM
              </th>
              <th scope="col" className="p-4 w-[60%]">
                GEBÄUDE - ETAGE
              </th>
              <th scope="col" className="p-4">
                JETZT ZUWEISEN
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 &&
              tableData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.id ? item.id : "N/A"}
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.name ? item.name : "N/A"}{" "}
                    <span className="text-[12px] py-0.5 px-2.5 font-semibold bg-gray-100 rounded-[80px] p-1">
                      {item.tag ? item.tag : "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {item.building_floor_string
                      ? item.building_floor_string
                      : "N/A"}
                  </td>
                  <td className="px-4 py-4">
                    <Button className=" hover:!bg-transparent hover:opacity-80 border-none text-primary bg-transparent pr-2 py-0 [&>*]:p-0 focus:ring-transparent">
                      Heizplan auswählenä
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {tableData.length === 0 && (
          <>
            <div className="flex flex-col items-center justify-center w-full bg-slate-100">
              <p className="w-full py-2 italic font-semibold text-center">
                Keine Ergebnisse
              </p>
            </div>
          </>
        )}

        <div className="flex flex-row items-center justify-between w-full p-3">
          {tableData && (
            <p className="text-sm font-light text-gray-500">
              {" "}
              <span className="font-bold text-black">
                {startIndex}-{endIndex}
              </span>{" "}
              von <span className="font-bold text-black">{totalItems}</span>
            </p>
          )}

          {/* Pagination */}
          <div className="flex justify-end border border-gray-200 rounded-md w-fit">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-primary bg-[#CFF4FB] hover:bg-primary-300"
              }`}
              disabled={currentPage === 1}
            >
              <IoChevronBackOutline />
            </button>
            {startPage > 1 && (
              <button
                onClick={() => handlePageChange(1)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-sm hover:bg-gray-100"
              >
                1
              </button>
            )}
            {startPage > 2 && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-sm">
                ...
              </span>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                key={startPage + index}
                onClick={() => handlePageChange(startPage + index)}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm ${
                  currentPage === startPage + index
                    ? "text-primary bg-[#CFF4FB] hover:bg-primary-300"
                    : "text-gray-500 bg-white hover:bg-gray-100"
                }`}
              >
                {startPage + index}
              </button>
            ))}
            {endPage < totalPages - 1 && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-sm">
                ...
              </span>
            )}
            {endPage < totalPages && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 bg-white hover:bg-gray-100"
                }`}
                disabled={currentPage === totalPages}
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-primary bg-[#CFF4FB] hover:bg-primary-300"
              }`}
              disabled={currentPage === totalPages}
            >
              <IoChevronForwardOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnassignedTable;
