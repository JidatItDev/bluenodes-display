import React, { useState, useEffect } from "react";
import { Progress, Button } from "flowbite-react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";

import CheckIcon from "./components/CheckCircle";
import Accordion from "./components/Accordion";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_PATH } from "../../../globals/navPaths";

const OnboardingStep = ({ title, completed, isActive, onClick }) => {
  return (
    <div
      className={`flex justify-between items-center px-2 py-2 rounded-md mb-2 cursor-pointer hover:bg-gray-100 ${
        isActive ? "bg-gray-100" : ""
      }`} // Apply 'bg-gray-200' if the step is active
      onClick={onClick}
    >
      <span className="pl-4 font-normal text-sm  text-gray-900">{title}</span>

      {/* {completed && <CheckIcon checked={completed} />} */}
      {completed && (
        <span className="text-primary   ">
          <IoCheckmarkCircle className="w-[20px] h-[20px] text-[20px]" />
        </span>
      )}
    </div>
  );
};

const VideoPlayer = ({ videoSrc }) => {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden">
      <iframe
        src={videoSrc}
        webkitAllowFullScreen
        mozAllowFullScreen
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
};

const Onboarding = () => {
  const sections = [
    {
      title: "Getting Started",
      steps: ["Introduction to BlueNodes", "Setting Up Your Account"],
    },
    {
      title: "Managing Your Devices",
      steps: [
        "Adding and Configuring Thermostats",
        "Scheduling and Automation",
      ],
    },
    {
      title: "Monitoring and Optimization",
      steps: [
        "Real-Time Monitoring and Insights",
        "Energy Savings and Reports",
      ],
    },
    {
      title: "Advanced Features and Support",
      steps: ["Advanced Customization Options", "Troubleshooting and Support"],
    },
  ];

  const videos = [
    "https://www.loom.com/embed/d08c6dd0ae66405e9573170c4faae7d6?autoplay=0",
    "https://www.loom.com/embed/d08c6dd0ae66405e9573170c4faae7d6?autoplay=2",
    "https://www.loom.com/embed/d08c6dd0ae66405e9573170c4faae7d6?autoplay=3",
    "https://www.loom.com/embed/d08c6dd0ae66405e9573170c4faae7d6?autoplay=4",
    "https://www.loom.com/embed/d08c6dd0ae66405e9573170c4faae7d6?autoplay=5",
    "https://www.loom.com/embed/d08c6dd0ae66405e9573170c4faae7d6?autoplay=6",
    "https://www.loom.com/embed/d08c6dd0ae66405e9573170c4faae7d6?autoplay=7",
    "https://www.loom.com/embed/d08c6dd0ae66405e9573170c4faae7d6?autoplay=8",
  ];

  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [openSectionIndex, setOpenSectionIndex] = useState(0);
  const [openIndices, setOpenIndices] = useState([0]); // Initialize first section as open
  const navigate = useNavigate();

  const allSteps = sections.flatMap((section) => section.steps);

  // const handleStepComplete = () => {
  //   const currentStep = allSteps[currentStepIndex];
  //   setCompletedSteps((prev) => ({ ...prev, [currentStep]: true }));
  //   setProgress((prev) => Math.min(prev + 100 / allSteps.length, 100));

  //   if (currentStepIndex < allSteps.length - 1) {
  //     setCurrentStepIndex((prev) => prev + 1);
  //   }

  //   const currentSectionIndex = sections.findIndex((section) =>
  //     section.steps.includes(currentStep)
  //   );
  //   // setOpenIndices([currentSectionIndex]);
  //   const completedInSection = sections[currentSectionIndex].steps.filter(
  //     (step) => completedSteps[step] || step === currentStep
  //   ).length;

  //   if (completedInSection === 2 && openSectionIndex < sections.length - 1) {
  //     setOpenIndices((prev) => [...prev, openSectionIndex + 1]);
  //     setOpenSectionIndex((prev) => prev + 1);
  //   }
  // };

  const handleComplete = () => {
    const currentStep = allSteps[currentStepIndex];

    // Only mark the current step as complete if it's not already marked
    if (!completedSteps[currentStep]) {
      setCompletedSteps((prev) => ({ ...prev, [currentStep]: true }));

      // Update progress based on the total number of steps
      const completedStepCount = Object.keys(completedSteps).length + 1; // +1 for the current step being marked
      const newProgress = (completedStepCount / allSteps.length) * 100;

      setProgress(newProgress);
    }
  };
  const handleStepComplete = () => {
    const currentStep = allSteps[currentStepIndex];

    // Mark the current step as completed
    // setCompletedSteps((prev) => ({ ...prev, [currentStep]: true }));
    // setProgress((prev) => Math.min(prev + 100 / allSteps.length, 100));

    // Move to the next step if not at the last step
    if (currentStepIndex < allSteps.length - 1) {
      setCurrentStepIndex((prev) => {
        const newIndex = prev + 1;
        // Open the section of the next step
        const nextSectionIndex = sections.findIndex((section) =>
          section.steps.includes(allSteps[newIndex])
        );
        setOpenIndices([nextSectionIndex]); // Only keep the next section open
        return newIndex;
      });
    }

    const currentSectionIndex = sections.findIndex((section) =>
      section.steps.includes(currentStep)
    );

    const completedInSection = sections[currentSectionIndex].steps.filter(
      (step) => completedSteps[step] || step === currentStep
    ).length;

    // Optionally, open the next section if all steps in the current section are completed
    if (completedInSection === 2 && openSectionIndex < sections.length - 1) {
      setOpenIndices((prev) => [...prev, openSectionIndex + 1]);
      setOpenSectionIndex((prev) => prev + 1);
    }
  };

  // const handlePreviousStep = () => {
  //   if (currentStepIndex > 0) {
  //     setCurrentStepIndex((prev) => prev - 1);

  //     const currentStep = allSteps[currentStepIndex - 1];
  //     const currentSectionIndex = sections.findIndex((section) =>
  //       section.steps.includes(currentStep)
  //     );

  //     // Ensure the accordion opens the correct section on 'Previous'
  //     setOpenIndices([currentSectionIndex]);
  //   }
  // };
  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => {
        const newIndex = prev - 1;
        // Open the section of the previous step
        const prevSectionIndex = sections.findIndex((section) =>
          section.steps.includes(allSteps[newIndex])
        );
        setOpenIndices([prevSectionIndex]); // Only keep the previous section open
        return newIndex;
      });
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < allSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);

      const currentStep = allSteps[currentStepIndex + 1];
      const currentSectionIndex = sections.findIndex((section) =>
        section.steps.includes(currentStep)
      );

      // Ensure the accordion opens the correct section on 'Next'
      setOpenIndices([currentSectionIndex]);
    }
  };

  const accordionItems = sections.map((section, sectionIndex) => ({
    title: section.title,
    content: (
      <div>
        {section.steps.map((step, stepIndex) => {
          const globalStepIndex = allSteps.indexOf(step);

          return (
            <OnboardingStep
              key={stepIndex}
              title={step}
              completed={!!completedSteps[step]}
              isActive={globalStepIndex === currentStepIndex}
              onClick={() => setCurrentStepIndex(globalStepIndex)}
            />
          );
        })}
      </div>
    ),
  }));
  const handleToggle = (index) => {
    setOpenIndices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  useEffect(() => {
    setOpenIndices([0]);
  }, []);

  return (
    <div className="container mx-auto p-4 !pl-0 !ml-0  flex">
      <div className="w-1/3 pr-4">
        <h2 className="text-2xl text-gray-900 font-medium mb-4">Onboarding</h2>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-base text-gray-900 font-medium">
              Your progress
            </span>
            <span className="text-gray-500 text-sm font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress
            className="[&>div]:bg-[#0BAAC9] "
            progress={progress}
            size="md"
          />
        </div>
        <div className="h-px bg-gray-200 w-full mt-6 mb-2"></div>
        <Accordion
          items={accordionItems}
          openIndices={openIndices}
          onItemClick={handleToggle}
        />
      </div>
      <div
        className="w-2/3 p-4 bg-white border-gray-200 rounded-lg"
        style={{ border: "1px solid var(--gray-200, #E5E7EB)" }}
      >
        <VideoPlayer videoSrc={videos[currentStepIndex]} />
        <div className="mt-4">
          <div className="flex flex-col gap-[8px] mb-4">
            <div className="flex justify-between items-center ">
              <div className="text-primary text-[14px] font-semibold font-inter">
                {
                  sections.find((section) =>
                    section.steps.includes(allSteps[currentStepIndex])
                  )?.title
                }
              </div>
              <div onClick={handleComplete}>
                <CheckIcon
                  checked={completedSteps[allSteps[currentStepIndex]]}
                />
              </div>
            </div>
            <div className="text-gray-900 text-[20px] font-semibold font-inter">
              {allSteps[currentStepIndex]}
            </div>
          </div>
          <p className="text-gray-900 text-[16px] font-normal font-inter leading-[24px]">
            Learn the basics of how BlueNodes can automate your heating system
            for maximum efficiency and comfort. Understand the key features that
            will help you save energy and reduce costs.
          </p>
          <div className="mt-7 mb-4">
            <div className="flex justify-between mt-4">
              <Button
                onClick={handlePreviousStep}
                disabled={currentStepIndex === 0}
                className=" w-[120px] h-[41px] px-5 py-2.5 gap-2 font-inter flex items-center justify-center  text-black bg-white border border-gray-300 rounded-lg hover:!bg-gray-200 focus:outline-none focus:ring-0"
                pill={false}
              >
                <FaAngleLeft className="mr-1.5 h-4 w-4 mt-[1.5px]" />
                <p className="text-[14px] ml-1 font-inter font-medium text-gray-900">Previous</p>
              </Button>
              <Button
                onClick={() => {
                  if (currentStepIndex === 7 && progress === 100) {
                    navigate(`${NAVIGATION_PATH.dashboardLayout}`);
                  } else {
                    handleStepComplete();
                  }
                }}
                className="w-[120px] h-[41px] px-5 py-2.5 gap-2 rounded-lg border border-gray-300 opacity-100 bg-white hover:!bg-gray-200 text-black flex items-center justify-center focus:outline-none focus:ring-0"
              >
                <p className="font-inter font-medium text-gray-900 text-[14px]">
                  {currentStepIndex === 7 && progress === 100
                    ? "Complete"
                    : "Next"}
                </p>
                <FaAngleRight className="ml-2 h-4 w-4 mt-[1.5px] font-inter" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
