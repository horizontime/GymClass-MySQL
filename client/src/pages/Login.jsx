// Login page. Asks for email and password to login. Gives an option to go to the sign up page.

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");

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
            const response = await axios.post("http://localhost:3000/api/auth/login", formData);
            if (response.status === 201) {
                localStorage.setItem("token", response.data.token);
                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            setModalTitle("Error");
            setModalContent("Username or password is incorrect. Please try again.");
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
            <Modal
                isVisible={modalVisible}
                title={modalTitle}
                content={modalContent}
                onClose={closeModal}
            />
        </div>
    );
};

export default Login;
