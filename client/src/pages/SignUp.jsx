// Signup page. Asks for first name, last name, email, password, and membership type to sign up.

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../components/Modal";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        membershipId: 1,
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, 
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", formData);
            if (response.status === 201) {
                setModalTitle("Success");
                setModalContent("Welcome! User created successfully.");
                setModalVisible(true);
                setIsSignUpSuccessful(true);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setModalTitle("Error");
                    setModalContent("User already exists.");
                    setModalVisible(true);
                    setIsSignUpSuccessful(false);
                } else {
                    console.error("Error:", error.response.data.message);
                }
            } else if (error.request) {
                console.error("Error: No response received from the server");
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        if (isSignUpSuccessful) {
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="membershipId"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Membership Type
                        </label>
                        <select
                            type="number"
                            id="membershipId"
                            name="membershipId"
                            value={formData.membershipId}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value={1}>Basic Membership - 12 classes a month</option>
                            <option value={2}>Plus Membership - 16 classes a month</option>
                            <option value={3}>Unlimited Membership</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Log in
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
    );
};

export default Signup;
