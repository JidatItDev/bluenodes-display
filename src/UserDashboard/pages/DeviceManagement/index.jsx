import DeviceManagementTable from "./components/DeviceManagementTable";
import { deviceData } from "./components/data/deviceData";

const index = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h2 className="text-[24px] text-gray-900">Geräteverwaltung</h2>
        <div className="flex flex-col items-center justify-center w-full">
          {deviceData && <DeviceManagementTable Data={deviceData} />}
        </div>
      </div>
    </>
  );
};

export default index;
