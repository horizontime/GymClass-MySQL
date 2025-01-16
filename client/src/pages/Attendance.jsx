// Displays two tables, one for upcoming classes and one for attended classes 

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import TableComponent from "../components/TableComponent";
import { useUser } from "../context/UserAuthContext";

const Attendance = () => {
    const { isAuthenticated } = useUser();
    const [currentPageAttendedClasses, setCurrentPageAttendedClasses] = useState(1);
    const [currentPageUpcomingClasses, setCurrentPageUpcomingClasses] = useState(1);
    const [attendedClassesData, setAttendedClassesData] = useState([]);
    const [upcomingClassesData, setUpcomingClassesData] = useState([]);
    const [pageLimitAttendedClasses, setPageLimitAttendedClasses] = useState(10);
    const [pageLimitUpcomingClasses, setPageLimitUpcomingClasses] = useState(5);

    useEffect(() => {
        const fetchUpcomingClasses = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:3000/api/user/profile/attendance?attendanceType=upcoming&page=${currentPageUpcomingClasses}&limit=${pageLimitUpcomingClasses}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUpcomingClassesData(response.data);
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchUpcomingClasses();
    }, [currentPageUpcomingClasses, pageLimitUpcomingClasses]);

    useEffect(() => {
        const fetchAttendedClasses = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:3000/api/user/profile/attendance?attendanceType=past&page=${currentPageAttendedClasses}&limit=${pageLimitAttendedClasses}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAttendedClassesData(response.data);
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchAttendedClasses();
    }, [currentPageAttendedClasses, pageLimitAttendedClasses]);

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center">
                <TableComponent
                    theme="indigo"
                    title="Upcoming Classes"
                    data={upcomingClassesData}
                    pageLimit={pageLimitUpcomingClasses}
                    setPageLimit={setPageLimitUpcomingClasses}
                    currentPage={currentPageUpcomingClasses}
                    setCurrentPage={setCurrentPageUpcomingClasses}
                    resultsPerPage={[5, 10, 15, 20]}
                />
                <TableComponent
                    theme="gray"
                    title="Attendance History"
                    data={attendedClassesData}
                    pageLimit={pageLimitAttendedClasses}
                    setPageLimit={setPageLimitAttendedClasses}
                    currentPage={currentPageAttendedClasses}
                    setCurrentPage={setCurrentPageAttendedClasses}
                    resultsPerPage={[10, 25, 50, 100]}
                />
            </div>
        </>
    );
};

export default Attendance;
