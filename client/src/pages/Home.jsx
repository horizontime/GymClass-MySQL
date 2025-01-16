// Home page after logging in. Displays weekly overview of classes to reserve.

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Navbar from "../components/Navbar";
import DatePickerComponent from "../components/DatePickerComponent";
import WeeklyHeader from "../components/WeeklyHeader";
import WeeklyOverview from "../components/WeeklyOverview";
import { useUser } from "../context/UserAuthContext";

const Home = () => {
    const [currentDay, setCurrentDay] = useState(dayjs());
    const [today, setToday] = useState(0);
    const [isScreenWidthLessThan1200, setIsScreenWidthLessThan1200] = useState(false);

    const { isAuthenticated } = useUser();

    const handleDateChange = (newDate) => {
        setCurrentDay(newDate);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsScreenWidthLessThan1200(window.innerWidth < 1200);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-end mb-4">
                    {currentDay.date() !== dayjs().date() && (
                        <button
                            onClick={() => setCurrentDay(dayjs())}
                            className="p-2 font-semibold rounded-full hover:bg-gray-200 mr-4 border border-gray-300"
                        >
                            Current Week
                        </button>
                    )}
                    <DatePickerComponent value={currentDay} onChange={handleDateChange} />
                </div>
                <WeeklyHeader currentDay={currentDay} setCurrentDay={setCurrentDay} />
                <WeeklyOverview
                    isScreenWidthLessThan1200={isScreenWidthLessThan1200}
                    today={today}
                    setToday={setToday}
                    currentDay={currentDay}
                />
            </div>
        </div>
    );
};

export default Home;
