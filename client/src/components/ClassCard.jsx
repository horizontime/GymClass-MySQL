import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MembershipDaysRemainingContext } from "../context/MembershipDaysRemainingContext";
import Modal from "./Modal";

const ClassCard = ({ time, coach, name, class_id, endTimeLongFormat }) => {
    const [isReserved, setIsReserved] = useState(false);
    const [isPastClass, setIsPastClass] = useState(false);
    const [isSameMonth, setIsSameMonth] = useState(true);    
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const { getMembershipDaysRemaining } = useContext(MembershipDaysRemainingContext);
    
    // Function to check if a class is reserved
    const checkReservationStatus = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(
                `http://localhost:3000/api/class/reservations/${class_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.isReserved) {
                setIsReserved(true);
            } else {
                setIsReserved(false);
            }
        } catch (error) {
            console.error("Error checking reservation status:", error);
        }
    };

    // Checks if class is reserved, or if class date has passed, or if class is in the future. For setting "Reserve" button alternatives.
    useEffect(() => {
        checkReservationStatus();

        const currentDate = new Date();
        const classDate = new Date(endTimeLongFormat);

        // Check if class is in the past
        if (classDate < currentDate) {
            setIsPastClass(true);
        } else {
            setIsPastClass(false);
        }

        // Check if the class is in the same month as the current date.
        if (
            currentDate.getMonth() !== classDate.getMonth() ||
            currentDate.getFullYear() !== classDate.getFullYear()
        ) {
            setIsSameMonth(false);
        } else {
            setIsSameMonth(true);
        }
    }, [class_id, endTimeLongFormat]);

    const handleReserve = async () => {
        const token = localStorage.getItem("token");
        try {
            if (isReserved) {
                // If already reserved, unreserve the class
                await axios.delete("http://localhost:3000/api/class/unreserve_class", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: { class_id },
                });
                setIsReserved(false);
            } else {
                // If not reserved, reserve the class
                await axios.post(
                    "http://localhost:3000/api/class/reserve_class",
                    { class_id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsReserved(true);
            }
            getMembershipDaysRemaining();
        } catch (error) {
            console.error("Error reserving/unreserving spot:", error);
            if (getMembershipDaysRemaining()) {
                setModalTitle("Sorry!");
                setModalContent("No more days left on your membership.");
            } else {
                setModalTitle("Error");
                setModalContent("Failed to process your request. Please try again.");
            }
            setModalVisible(true);
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <div className="bg-gray-100 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <p className="font-semibold text-lg mb-2">{name}</p>
            <p className="text-sm text-gray-600 mb-1">{time}</p>
            <p className="text-sm text-gray-600 mb-3">Coach: {coach}</p>
            <button
                onClick={isPastClass || !isSameMonth ? null : handleReserve} // Disable click if the class date has passed or is not in the same month
                className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isPastClass || !isSameMonth
                        ? "cursor-default bg-gray-400 text-gray-700"
                        : isReserved
                        ? "cursor-pointer bg-red-700 text-white"
                        : "cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                } `}
                disabled={isPastClass || !isSameMonth} // Disable the button if the class date has passed or is not in the same month
            >
                {isPastClass
                    ? "No Longer Available"
                    : !isSameMonth
                    ? "Not Available Yet"
                    : isReserved
                    ? "Cancel Reservation"
                    : "Reserve"}
            </button>
            <Modal
                isVisible={modalVisible}
                title={modalTitle}
                content={modalContent}
                onClose={handleModalClose}
            />
        </div>
    );
};

export default ClassCard;
