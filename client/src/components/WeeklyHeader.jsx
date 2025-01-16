import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const WeeklyHeader = ({ currentDay, setCurrentDay }) => {
    const handlePrevWeek = () => {
        setCurrentDay(currentDay.subtract(7, "day"));
    };

    const handleNextWeek = () => {
        setCurrentDay(currentDay.add(7, "day"));
    };

    return (
        <div className="flex justify-between items-center mb-6 sticky top-[4.5rem] z-5 bg-white p-4 shadow-md rounded-md">
            <button onClick={handlePrevWeek} className="rounded-full hover:bg-gray-200">
                <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold">
                <span className="font-serif italic text-indigo-600">
                    Week of {currentDay.format("MMMM D, YYYY")}
                </span>
            </h2>
            <div className="flex items-center">
                <button onClick={handleNextWeek} className="rounded-full hover:bg-gray-200">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default WeeklyHeader;
