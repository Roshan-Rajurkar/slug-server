const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products/product.routes')
require('dotenv').config();
const errorHandler = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middlewares/verifyToken');
const ConnectDB = require('./config/ConnectDB');

const PORT = process.env.PORT || 5000;

ConnectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/app', productRoutes);
app.use(errorHandler);
app.get('/', (req, res) => {
    res.send({ status: 'server is running' });
});

const server = app.listen(PORT, () => {
    console.log('server is running on port', PORT);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged error : ${err}`);
    server.close(() => process.exit(1));
});

