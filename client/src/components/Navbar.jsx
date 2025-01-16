import React, { useState, useEffect, useContext } from "react";
import { User } from "react-feather";
import { useNavigate } from "react-router-dom";
import { MembershipDaysRemainingContext } from "../context/MembershipDaysRemainingContext";
import { useUser } from "../context/UserAuthContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { membershipDaysRemaining } = useContext(MembershipDaysRemainingContext);
    const { user } = useUser();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleEditProfileClick = () => {
        navigate("/EditProfile");
        setIsMenuOpen(false);
    };

    const handleAttendanceClick = () => {
        navigate("/Attendance");
        setIsMenuOpen(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        navigate("/login");
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-indigo-600 text-white p-4 sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-baseline">
                    <div
                        className="text-3xl font-bold cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        GymClass
                    </div>
                    <span className="mx-2 text-3xl text-indigo-500">|</span>
                    <h2 className="text-xl font-sans font-bold italic text-indigo-300">
                        Welcome, {user.firstname}!
                    </h2>
                </div>
                <div className="flex items-center space-x-4">
                    {membershipDaysRemaining !== null && (
                        <div className="bg-white text-indigo-600 rounded-full px-3 py-1 text-sm font-semibold">
                            Classes left:{" "}
                            {membershipDaysRemaining > 100 ? "Unlimited" : membershipDaysRemaining}
                        </div>
                    )}
                    <div className="relative">
                        <button
                            className="p-2 rounded-full hover:bg-indigo-700 transition-colors duration-200"
                            onClick={toggleMenu}
                        >
                            <User className="w-6 h-6" />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-indigo-100"
                                    onClick={handleEditProfileClick}
                                >
                                    Edit Profile
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-indigo-100"
                                    onClick={handleAttendanceClick}
                                >
                                    View Attendance
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-indigo-100"
                                    onClick={handleLogoutClick}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
