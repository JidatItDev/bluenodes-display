/* eslint-disable react/prop-types */
// Parent Component
import { Button, Modal, ToggleSwitch, Tooltip } from "flowbite-react";
import customTheme from "../../HeatingSchedule/CreateHeating/ModalTheme";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useState } from "react";
import HeatingScheduleTable from "../../HeatingSchedule/components/HeatingScheduleTable";
import HeatingScheduleComparison from "./HeatingScheduleComparison";

export function ViewRoomScheduleModal({ openModal,handleOpenModal }) {
  const dummyData = {
    formData: {
      programName: "program test 1",
      childSafety: "Yes",
      minTemp: "20",
      maxTemp: "21",
      applyAlgorithm: "Yes"
    },
    heatingAssignmentData: {
      buildings: [
        {
          id: "building-a",
          name: "Building A",
          roomsAssigned: 7,
          totalRooms: 15,
          floors: [
            {
              id: "floor-1",
              name: "Floor 1",
              roomsAssigned: 5,
              totalRooms: 5,
              rooms: [
                {
                  id: "room-123",
                  name: "Room 123",
                  type: "Room type name",
                  algorithmOn: "Yes",
                  programAssigned: "program test 1",
                  currentTemperature: "20°C",
                  assigned: true
                },
                {
                  id: "room-234",
                  name: "Room 234",
                  type: "Room type name",
                  algorithmOn: "Yes",
                  programAssigned: "program test 1",
                  currentTemperature: "20°C",
                  assigned: true
                },
                {
                  id: "room-345",
                  name: "Room 345",
                  type: "Room type name",
                  algorithmOn: "Yes",
                  programAssigned: "program test 1",
                  currentTemperature: "20°C",
                  assigned: true
                },
                {
                  id: "room-456",
                  name: "Room 456",
                  type: "Room type name",
                  algorithmOn: "Yes",
                  programAssigned: "program test 1",
                  currentTemperature: "20°C",
                  assigned: true
                },
                {
                  id: "room-567",
                  name: "Room 567",
                  type: "Room type name",
                  algorithmOn: "Yes",
                  programAssigned: "program test 1",
                  currentTemperature: "20°C",
                  assigned: true
                }
              ]
            },
            {
              id: "floor-2",
              name: "Floor 2",
              roomsAssigned: 2,
              totalRooms: 5,
              rooms: [
                {
                  id: "room-123",
                  name: "Room 123",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-234",
                  name: "Room 234",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-345",
                  name: "Room 345",
                  type: "Room type name",
                  algorithmOn: "Yes",
                  programAssigned: "program test 1",
                  currentTemperature: "20°C",
                  assigned: true
                },
                {
                  id: "room-456",
                  name: "Room 456",
                  type: "Room type name",
                  algorithmOn: "Yes",
                  programAssigned: "program test 1",
                  currentTemperature: "20°C",
                  assigned: true
                },
                {
                  id: "room-567",
                  name: "Room 567",
                  type: "Room type name",
                  algorithmOn: true,
                  programAssigned: "Program 1",
                  currentTemperature: "20°C",
                  assigned: false
                }
              ]
            },
            {
              id: "floor-3",
              name: "Floor 3",
              roomsAssigned: 0,
              totalRooms: 5,
              rooms: [
                {
                  id: "room-123",
                  name: "Room 123",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-234",
                  name: "Room 234",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-345",
                  name: "Room 345",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-456",
                  name: "Room 456",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-567",
                  name: "Room 567",
                  type: "Room type name",
                  algorithmOn: true,
                  programAssigned: "Program 1",
                  currentTemperature: "20°C",
                  assigned: false
                }
              ]
            }
          ]
        },
        {
          id: "building-b",
          name: "Building B",
          roomsAssigned: 0,
          totalRooms: 15,
          floors: [
            {
              id: "floor-1",
              name: "Floor 1",
              roomsAssigned: 0,
              totalRooms: 5,
              rooms: [
                {
                  id: "room-123",
                  name: "Room 123",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-234",
                  name: "Room 234",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-345",
                  name: "Room 345",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-456",
                  name: "Room 456",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-567",
                  name: "Room 567",
                  type: "Room type name",
                  algorithmOn: true,
                  programAssigned: "Program 1",
                  currentTemperature: "20°C",
                  assigned: false
                }
              ]
            },
            {
              id: "floor-2",
              name: "Floor 2",
              roomsAssigned: 0,
              totalRooms: 5,
              rooms: [
                {
                  id: "room-123",
                  name: "Room 123",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-234",
                  name: "Room 234",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-345",
                  name: "Room 345",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-456",
                  name: "Room 456",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-567",
                  name: "Room 567",
                  type: "Room type name",
                  algorithmOn: true,
                  programAssigned: "Program 1",
                  currentTemperature: "20°C",
                  assigned: false
                }
              ]
            },
            {
              id: "floor-3",
              name: "Floor 3",
              roomsAssigned: 0,
              totalRooms: 5,
              rooms: [
                {
                  id: "room-123",
                  name: "Room 123",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-234",
                  name: "Room 234",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-345",
                  name: "Room 345",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-456",
                  name: "Room 456",
                  type: "Room type name",
                  algorithmOn: false,
                  programAssigned: null,
                  currentTemperature: "20°C",
                  assigned: false
                },
                {
                  id: "room-567",
                  name: "Room 567",
                  type: "Room type name",
                  algorithmOn: true,
                  programAssigned: "Program 1",
                  currentTemperature: "20°C",
                  assigned: false
                }
              ]
            }
          ]
        }
      ]
    }
  };
  const [switch1, setSwitch1] = useState(false);
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }
  const handleCloseModal = () => {
    handleOpenModal();
  };

  return (
    <>
      <Modal theme={customTheme}  size={"7xl"} dismissible show={openModal} onClose={handleCloseModal}>
        <Modal.Header className=" text-lg text-gray-900 [&>*]:font-semibold">Room123</Modal.Header>
        <Modal.Body className="p-5 overflow-hidden  h-auto">
          <div className=" flex items-start">
            <div className=" w-1/3 flex flex-col gap-4">
              <h3 className="text-[16px] text-gray-500 font-semibold">General Information</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-900 font-normal">
                <div className="flex flex-col gap-2">
                  <p className=" font-semibold">Program Name</p>
                  <p className="">Program 1</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className=" font-semibold">Child Safety</p>
                  <p className="">Yes</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className=" font-semibold flex items-center gap-1">
                    Minimum Temperature
                    <Tooltip
                      className="px-3 py-1.5 text-center max-w-96"
                      content="The minimum temperature that can be manually adjusted on the thermometer by physical means."
                      style="light"
                    >
                      <IoInformationCircleOutline color="#6B7280" />
                    </Tooltip>
                  </p>
                  <p className="">20°C</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className=" font-semibold flex items-center gap-1">
                    Maximum Temperature
                    <Tooltip
                      className="px-3 py-1.5 text-center max-w-96"
                      content="The maximum temperature that can be manually adjusted on the thermometer by physical means."
                      style="light"
                    >
                      <IoInformationCircleOutline color="#6B7280" />
                    </Tooltip>
                  </p>
                  <p className="">20°C</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className=" font-semibold  flex items-center gap-1">
                    Apply Algorithm?
                    <Tooltip
                      className="px-3 py-1.5 text-center max-w-96"
                      content="The minimum temperature that can be manually adjusted on the thermometer by physical means."
                      style="light"
                    >
                      <IoInformationCircleOutline color="#6B7280" />
                    </Tooltip>
                  </p>
                  <p className="">Yes</p>
                </div>
              </div>
            </div>
            <div className=" w-full border-l flex flex-col gap-4 border-gray-200 pl-4 ">
              <h3 className="text-[16px] text-gray-500 font-semibold">Heating Schedule</h3>
              {/* <ToggleSwitch checked={switch1} label="Toggle me" onChange={setSwitch1} /> */}
              <div>
                <label className='flex cursor-pointer select-none items-center gap-2'>
                  <div className='relative'>
                    <input
                      type='checkbox'
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className='sr-only'
                    />
                    <div
                      className={`box block h-5 !w-10 rounded-full ${
                        isChecked ? 'bg-primary' : ' bg-gray-200'
                      }`}
                    ></div>
                    <div
                      className={`absolute left-1 top-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
                        isChecked ? 'translate-x-full' : ''
                      }`}
                    ></div>
                  </div>
                  {!isChecked ? 
                    (<div className=" text-sm text-gray-900 font-medium">
                      View schedule adjusted by algorithm 
                    </div>)
                    :
                    (<div className=" text-sm text-gray-900 font-medium">
                      View original schedule
                    </div>)
                  }
                </label>

              </div>
              {!isChecked ? 
                (<div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
                  <HeatingScheduleTable initialLayouts={dummyData.finalScheduleData} noHeading={true} />
                </div>)
                :
                (<div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
                  <HeatingScheduleComparison initialLayouts={dummyData.finalScheduleData} noHeading={true} />
                </div>)}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>

            <Button className="bg-primary" >
              Edit
            </Button>

          <Button className="font-black" color="gray" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
