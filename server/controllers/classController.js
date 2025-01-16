import { connectToDatabase } from "../config/db.js";

// Returns the classes for a given date. Date must be in 'yyyy-mm-dd' format
export const getClassesByDate = async (req, res) => {
    const { date } = req.query; 

    if (!date) {
        return res.status(400).json({ error: "Date is required" });
    }

    try {
        const db = await connectToDatabase();

        const [rows] = await db.execute(
            `
            SELECT 
                DATE_FORMAT(c.start_time, '%l:%i %p') AS time,
                DATE_FORMAT(c.end_time, '%Y-%m-%d %H:%i:%s') AS endTimeLongFormat,
                co.name AS coach,
                cc.name AS name,
                c.id AS class_id
            FROM 
                classes c
            JOIN 
                coaches co ON c.coach_id = co.id
            JOIN 
                class_categories cc ON c.category_id = cc.id
            WHERE 
                DATE(c.start_time) = ?
            ORDER BY 
                c.start_time ASC`,
            [date]
        );

        res.json({ classes: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching classes" });
    }
};

// Reserves a class for the user, if the user has at least one day of membership left
export const reserveClass = async (req, res) => {
    try {
        const db = await connectToDatabase();

        // Check if the user exists
        const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [req.userId]);

        if (userRows.length === 0) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Check if user has at least one day of membership left
        const [reservationRows] = await db.query(
            "SELECT days_remaining FROM membership_remaining WHERE user_id = ?",
            [req.userId]
        );
        if (reservationRows[0].days_remaining === 0) {
            return res.status(403).json({ message: "No membership days left" });
        }

        // Get the class_id from the request body
        const { class_id } = req.body;

        // Insert the reservation into the class_signups table
        const [result] = await db.query(
            "INSERT INTO class_signups (user_id, class_id) VALUES (?, ?)",
            [req.userId, class_id]
        );

        // Check if the insert was successful
        if (result.affectedRows === 0) {
            return res.status(500).json({ message: "Failed to reserve the class" });
        }

        // Subtract one day of membership
        const [result2] = await db.query(
            "UPDATE membership_remaining SET days_remaining = days_remaining - 1 WHERE user_id = ?",
            [req.userId]
        );

        // Check if the membership update was successful
        if (result2.affectedRows === 0) {
            return res.status(500).json({
                message: "Failed to update membership days remaining",
            });
        }

        // Return a success response
        return res.status(201).json({
            message: "Class reserved successfully",
            signupId: result.insertId,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Checks if a class is reserved by a user
export const getReservations = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { class_id } = req.params;

        // Check if the user exists
        const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [req.userId]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Check if the class is reserved by the user
        const [reservationRows] = await db.query(
            "SELECT * FROM class_signups WHERE user_id = ? AND class_id = ?",
            [req.userId, class_id]
        );

        // Return the reservation status
        return res.status(200).json({ isReserved: reservationRows.length > 0 });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Unreserves a class for the user
export const unreserveClass = async (req, res) => {
    try {
        const db = await connectToDatabase();

        // Check if the user exists
        const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [req.userId]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Get the class_id from the request body
        const { class_id } = req.body;

        // Delete the reservation from the class_signups table
        const [result] = await db.query(
            "DELETE FROM class_signups WHERE user_id = ? AND class_id = ?",
            [req.userId, class_id]
        );

        // Check if the delete was successful
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        // Add one day of membership
        const [result2] = await db.query(
            "UPDATE membership_remaining SET days_remaining = days_remaining + 1 WHERE user_id = ?",
            [req.userId]
        );

        // Check if the membership update was successful
        if (result2.affectedRows === 0) {
            return res.status(500).json({
                message: "Failed to update membership days remaining",
            });
        }

        return res.status(200).json({ message: "Class unreserved successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

