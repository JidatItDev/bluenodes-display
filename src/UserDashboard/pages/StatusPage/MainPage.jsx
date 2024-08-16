import { useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaTablet } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Tooltip } from "flowbite-react";
import EventLogsTable from "./components/EventLogsTable";
import ErrorLogsTable from "./components/ErrorLogsTable";
import UnassignedTable from "./components/UnassignedTable";
import OfflineTable from "./components/OfflineTable";
import { tableData } from "./components/data/tableData";
import { deviceData } from "./components/data/deviceData";
import celeAnimation from "../../../assets/icons/celeb.gif";

const Loader = () => (
	<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 opacity-75 z-50">
		<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
	</div>
);

function MainPage() {
	const [activeCard, setActiveCard] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleCardClick = (card) => {
		setLoading(true);
		setTimeout(() => {
			setActiveCard(card);
			setLoading(false);
		}, 500); // Simulate a 500ms delay to show the loader
	};

	const handleBackClick = () => {
		setLoading(true);
		setTimeout(() => {
			setActiveCard(null);
			setLoading(false);
		}, 500);
	};

	return (
		<>
			{loading && <Loader />}
			<div
				className={`flex flex-col gap-6 transition-opacity duration-500 ${loading ? "opacity-50" : "opacity-100"}`}
			>
				<h2 className="text-[24px] text-gray-900">Status Page</h2>
				<div className="w-full flex flex-col gap-4">
					<div className="flex flex-col">
						<h2 className="text-[18px] text-gray-900 flex items-center gap-3">
							Reports Summary
							{activeCard && (
								<Tooltip
									className="min-w-[130px]"
									content="Back to event Logs"
									style="light"
									animation="duration-500"
								>
									<h3
										onClick={handleBackClick}
										className="text-[16px] text-primary font-normal flex items-center gap-2 cursor-pointer hover:scale-95"
									>
										<IoMdArrowRoundBack className="text-2xl text-primary" />
										Back to event Logs
									</h3>
								</Tooltip>
							)}
						</h2>
						<p className="text-sm text-gray-500">
							Click on card to view details
						</p>
					</div>
					<div className="flex gap-4">
						<div
							onClick={() => handleCardClick("generalError")}
							className={`w-1/3 bg-white flex p-6 gap-4 rounded-lg shadow-sm items-center justify-start transition-transform duration-300 ${
								activeCard === "generalError"
									? "ring-primary-400 ring-2 scale-105"
									: "hover:ring-primary-200 hover:ring-2 cursor-pointer"
							}`}
						>
							<div className="bg-red-100 text-red-700 p-3 text-2xl rounded-lg">
								<AiFillExclamationCircle />
							</div>
							<div className="flex flex-col">
								<p className="text-gray-900 font-bold">123</p>
								<p className="text-base text-gray-500 font-normal">
									Errors occurred
								</p>
							</div>
						</div>
						<div
							onClick={() => handleCardClick("unassignedError")}
							className={`w-1/3 bg-white flex p-6 gap-4 rounded-lg shadow-sm items-center justify-start transition-transform duration-300 ${
								activeCard === "unassignedError"
									? "ring-primary-400 ring-2 scale-105"
									: "hover:ring-primary-200 hover:ring-2 cursor-pointer"
							}`}
						>
							<div className="bg-green-100 text-green-700 p-3 text-2xl rounded-lg">
								<FaBuilding />
							</div>
							<div className="flex flex-col">
								<p className="text-gray-900 font-bold">123/1234</p>
								<p className="text-base text-gray-500 font-normal">
									Rooms unassigned
								</p>
							</div>
						</div>
						<div
							onClick={() => handleCardClick("offlineError")}
							className={`w-1/3 bg-white flex p-6 gap-4 rounded-lg shadow-sm items-center justify-start transition-transform duration-300 ${
								activeCard === "offlineError"
									? "ring-primary-400 ring-2 scale-105"
									: "hover:ring-primary-200 hover:ring-2 cursor-pointer"
							}`}
						>
							<div className="bg-yellow-100 text-yellow-700 p-3 text-2xl rounded-lg">
								<FaTablet />
							</div>
							<div className="flex flex-col">
								<p className="text-gray-900 font-bold">100/1234</p>
								<p className="text-base text-gray-500 font-normal">
									Devices Offline
								</p>
							</div>
						</div>
					</div>
				</div>
				{!activeCard && !loading && <EventLogsTable tableData={tableData} />}
				{activeCard === "generalError" && (
					<ErrorLogsTable tableData={tableData} />
				)}
				{activeCard === "unassignedError" && (
					<UnassignedTable tableData={tableData} />
				)}
				{activeCard === "offlineError" && (
					<OfflineTable tableData={deviceData} />
				)}
			</div>
		</>
	);
}

const Card = () => {
	return (
		<div className="max-w-md px-6 pb-6 pt-4 bg-[#E7F9FD] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<div className="flex flex-row relative justify-start items-end">
				<h5 className="text-2xl font-semibold text-gray-900 dark:text-white">
					Everything is going well
				</h5>
				<img className="w-[40px] h-[39px]" src={celeAnimation} alt="" />
			</div>
			<p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm">
				Sit back and relax, we will alert you if any error(s) appear in your
				system.
			</p>
		</div>
	);
};

export default MainPage;
