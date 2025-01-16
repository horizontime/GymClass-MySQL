import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import DayCard from "./DayCard";

const WeeklyOverview = ({ isScreenWidthLessThan1200, today, setToday, currentDay }) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const handlePrevDay = () => {
        setToday((today - 1 + daysOfWeek.length) % daysOfWeek.length); // "+ daysOfWeek.length" to handle negative indices, for mod to work proplerly
    };

    const handleNextDay = () => {
        setToday((today + 1) % daysOfWeek.length);
    };

    return (
        <div className="flex gap-4 justify-center ">
            {isScreenWidthLessThan1200 ? ( 
                <>
                    <button onClick={handlePrevDay} className="p-2 rounded-full hover:bg-gray-200">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <DayCard
                        day={daysOfWeek[today]}
                        currentDay={currentDay}
                        daysOfWeek={daysOfWeek}
                    />
                    <button onClick={handleNextDay} className="p-2 rounded-full hover:bg-gray-200">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            ) : (
                daysOfWeek.map((day, index) => (
                    <DayCard
                        key={index}
                        day={day}
                        currentDay={currentDay}
                        daysOfWeek={daysOfWeek}
                    />
                ))
            )}
        </div>
    );
};

export default WeeklyOverview;
