import { useState, useEffect, useRef } from "react";
import { Tooltip } from "flowbite-react";
import { IoChevronBackOutline, IoSearch } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import BatteryFull from "../../../../assets/battery-icons/battery-100.png";
import BatteryMedium from "../../../../assets/battery-icons/battery-51.png";
import BatteryLow from "../../../../assets/battery-icons/battery-26.png";
import BatteryEmpty from "../../../../assets/battery-icons/battery-0.png";
import { fetchDevicesOfflineData } from "../data/Statuspageapis";
import ApiUrls from "../../../../globals/apiURL";
import { TreeSelect } from "primereact/treeselect";
import formatTimestamp from "../../../../utils/formatTimeStamp";
import { CiCircleRemove } from "react-icons/ci";
import axios from "axios";
import { BatteryUnknownIcon } from "../../../../utils/icons";
import OfflineSkeletonTable from "./OfflineSkeltonTable";

const getBatteryImage = (battery_level) => {
  const level = battery_level;
  if (level === "full") {
    return BatteryFull;
  } else if (level === "high") {
    return BatteryFull;
  } else if (level === "medium") {
    return BatteryMedium;
  } else if (level === "low") {
    return BatteryLow;
  } else {
    return BatteryEmpty;
  }
};

const OfflineTable = () => {
  const [selectedEventFilters, setSelectedEventFilters] = useState(null);
  const [ApiLocationsToBeSend, setApiLocationsToBeSend] = useState(null);
  const [LocationsData, setLocationsData] = useState([]);
  const [apiLocationsToBeSendCounter, setApiLocationsToBeSendCounter] =
    useState(null);
  const [selectedLocationFilter, setSelectedLocationFilter] = useState(0);
  const [buildingOpen, setBuildingOpen] = useState(false);
  const [closeDateFilter, setCloseDateFilter] = useState(false);
  const dateFilterRef = useRef(null);
  const [floors, setFloors] = useState([]);
  const [filtersSelected, setFiltersSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleTreeSelectClick = () => {
    setCloseDateFilter(true);

    // Additional logic for TreeSelect click if needed
  };
  useEffect(() => {
    // Function to handle click outside of the DateFilter
    const handleClickOutside = (event) => {
      if (
        dateFilterRef.current &&
        !dateFilterRef.current.contains(event.target)
      ) {
        setCloseDateFilter(true); // Close dropdown if clicked outside
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

  // const getAllLocations = async () => {
  //   try {
  //     const data = await axios.get(ApiUrls.SMARTHEATING_LOCATIONS.LIST);
  //     const transformedData = transformData(data.data);

  //     setFilteredLocations(transformedData);
  //     setLocationsData(transformedData);
  //     const extractedFloors = LocationsData.map(
  //       (location) => location.children
  //     ).flat();

  //     // Update the floors state with the extracted children
  //     setFloors(extractedFloors);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (filtersSelected === false) getAllLocations();
  // }, [filtersSelected]);
  const getAllLocations = () => {
    axios
      .get(ApiUrls.SMARTHEATING_LOCATIONS.LIST)
      .then((response) => {
        const transformedData = transformData(response.data);

        setFilteredLocations(transformedData);
        setLocationsData(transformedData);

        const extractedFloors = transformedData
          .map((location) => location.children)
          .flat();

        // Update the floors state with the extracted children
        setFloors(extractedFloors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (filtersSelected === false) getAllLocations();
  }, [filtersSelected]);

  const [tableData, setTableData] = useState([
    {
      deviceName: "Device 1",
      deviceType: "Sensor",
      building_floor_string: "Building A - Floor 1",
      roomName: "Room 101",
      lastSeen: 1672638672000, // Example timestamp
      batteryLevel: "low",
      status: "offline",
    },
    {
      deviceName: "Device 2",
      deviceType: "Camera",
      building_floor_string: "Building B - Floor 2",
      roomName: "Room 202",
      lastSeen: 1672639672000, // Example timestamp
      batteryLevel: "medium",
      status: "offline",
    },
    {
      deviceName: "Device 3",
      deviceType: "Thermostat",
      building_floor_string: "Building C - Floor 3",
      roomName: "Room 303",
      lastSeen: 1672640672000, // Example timestamp
      batteryLevel: "high",
      status: "offline",
    },
    {
      deviceName: "Device 4",
      deviceType: "Motion Sensor",
      building_floor_string: "Building D - Floor 4",
      roomName: "Room 404",
      lastSeen: 1672641672000, // Example timestamp
      batteryLevel: "low",
      status: "offline",
    },
    {
      deviceName: "Device 5",
      deviceType: "Smoke Detector",
      building_floor_string: "Building E - Floor 5",
      roomName: "Room 505",
      lastSeen: 1672642672000, // Example timestamp
      batteryLevel: "medium",
      status: "offline",
    },
    {
      deviceName: "Device 1",
      deviceType: "Sensor",
      building_floor_string: "Building A - Floor 1",
      roomName: "Room 101",
      lastSeen: 1672638672000, // Example timestamp
      batteryLevel: "low",
      status: "offline",
    },
    {
      deviceName: "Device 2",
      deviceType: "Camera",
      building_floor_string: "Building B - Floor 2",
      roomName: "Room 202",
      lastSeen: 1672639672000, // Example timestamp
      batteryLevel: "medium",
      status: "offline",
    },
    {
      deviceName: "Device 3",
      deviceType: "Thermostat",
      building_floor_string: "Building C - Floor 3",
      roomName: "Room 303",
      lastSeen: 1672640672000, // Example timestamp
      batteryLevel: "high",
      status: "offline",
    },
    {
      deviceName: "Device 4",
      deviceType: "Motion Sensor",
      building_floor_string: "Building D - Floor 4",
      roomName: "Room 404",
      lastSeen: 1672641672000, // Example timestamp
      batteryLevel: "low",
      status: "offline",
    },
    {
      deviceName: "Device 5",
      deviceType: "Smoke Detector",
      building_floor_string: "Building E - Floor 5",
      roomName: "Room 505",
      lastSeen: 1672642672000, // Example timestamp
      batteryLevel: "medium",
      status: "offline",
    },
  ]);
  // const [selectedFilter, setSelectedFilter] = useState('Last Year');
  // const [selectedEvent, setSelectedEvent] = useState("All events");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const itemsPerPage = 10;
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
  const [parentNodes, setParentNodes] = useState(null);

  // const getData = async (locations) => {
  //   try {
  //     const eventTypeLevel =
  //       (selectedEventFilters !== null &&
  //         selectedEventFilters.map((filter) => filter.name).join(",")) ||
  //       null;
  //     const data = await fetchDevicesOfflineData(
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
  //   getData();
  // }, [currentPage]);

  // useEffect(() => {
  //   getData(ApiLocationsToBeSend);
  // }, [
  //   ApiLocationsToBeSend,
  //   apiLocationsToBeSendCounter,
  //   dateTo,
  //   dateFrom,
  //   currentPage,
  // ]);

  // useEffect(() => {
  //   getData(ApiLocationsToBeSend);
  // }, [selectedEventFilters]);
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

    fetchDevicesOfflineData(
      currentPage,
      itemsPerPage,
      locations,
      eventTypeLevel,
      dateTo,
      dateFrom
    )
      .then((data) => {
        setTotalRows(data.count);
        setTableData(data.rows);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const [dateTo, setdateTo] = useState(null);
  const [dateFrom, setdateFrom] = useState(null);

  // useEffect(() => {
  //   getData();
  // }, [currentPage]);

  useEffect(() => {
    getData(ApiLocationsToBeSend);
  }, [
    ApiLocationsToBeSend,
    apiLocationsToBeSendCounter,
    dateTo,
    dateFrom,
    currentPage,
  ]);

  // useEffect(() => {
  //   getData(ApiLocationsToBeSend);
  // }, [selectedEventFilters]);

  const totalItems = totalRows;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex =
    totalItems > 0 && itemsPerPage > 0
      ? (currentPage - 1) * itemsPerPage + 1
      : 0;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const paginationRange = 1;

  let startPage = Math.max(1, currentPage - paginationRange);
  let endPage = Math.min(totalPages, currentPage + paginationRange);

  const formatDateforApitosend = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-GB", options)
      .format(date)
      .split("/")
      .reverse()
      .join("-");
  };

  const handleDatesChange = (newDates) => {
    if (!newDates || !newDates[0]) {
      setdateFrom(null);
      setdateTo(null);
      return;
    }
    if (newDates[0] && newDates[1]) {
      let from = newDates[0] && formatDateforApitosend(new Date(newDates[0]));
      setdateFrom(from);
      let to = newDates[1] && formatDateforApitosend(new Date(newDates[1]));
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

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };
  const handleNodeToggle = (e) => {
    setExpandedKeys(e.value); // Update expanded keys state
  };

  // Define the function outside of the JSX
  const getBatteryLevelText = (batteryLevel) => {
    switch (batteryLevel) {
      case "low":
        return "Niedrig";
      case "medium":
        return "Mittel";
      case "high":
        return "Hoch";
      default:
        return "Undefined";
    }
  };

  const columnWidths = {
    devEui: "w-[15%] ",
    deviceName: "w-[14%] ",
    deviceType: "w-[14%] ",
    buildingFloor: "w-[16%] ",
    roomName: "w-[12%] ",
    lastSeen: "w-[13%] ",
    battery: "w-[7%] ",
    status: "w-[9%] ",
  };

  return (
    <div className=" flex flex-col gap-4 w-full">
      <div className="flex flex-col justify-center items-start w-full">
        <h1 className=" font-[500] text-lg text-gray-900">Geräte offline</h1>
      </div>
      <div className="relative w-full overflow-x-auto overflow-y-hidden bg-white shadow-md sm:rounded-lg">
        <div className="flex flex-column my-3 bg-transparent mx-2 sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
          {/* Filter buttons */}

          <div className="flex flex-row justify-center items-center gap-1">
            <TreeSelect
              value={selectedKeys}
              options={filteredLocations}
              onChange={onNodeSelectChange}
              onShow={openBuildingFilter}
              onHide={hideBuildingFilter}
              onClick={handleTreeSelectClick}
              expandedKeys={expandedKeys} // Use expandedKeys to manage expanded nodes
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
        </div>
        {/* Table */}
        <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs font-semibold text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="uppercase">
              <th scope="col" className={`${columnWidths.devEui} p-4`}>
                ID
              </th>
              <th scope="col" className={`${columnWidths.deviceName} p-4`}>
                GERÄTE Name
              </th>
              <th scope="col" className={`${columnWidths.deviceType} p-4`}>
                GERÄTE-typ
              </th>
              <th scope="col" className={`${columnWidths.buildingFloor} p-4`}>
                GEBÄUDE - ETAGE
              </th>
              <th scope="col" className={`${columnWidths.roomName} p-4`}>
                RAUM
              </th>
              <th scope="col" className={`${columnWidths.lastSeen} p-4`}>
                DATUM - UHRZEIT
              </th>
              <th scope="col" className={`${columnWidths.battery} p-4`}>
                BATTERIE
              </th>
              <th scope="col" className={`${columnWidths.status} p-4`}>
                STATUS
              </th>
            </tr>
          </thead>
          {delayedLoading && <OfflineSkeletonTable />}
          {tableData?.length > 0 && !delayedLoading && (
            <tbody>
              {tableData?.length > 0 &&
                tableData.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td
                      className={`${columnWidths.devEui} px-4 py-4 truncate uppercase`}
                    >
                      {item.devEui}
                    </td>

                    <td
                      className={`${columnWidths.deviceName} px-4 py-4 truncate`}
                    >
                      {item.deviceName}
                    </td>

                    <td
                      className={`${columnWidths.deviceType} px-4 py-4 truncate`}
                    >
                      {item.deviceType}
                    </td>

                    <td className={`${columnWidths.buildingFloor} px-4 py-4`}>
                      {item.building_floor_string}
                    </td>

                    <td className={`${columnWidths.roomName} px-4 py-4`}>
                      {item.roomName}
                    </td>

                    <td className={`${columnWidths.lastSeen} px-4 py-4`}>
                      {item.lastSeen ? formatTimestamp(item?.lastSeen) : "--"}
                    </td>

                    <td
                      className={`${columnWidths.battery} px-4 py-4 truncate`}
                    >
                      <Tooltip
                        className="p-3"
                        content={
                          item?.batteryLevel
                            ? getBatteryLevelText(item?.batteryLevel)
                            : "Unbekannt"
                        }
                        style="light"
                        animation="duration-500"
                      >
                        <div className="flex items-center gap-1">
                          {item?.batteryLevel ? (
                            <img
                              src={getBatteryImage(item?.batteryLevel)}
                              alt="Battery Level"
                              className="w-4 h-4 mr-2"
                            />
                          ) : (
                            <BatteryUnknownIcon />
                          )}
                          {item.batteryLevel === "low" && (
                            <p className="text-sm font-bold text-red-500">
                              Bald leer
                            </p>
                          )}
                        </div>
                      </Tooltip>
                    </td>

                    <td
                      className={`${columnWidths.status} px-4 py-4  truncate `}
                    >
                      <div
                        className={`py-0.5 px-2.5 rounded-md flex items-center justify-center gap-1 
                      ${
                        item.status === "online"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-900"
                      } 
                      text-[12px]`}
                      >
                        {item.status === "online" ? (
                          <FaRegCircleCheck />
                        ) : (
                          <AiOutlineExclamationCircle />
                        )}
                        <p className="text-xs font-medium">{item.status}</p>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>

        {tableData?.length === 0 && !loading && (
          <>
            <div className="w-full bg-slate-100 flex flex-col justify-center items-center">
              <p className="w-full text-center italic py-2 font-semibold">
                Keine Ergebnisse{" "}
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

export default OfflineTable;
