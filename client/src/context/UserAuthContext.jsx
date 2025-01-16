import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const UserAuthContext = createContext();

// This provider is used to protect routes that require authentication
// It checks if a user is signed-in, otherwise redirects them to the login page
export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");

    const fetchUser = async () => {
        if (!token && location.pathname.toLowerCase() !== "/signup") {
            navigate("/login");
        }

        try {
            const response = await axios.get("http://localhost:3000/api/user/home", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                setUser(response.data);
                setIsAuthenticated(true);
                navigate("/");
            }
        } catch (err) {
            setIsAuthenticated(false);
            if (location.pathname.toLowerCase() !== "/signup") {
                navigate("/login");
            }
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [isAuthenticated]);

    return (
        <UserAuthContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserAuthContext);
};
