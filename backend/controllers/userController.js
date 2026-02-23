const db = require('../config/db');

exports.register = async (req, res) => {
    const { fullname, age, username, password } = req.body;
    console.log(`Attempting to register user: ${username}`);
    try {
        if (!fullname || !age || !username || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const [result] = await db.execute(
            'INSERT INTO users (fullname, age, username, password) VALUES (?, ?, ?, ?)',
            [fullname, age, username, password]
        );
        console.log("Insert result:", result);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Database Error:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password]
        );
        if (rows.length > 0) {
            res.status(200).json({ message: "Login successful", user: rows[0] });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};