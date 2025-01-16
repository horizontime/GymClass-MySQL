import React, { useEffect, useState } from "react";
import axios from "axios";
import ClassCard from "./ClassCard";

const DayCard = ({ day, currentDay, daysOfWeek }) => {
    const [classes, setClasses] = useState([]);

    // format for API call: YYYY-MM-DD
    const dateForDatabase = currentDay
        .add(daysOfWeek.indexOf(day) - currentDay.day() + 1, "day")
        .format("YYYY-MM-DD");

    // format for JSX being displayed: MM/DD
    const formattedDate = currentDay
        .add(daysOfWeek.indexOf(day) - currentDay.day() + 1, "day")
        .format("MM/DD");

    // Fetches array of classes for each day
    useEffect(() => {
        const getDaySchedule = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/class/by_date", {
                    params: {
                        date: dateForDatabase,
                    },
                });
                setClasses(response.data.classes);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };

        getDaySchedule();
    }, [dateForDatabase]);

    return (
        <div
            className="bg-white rounded-lg shadow-md w-full overflow-y-auto text-center cursor-default"
            style={{ height: "fit-content" }}
        >
            <h3 className="text-lg font-semibold top-2 bg-white py-2 ">
                {day} {formattedDate}
            </h3>
            <div className="space-y-4 ">
                {classes.map((classInfo, index) => (
                    <ClassCard key={index} {...classInfo} />
                ))}
            </div>
        </div>
    );
};

export default DayCard;
