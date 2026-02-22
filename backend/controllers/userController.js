const db = require('../config/db');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [result] = await db.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)", 
            [username, password]
        );
        res.status(201).json({ message: "User created!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT id, username FROM users");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};