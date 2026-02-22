const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger); // Sử dụng middleware

app.use('/api', userRoutes); // Tất cả API sẽ bắt đầu bằng /api

const PORT = 3000;
app.listen(PORT, () => console.log(`Server chạy tại port ${PORT}`));