import { useState, useEffect, useRef } from "react";
import { Tooltip } from "flowbite-react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import { FaCircleCheck, FaCircleInfo } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";
import { fetchEventLogsData } from "../data/Statuspageapis";
import { TreeSelect } from "primereact/treeselect";
import axios from "axios";
import ApiUrls from "../../../../globals/apiURL";
import { MultiSelect } from "primereact/multiselect";
import DateFilter from "./dateFilter/DateFilter";
import "../../../../index.css";
import formatTimestamp from "../../../../utils/formatTimeStamp";
import { CiCircleRemove } from "react-icons/ci";

const placeholderData = [
  {
    id: "123",
    roomName: "Room A",
    building_floor_string: "Building 1 - Floor 2",
    createdAt: "2025-01-01T12:00:00Z",
    eventTypeLevel: "Information",
    eventTypeMessage: "This is a placeholder event message.",
    message: "This is a placeholder event message for testing.",
  },
  {
    id: "124",
    roomName: "Room B",
    building_floor_string: "Building 2 - Floor 3",
    createdAt: "2025-01-02T12:00:00Z",
    eventTypeLevel: "Warning",
    eventTypeMessage: "Warning placeholder event message.",
    message: "This is another placeholder event message for testing.",
  },
  {
    id: "123",
    roomName: "Room A",
    building_floor_string: "Building 1 - Floor 2",
    createdAt: "2025-01-01T12:00:00Z",
    eventTypeLevel: "Information",
    eventTypeMessage: "This is a placeholder event message.",
    message: "This is a placeholder event message for testing.",
  },
  {
    id: "124",
    roomName: "Room B",
    building_floor_string: "Building 2 - Floor 3",
    createdAt: "2025-01-02T12:00:00Z",
    eventTypeLevel: "Warning",
    eventTypeMessage: "Warning placeholder event message.",
    message: "This is another placeholder event message for testing.",
  },
  {
    id: "123",
    roomName: "Room A",
    building_floor_string: "Building 1 - Floor 2",
    createdAt: "2025-01-01T12:00:00Z",
    eventTypeLevel: "Information",
    eventTypeMessage: "This is a placeholder event message.",
    message: "This is a placeholder event message for testing.",
  },
  {
    id: "124",
    roomName: "Room B",
    building_floor_string: "Building 2 - Floor 3",
    createdAt: "2025-01-02T12:00:00Z",
    eventTypeLevel: "Warning",
    eventTypeMessage: "Warning placeholder event message.",
    message: "This is another placeholder event message for testing.",
  },
  {
    id: "123",
    roomName: "Room A",
    building_floor_string: "Building 1 - Floor 2",
    createdAt: "2025-01-01T12:00:00Z",
    eventTypeLevel: "Information",
    eventTypeMessage: "This is a placeholder event message.",
    message: "This is a placeholder event message for testing.",
  },
  {
    id: "124",
    roomName: "Room B",
    building_floor_string: "Building 2 - Floor 3",
    createdAt: "2025-01-02T12:00:00Z",
    eventTypeLevel: "Warning",
    eventTypeMessage: "Warning placeholder event message.",
    message: "This is another placeholder event message for testing.",
  },
  // Add more placeholder items as needed
];

const EventLogsTable = () => {
  const [selectedEventFilters, setSelectedEventFilters] = useState(null);
  const [ApiLocationsToBeSend, setApiLocationsToBeSend] = useState(null);
  const [apiLocationsToBeSendCounter, setApiLocationsToBeSendCounter] =
    useState(null);
  const [buildingOpen, setBuildingOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [filtersSelected, setFiltersSelected] = useState(false);
  const [selectedLocationFilter, setSelectedLocationFilter] = useState(0);
  const [subDropdownValue, setSubDropdownValue] = useState(null);
  const [closeDateFilter, setCloseDateFilter] = useState(false); // State to manage dropdown visibility
  const [dates, setDates] = useState(null);
  // const [showFilters, setShowFilters] = useState(false);
  const dateFilterRef = useRef(null);
  const [selectedDropdownOption, setSelectedDropdownOption] =
    useState("Schnellauswahl");
  const [dropDownValue, setDropDownValue] = useState("Schnellauswahl");
  // Function to handle click outside of the DateFilter
  useEffect(() => {
    // Function to handle click outside of the DateFilter
    const handleClickOutside = (event) => {
      if (
        dateFilterRef.current &&
        !dateFilterRef.current.contains(event.target)
      ) {
        setCloseDateFilter(true);
        // Close dropdown if clicked outside
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dateFilterRef]);

  const clearBuildingFilter = () => {
    setSelectedKeys([]);
    setBuildingOpen(false);
    setApiLocationsToBeSend(null);
    setSelectedRoomIds([]);
  };
  const openBuildingFilter = () => {
    if (buildingOpen === false) {
      setBuildingOpen(true);
    }
  };
  const hideBuildingFilter = () => {
    if (buildingOpen === true) {
      setBuildingOpen(false);
    }
  };
  const clearEventFilter = () => {
    setSelectedEventFilters([]);

    setEventOpen(false);
  };
  const clearAllFilters = () => {
    setSelectedKeys([]);
    setSelectedEventFilters(null);
    setSelectedRoomIds([]);
    setApiLocationsToBeSend(null);
    setSelectedDropdownOption("Schnellauswahl");
    setDropDownValue("Schnellauswahl");
    setdateFrom(null);
    setdateTo(null);
    setSubDropdownValue(null);
    setDates(null);
  };
  const handleTreeSelectClick = () => {
    setCloseDateFilter(true);
  };
  const handleMultiSelectClick = () => {
    if (selectedLocationFilter === 0) {
      setApiLocationsToBeSend(null);
    }
    if (eventOpen === false) {
      setEventOpen(true);
      setCloseDateFilter(true);
    }
    setCloseDateFilter(true);
  };
  const handleMultiSelectHide = () => {
    if (eventOpen === true) {
      setEventOpen(false);
    }
  };

  const eventFilterOptions = [
    { name: "Information", code: "info", germanLabel: "Information" },
    { name: "Error", code: "err", germanLabel: "Fehler" },
    { name: "Warning", code: "warn", germanLabel: "Warnung" },
    { name: "Behoben", code: "beh", germanLabel: "Behoben" },
  ];

  const [LocationsData, setLocationsData] = useState([]);

  const transformData = (nodes) => {
    return nodes.map((node) => {
      const key =
        node.children.length > 0 ? node.id.toString() : `room${node.id}`;

      const transformedNode = {
        key: key,
        label: node.name,
      };

      if (node.children.length > 0) {
        transformedNode.children = transformData(node.children);
      }

      return transformedNode;
    });
  };

  const getAllLocations = async () => {
    try {
      const data = await axios.get(ApiUrls.SMARTHEATING_LOCATIONS.LIST);
      const transformedData = transformData(data.data);
      setFilteredLocations(transformedData);
      setLocationsData(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (filtersSelected === false) getAllLocations();
  }, [filtersSelected]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState({});
  const [selectedRoomIds, setSelectedRoomIds] = useState(new Set());
  const [Deselectedkeys, setDeselectedKeys] = useState({});

  const getAllKeys = (node) => {
    let keys = [node.key];
    if (node.children) {
      for (const child of node.children) {
        keys = [...keys, ...getAllKeys(child)];
      }
    }
    return keys;
  };

  const [expandedKeys, setExpandedKeys] = useState({});

  const updateSelection = (newSelectedKeys) => {
    const newSelectedRoomIds = new Set([...selectedRoomIds]);
    const updatedKeys = { ...selectedKeys };
    const updatedDeselectedKeys = { ...Deselectedkeys };

    // Helper function to select a node and all its children
    const selectNodeAndChildren = (key) => {
      const node = findNodeByKey(key, LocationsData);
      if (node) {
        selectNodeAndChildrenRecursive(node);
      }
    };

    const selectNodeAndChildrenRecursive = (node) => {
      updatedKeys[node.key] = true; // Mark node as selected

      // Ensure that previously deselected rooms/children get reselected
      if (updatedDeselectedKeys[node.key]) {
        delete updatedDeselectedKeys[node.key];
      }

      if (node.key.startsWith("room")) {
        newSelectedRoomIds.add(node.key); // Add room ID back to selected rooms
      }

      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          selectNodeAndChildrenRecursive(child); // Select all child nodes
        });
      }
    };

    // Helper function to deselect a node and all its children
    const deselectNodeAndChildren = (key) => {
      const node = findNodeByKey(key, LocationsData);
      if (node) {
        const allKeys = getAllKeys(node); // Get all children keys
        allKeys.forEach((childKey) => {
          delete updatedKeys[childKey]; // Remove selection for child keys
          if (childKey.startsWith("room")) {
            newSelectedRoomIds.delete(childKey); // Remove room ID from selection
          }
          updatedDeselectedKeys[childKey] = true; // Add to deselected keys
        });
      }
    };

    // Add newly selected keys and their children
    Object.keys(newSelectedKeys).forEach((key) => {
      if (!updatedKeys[key]) {
        // Select all children if parent is selected for the first time or reselected
        selectNodeAndChildren(key);
      } else {
        // If the parent is already selected, just select the node
        updatedKeys[key] = true;

        // Remove from deselected keys if previously deselected
        if (updatedDeselectedKeys[key]) {
          delete updatedDeselectedKeys[key];
        }
      }
    });

    // Remove unselected keys and their children
    Object.keys(selectedKeys).forEach((key) => {
      if (!newSelectedKeys[key]) {
        deselectNodeAndChildren(key); // Deselect node and its children

        // Add to deselected keys
        updatedDeselectedKeys[key] = true;

        const node = findNodeByKey(key, LocationsData); // Define node
        if (node && node.children && node.children.length > 0) {
          // Deselect parent ONLY IF all children are deselected
          const allChildrenDeselected = node.children.every(
            (child) => updatedDeselectedKeys[child.key]
          );
          if (allChildrenDeselected) {
            delete updatedKeys[key]; // Deselect parent if all children are deselected
          }
        }
      }
    });

    // Ensure room IDs in updatedKeys are included in newSelectedRoomIds
    Object.keys(updatedKeys).forEach((key) => {
      if (key.startsWith("room")) {
        newSelectedRoomIds.add(key);
      }
    });

    // Remove room IDs from newSelectedRoomIds that are in updatedDeselectedKeys
    Object.keys(updatedDeselectedKeys).forEach((key) => {
      if (key.startsWith("room")) {
        newSelectedRoomIds.delete(key);
      }
    });

    // Update state
    setSelectedKeys(updatedKeys);
    setSelectedRoomIds(newSelectedRoomIds);
    setDeselectedKeys(updatedDeselectedKeys);

    // Handle selected room IDs and filters
    const locations = Array.from(newSelectedRoomIds);
    const transformedArray = locations.map((item) =>
      parseInt(item.replace("room", ""), 10)
    );

    if (transformedArray.length > 0) {
      const sep_locations = transformedArray.join(",");
      setFiltersSelected(true);
      setSelectedLocationFilter(transformedArray.length);
      setApiLocationsToBeSend(sep_locations);
      setApiLocationsToBeSendCounter(apiLocationsToBeSendCounter + 1);
    } else {
      setSelectedLocationFilter(0);
      setFiltersSelected(false);
      getData();
    }
  };

  const onNodeSelectChange = (e) => {
    const newSelectedKeys = e.value;

    updateSelection(newSelectedKeys);
  };
  const [parentNodes, setParentNodes] = useState(null);

  const findNodeByKey = (key, nodes) => {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }

      if (node.children) {
        const childNode = findNodeByKey(key, node.children);
        if (childNode) {
          setParentNodes(childNode);
          return childNode;
        }
      }
    }
    return null;
  };

  // const getData = async (locations) => {
  //   try {
  //     const eventTypeLevel =
  //       (selectedEventFilters !== null &&
  //         selectedEventFilters.map((filter) => filter.name).join(",")) ||
  //       null;

  //     const data = await fetchEventLogsData(
  //       currentPage,
  //       itemsPerPage,
  //       locations,
  //       eventTypeLevel,
  //       dateTo,
  //       dateFrom
  //     );

  //     setTotalRows(data.count);
  //     setTableData(data.rows);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const [dateTo, setdateTo] = useState(null);
  // const [dateFrom, setdateFrom] = useState(null);

  // useEffect(() => {
  //   getData(ApiLocationsToBeSend);
  // }, [
  //   ApiLocationsToBeSend,
  //   apiLocationsToBeSendCounter,
  //   dateTo,
  //   dateFrom,
  //   currentPage,
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setDelayedLoading(true), 400);

      return () => clearTimeout(timer);
    } else {
      setDelayedLoading(false);
    }
  }, [loading]);
  const getData = (locations) => {
    const eventTypeLevel =
      (selectedEventFilters !== null &&
        selectedEventFilters.map((filter) => filter.name).join(",")) ||
      null;

    fetchEventLogsData(
      currentPage,
      itemsPerPage,
      locations,
      eventTypeLevel,
      dateTo,
      dateFrom
    )
      .then((data) => {
        setTableData(data.rows);
        setTotalRows(data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event logs:", error);
        setLoading(false);
      });
  };

  const [dateTo, setdateTo] = useState(null);
  const [dateFrom, setdateFrom] = useState(null);

  useEffect(() => {
    getData(ApiLocationsToBeSend);
  }, [
    ApiLocationsToBeSend,
    apiLocationsToBeSendCounter,
    dateTo,
    dateFrom,
    currentPage,
  ]);

  useEffect(() => {
    if (selectedEventFilters !== null) {
      getData(ApiLocationsToBeSend);
    }
  }, [selectedEventFilters]);
  const itemsPerPage = 10;
  const totalItems = totalRows && totalRows;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const startIndex = (currentPage - 1) * itemsPerPage + 1;
  // const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const startIndex =
    totalItems > 0 && itemsPerPage > 0
      ? (currentPage - 1) * itemsPerPage + 1
      : 0;

  const endIndex =
    itemsPerPage > 0 ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  const paginationRange = 1;

  let startPage = Math.max(1, currentPage - paginationRange);
  let endPage = Math.min(totalPages, currentPage + paginationRange);

  const handleDatesChange = (newDates) => {
    if (!newDates || !newDates[0]) {
      setdateFrom(null);
      setdateTo(null);
      return;
    }
    if (newDates[0] && newDates[1]) {
      let from = newDates[0];
      setdateFrom(from);
      let to = newDates[1];
      setdateTo(to);
    }
  };
  const [filterValue, setFilterValue] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(LocationsData);

  // Initialize with LocationsData

  const handleFilterChange = (event) => {
    const filterText = event.target.value.toLowerCase();
    setFilterValue(filterText);
    let filteredData = []; // Clear the filteredData array
    const searchInChildren = (node) => {
      if (node.label.toLowerCase().includes(filterText)) {
        filteredData.push(node);
      } else if (node.children) {
        node.children.forEach((child) => searchInChildren(child));
        // Remove child filters from filteredData if they don't match the search query
        filteredData = filteredData.filter((item) => item.key !== node.key);
      }
    };
    LocationsData.forEach((location) => searchInChildren(location));
    setFilteredLocations(filteredData);
  };

  const handleNodeToggle = (e) => {
    setExpandedKeys(e.value); // Update expanded keys state
  };

  // Define the function outside of the JSX
  const getEventTypeText = (event) => {
    switch (event) {
      case "Information":
        return "Information";
      case "Warning":
        return "Warnung";
      case "Behoben":
        return "Behoben";
      default:
        return "Fehler";
    }
  };
  // useEffect(() => {
  //   if (tableData.length > 0) {
  //     setShowFilters(true);
  //   }
  // }, [tableData]);

  const dateOpen1 = (value) => {
    setDateOpen(value);
  };

  // const browser = Bowser.getParser(window.navigator.userAgent);
  // const browserName = browser.getBrowserName();
  // const browserVersion = browser.getBrowserVersion();

  // const renderSpecificContent = () => {
  //   if (browserName === 'Microsoft Edge' && parseInt(browserVersion) < 105) {
  //     return <div>Your browser version is {browserVersion}. Please update to improve performance.</div>;
  //   }
  //   if (browserName === 'Chrome') {
  //     return <div>Welcome Chrome user! Enjoy your browsing experience.</div>;
  //   }
  //   return <div>Welcome! Your browser is {browserName} version {browserVersion}.</div>;
  // };

  return (
    <div className=" flex flex-col gap-4 w-full overflow-hidden">
      <div className="flex flex-col justify-center items-start w-full">
        <h1 className=" font-[500] text-lg text-gray-900">Event Übersicht</h1>
      </div>
      {/* <div>{renderSpecificContent()}</div> */}
      <div
        className={`relative ${
          dateOpen && "min-h-[327px]"
        } w-full overflow-x-auto overflow-y-hidden bg-white shadow-md sm:rounded-lg z-10`}
      >
        <div className="flex flex-column my-3 bg-transparent mx-2 sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between z-10 ">
          {/* Filter buttons */}

          <div className="flex flex-row justify-center items-center gap-4 ">
            <div className="flex flex-row gap-x-2">
              <TreeSelect
                value={selectedKeys}
                options={filteredLocations}
                onChange={onNodeSelectChange}
                onClick={handleTreeSelectClick}
                expandedKeys={expandedKeys}
                onShow={openBuildingFilter}
                onHide={hideBuildingFilter} // Use expandedKeys to manage expanded nodes
                onToggle={handleNodeToggle} // Handle node expand/collapse event
                selectionMode="multiple"
                placeholder="Alle Gebäude"
                filter
                filterBy="label"
                filterValue={filterValue}
                className="w-full md:w-20rem"
                closeIcon="false"
                panelStyle={{
                  border: "0.5px solid #bababa",
                  borderRadius: "4px",
                  outline: "none",
                  boxShadow: "none",
                }}
                style={{
                  outline: "none",
                  boxShadow: "none",
                }}
                filterTemplate={({ filterInputProps }) => (
                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "10px",
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      borderRadius: "6px",
                      border: "1px solid #d5ddde",
                    }}
                  >
                    <span
                      style={{
                        marginLeft: "8px",
                        marginRight: "8px",
                        color: "#9e9e9e",
                        fontSize: "18px",
                      }}
                    >
                      <IoSearch />
                    </span>
                    <input
                      {...filterInputProps}
                      value={filterValue}
                      onChange={handleFilterChange}
                      style={{
                        border: "none",
                        width: "100%",
                        backgroundColor: "transparent",
                        outline: "none",
                        color: "#6e6e6e",
                      }}
                      placeholder="Suche"
                    />
                  </div>
                )}
              />

              {Object.keys(selectedKeys).length > 0 && (
                <button
                  className="text-xl text-red-500 rounded-lg"
                  onClick={clearBuildingFilter}
                >
                  <CiCircleRemove size={36} />
                </button>
              )}
            </div>
            <div className="flex flex-row gap-x-2">
              <MultiSelect
                value={selectedEventFilters}
                onShow={handleMultiSelectClick}
                onHide={handleMultiSelectHide}
                onChange={(e) => setSelectedEventFilters(e.value)}
                showSelectAll={false}
                options={eventFilterOptions}
                optionLabel="germanLabel"
                filter
                placeholder="Alle Ereignisse"
                display="chip"
                className="w-full md:w-20rem"
                panelStyle={{
                  border: "0.5px solid #bababa",
                  borderRadius: "4px",
                }}
              />
              {selectedEventFilters?.length > 0 && (
                <button
                  className="text-xl text-red-500 rounded-lg"
                  onClick={clearEventFilter}
                >
                  <CiCircleRemove size={36} />
                </button>
              )}
            </div>
            <div className="dummy" ref={dateFilterRef}>
              <DateFilter
                setSelectedDropdownOption={setSelectedDropdownOption}
                selectedDropdownOption={selectedDropdownOption}
                setDropDownValue={setDropDownValue}
                dropDownValue={dropDownValue}
                setDates={setDates}
                dates={dates}
                dateRef={dateFilterRef}
                closeDropdown={closeDateFilter}
                setCloseDateFilter={setCloseDateFilter}
                onDatesChange={handleDatesChange}
                setApiLocationsToBeSend={setApiLocationsToBeSend}
                selectedLocationFilter={selectedLocationFilter}
                setSubDropdownValue={setSubDropdownValue}
                subDropdownValue={subDropdownValue}
                dateOpen1={dateOpen1}
              />
            </div>
            {(selectedEventFilters?.length > 0 ||
              Object.keys(selectedKeys).length > 0 ||
              dates ||
              (subDropdownValue && subDropdownValue.length > 0)) && (
              <button
                className="bg-red-500 px-2 text-[11px] py-3 h-[34%] text-white shadow-lg rounded-lg"
                onClick={clearAllFilters}
              >
                Alle zurücksetzen
              </button>
            )}
          </div>
        </div>
        {/* Table */}
        <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 z-10 h-full overflow-x-hidden">
          <thead className="text-xs font-semibold text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4 w-[8%]">
                EVENT ID
              </th>
              <th scope="col" className="p-4 w-[17%]">
                RAUM
              </th>
              <th scope="col" className="p-4 w-[16%]">
                GEBÄUDE - ETAGE
              </th>
              <th scope="col" className="p-4 w-[14%]">
                DATUM - UHRZEIT
              </th>
              <th scope="col" className="p-4 w-[19%]">
                EVENT
              </th>
              <th scope="col" className="p-4 w-[26%]">
                NACHRICHT
              </th>
            </tr>
          </thead>
          {placeholderData.length > 0 && (
            <tbody>
              {placeholderData.map((item, index) => (
                <tr
                  key={index}
                  className="text-sm bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[10%]">
                    {item.id ? item.id : "--"}
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900 break-words dark:text-white w-[15%]">
                    {item.roomName ? item.roomName : "--"}{" "}
                  </td>
                  <td className="px-4 py-4 w-[18%]">
                    {item.building_floor_string ? (
                      <>
                        {item.building_floor_string.split(" - ")[0] + " - "}
                        <br />
                        {item.building_floor_string.split(" - ")[1]}
                      </>
                    ) : (
                      "--"
                    )}
                  </td>
                  <td className="px-4 py-4 w-[14%]">
                    {item.createdAt ? formatTimestamp(item.createdAt) : "--"}
                  </td>
                  <td className="px-4 py-4 w-[18%]">
                    <div className="flex items-center gap-x-1">
                      <Tooltip
                        content={getEventTypeText(item.eventTypeLevel)}
                        style="light"
                      >
                        <span className="flex items-end justify-center w-6">
                          {item.eventTypeLevel === "Information" ? (
                            <FaCircleInfo className="w-4 h-4" />
                          ) : item.eventTypeLevel === "Warning" ? (
                            <RiErrorWarningFill className="text-yellow-500 w-5 h-5" />
                          ) : item.eventTypeLevel === "Behoben" ? (
                            <FaCircleCheck className="text-green-600 w-4 h-4" />
                          ) : (
                            <IoIosWarning className="text-red-700 w-5 h-5" />
                          )}
                        </span>
                      </Tooltip>
                      <span className="text-sm items-start flex justify-start ">
                        {item.eventTypeMessage ? item.eventTypeMessage : "--"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 w-[25%]">
                    <Tooltip content={item.message} style="light">
                      {item.message ? `${item.message}` : "--"}
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
            // <tbody>
            //   {placeholderData.map((item, index) => (
            //     <tr
            //       key={index}
            //       className="text-sm bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            //     >
            //       <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[9%]">
            //         {item.id ? item.id : "-"}
            //       </td>
            //       <td className="px-4 py-4 font-medium text-gray-900 break-words dark:text-white w-[15%]">
            //         {item.roomName ? item.roomName : "-"}
            //       </td>
            //       <td className="px-4 py-4 w-[16%]">
            //         {item.building_floor_string ? (
            //           <>
            //             {item.building_floor_string.split(" - ")[0] + " - "}
            //             <br />
            //             {item.building_floor_string.split(" - ")[1]}
            //           </>
            //         ) : (
            //           "-"
            //         )}
            //       </td>
            //       <td className="px-4 py-4 w-[13%]">
            //         {item.createdAt ? formatTimestamp(item.createdAt) : "-"}
            //       </td>
            //       <td className="px-4 py-4 w-[15%]">
            //         <div className="flex items-center gap-x-2">
            //           <Tooltip
            //             content={getEventTypeText(item.eventTypeLevel)}
            //             style="light"
            //           >
            //             {item.eventTypeLevel === "Information" ? (
            //               <FaCircleInfo />
            //             ) : item.eventTypeLevel === "Warning" ? (
            //               <RiErrorWarningFill className="text-yellow-500" />
            //             ) : item.eventTypeLevel === "Behoben" ? (
            //               <FaCircleCheck className="text-green-600" />
            //             ) : (
            //               <IoIosWarning className="text-red-700" />
            //             )}
            //           </Tooltip>
            //           <span className="text-sm">
            //             {item.eventTypeMessage ? item.eventTypeMessage : "-"}
            //           </span>
            //         </div>
            //       </td>
            //       <td className="px-4 py-4 w-[26%]">
            //         <Tooltip content={item.message} style="light">
            //           {item.message ? `${item.message}` : "-"}
            //         </Tooltip>
            //       </td>
            //     </tr>
            //   ))}
            // </tbody>
          )}
        </table>

        {tableData?.length === 0 && placeholderData.length === 0 && (
          <>
            <div className="w-full bg-slate-100 flex flex-col justify-center items-center">
              <p className="w-full text-center italic py-2 font-semibold">
                Keine Ergebnisse
              </p>
            </div>
          </>
        )}

        {!loading && (
          <div className="w-full p-3 flex flex-row justify-between items-center">
            {tableData && (
              <p className="font-light text-sm text-gray-500">
                {" "}
                <span className="font-bold text-black">
                  {startIndex}-{endIndex}
                </span>{" "}
                von <span className="font-bold text-black">{totalItems}</span>
              </p>
            )}

            {/* Pagination */}
            <div className="flex justify-end border rounded-md border-gray-200 w-fit">
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
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm text-gray-500 bg-white hover:bg-gray-100"
                >
                  1
                </button>
              )}
              {startPage > 2 && (
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm text-gray-500 bg-white">
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
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm text-gray-500 bg-white">
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
        )}
      </div>
    </div>
  );
};

export default EventLogsTable;
