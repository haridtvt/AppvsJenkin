const db = require('../config/db');

exports.register = async (req, res) => {
    const { fullname, age, username, password } = req.body;
    try {
        await db.execute(
            'INSERT INTO users (fullname, age, username, password) VALUES (?, ?, ?, ?)',
            [fullname, age, username, password]
        );
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
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