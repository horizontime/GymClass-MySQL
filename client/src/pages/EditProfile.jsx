// Page with form to edit profile. Able to edit first name, last name, email, current password, and membership type

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserAuthContext";

const EditProfile = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [isEditSuccessful, setIsEditSuccessful] = useState(false);
    const { isAuthenticated } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        membershipId: 1,
    });

    const [currentProfileData, setCurrentProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        membershipId: 1,
    });

    // Fetch current user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData(response.data);
                setCurrentProfileData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put("http://localhost:3000/api/user/profile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setModalTitle("Success");
                setModalContent(
                    <>
                        Profile updated successfully!
                        <br />
                        <br />
                        Changes to membership type will take effect in the next payment period.
                    </>
                );
                setModalVisible(true);
                setIsEditSuccessful(true);
            }
        } catch (error) {
            if (error.response) {
                setModalTitle("Error");
                setModalContent(error.response.data.message || "An error occurred.");
                setModalVisible(true);
                setIsEditSuccessful(false);
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        if (isEditSuccessful) {
            navigate("/");
            window.location.reload();
        }
    };

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
                    <h2 className="text-3xl font-bold mb-2 text-center text-indigo-700">
                        Edit Profile
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex-1">
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                First Name
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`mt-1 ${
                                        formData.firstName !== currentProfileData.firstName &&
                                        formData.firstName.trim() !== ""
                                            ? "w-2/3"
                                            : "w-full"
                                    } px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                                {formData.firstName !== currentProfileData.firstName &&
                                    formData.firstName.trim() !== "" && (
                                        <span className="text-red-500 text-sm ml-3 w-1/3">
                                            First name will be updated!
                                        </span>
                                    )}
                            </div>
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Last Name
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`mt-1 ${
                                        formData.lastName !== currentProfileData.lastName &&
                                        formData.lastName.trim() !== ""
                                            ? "w-2/3"
                                            : "w-full"
                                    } px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                                {formData.lastName !== currentProfileData.lastName &&
                                    formData.lastName.trim() !== "" && (
                                        <span className="text-red-500 text-sm ml-3 w-1/3">
                                            Last name will be updated!
                                        </span>
                                    )}
                            </div>
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-1 ${
                                        formData.email !== currentProfileData.email &&
                                        formData.email.trim() !== ""
                                            ? "w-2/3"
                                            : "w-full"
                                    } px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                                {formData.email !== currentProfileData.email &&
                                    formData.email.trim() !== "" && (
                                        <span className="text-red-500 text-sm ml-3 w-1/3">
                                            Email will be updated!
                                        </span>
                                    )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="currentPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                New Password (optional)
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className={`mt-1 ${
                                        formData.newPassword ? "w-2/3" : "w-full"
                                    } px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                                {formData.newPassword && (
                                    <span className="text-red-500 text-sm ml-3 w-1/3">
                                        Password will be updated!
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">
                                <label
                                    htmlFor="membershipId"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Membership Type
                                </label>
                                <div className="flex items-center">
                                    <select
                                        id="membershipId"
                                        name="membershipId"
                                        value={formData.membershipId}
                                        onChange={handleChange}
                                        required
                                        className={`mt-1 ${
                                            Number(formData.membershipId) !==
                                            Number(currentProfileData.membershipId)
                                                ? "w-2/3"
                                                : "w-full"
                                        } px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    >
                                        <option value={1}>
                                            Basic Membership - 12 classes a month
                                        </option>
                                        <option value={2}>
                                            Plus Membership - 16 classes a month
                                        </option>
                                        <option value={3}>Unlimited Membership</option>
                                    </select>
                                    {Number(formData.membershipId) !==
                                        Number(currentProfileData.membershipId) && (
                                        <span className="text-red-500 text-sm ml-3 w-1/3">
                                            Membership will be updated!
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Update Profile
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Want to go back?{" "}
                        <Link to="/" className="text-indigo-600 hover:text-indigo-500 font-medium">
                            Go to Home
                        </Link>
                    </p>
                </div>
                <Modal
                    isVisible={modalVisible}
                    title={modalTitle}
                    content={modalContent}
                    onClose={handleModalClose}
                />
            </div>
        </>
    );
};

export default EditProfile;
