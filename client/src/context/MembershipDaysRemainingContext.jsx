import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MembershipDaysRemainingContext = createContext();

// Fetches the number of days remaining of the signed-in user's membership 
export const MembershipDaysRemainingProvider = ({ children }) => {
    const [membershipDaysRemaining, setMembershipDaysRemaining] = useState(null);

    const token = localStorage.getItem("token");

    const getMembershipDaysRemaining = async () => {
        if (!token) return;

        try {
            const response = await axios.get("http://localhost:3000/api/user/days_remaining", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMembershipDaysRemaining(response.data.days_remaining);
        } catch (error) {
            console.error("Error fetching classes left:", error);
        }
    };

    useEffect(() => {
        getMembershipDaysRemaining();
    }, []);

    return (
        <MembershipDaysRemainingContext.Provider
            value={{ membershipDaysRemaining, getMembershipDaysRemaining }}
        >
            {children}
        </MembershipDaysRemainingContext.Provider>
    );
};
