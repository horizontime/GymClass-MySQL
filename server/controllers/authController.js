import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../config/db.js";
import "dotenv/config";

// Registers a new user. Checks if user already exists, returns error if they do, otherwise creates a new user
export const signup = async (req, res) => {
    const { firstName, lastName, email, password, membershipId } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            "INSERT INTO users (firstname, lastname, email, password, membership_id) VALUES (?, ?, ?, ?, ?)",
            [firstName, lastName, email, hashPassword, membershipId]
        );

        const userId = result.insertId; // Get the ID of the newly created user

        // Determine days_remaining to set based on membership_id
        let daysRemaining;
        switch (Number(membershipId)) {
            case 1:
                daysRemaining = 12;
                break;
            case 2:
                daysRemaining = 16;
                break;
            case 3:
                daysRemaining = 999;
                break;
            default:
                daysRemaining = 0;
        }

        // Insert days_remaining into membership_remaining table
        await db.query("INSERT INTO membership_remaining (user_id, days_remaining) VALUES (?, ?)", [
            userId,
            daysRemaining,
        ]);

        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

// Logs in a user. Checks if user exists, returns error if they don't, otherwise returns a token
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: "Email or password is incorrect." });
        }
        const isMatch = await bcrypt.compare(password, rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email or password is incorrect." });
        }
        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "3h",
        });

        return res.status(201).json({ token: token });
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

// Verifies a token. This is used to protect the React routes for the app
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        if (!token) {
            return res.status(403).json({ message: "No Token Provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id; // now the req.userId can be used in the routes that follow

        next();
    } catch (err) {
        return res.status(500).json({ message: "server error" });
    }
};
