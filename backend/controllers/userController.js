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

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE username = ? AND password = ?", 
            [username, password]
        );

        if (rows.length > 0) {
            res.status(200).json({ 
                success: true, 
                message: "Login thành công!", 
                user: rows[0].username 
            });
        } else {
            res.status(401).json({ 
                success: false, 
                message: "Sai tài khoản hoặc mật khẩu rồi!" 
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};