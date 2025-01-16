import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserAuthProvider } from "./context/UserAuthContext";
import { MembershipDaysRemainingProvider } from "./context/MembershipDaysRemainingContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import Attendance from "./pages/Attendance";

const App = () => {
    return (
        <Router>
            <UserAuthProvider>
                <MembershipDaysRemainingProvider>
                    <Routes>
                        <Route path="/Login" element={<Login />} />
                        <Route path="/SignUp" element={<SignUp />} />
                        <Route path="/EditProfile" element={<EditProfile />} />
                        <Route path="/Attendance" element={<Attendance />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </MembershipDaysRemainingProvider>
            </UserAuthProvider>
        </Router>
    );
};

export default App;
