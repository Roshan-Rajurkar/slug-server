const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products/product.routes')
const customerRoutes = require('./routes/customers/customers.route')
const orderRoutes = require('./routes/orders/orders.routes')
require('dotenv').config();
const errorHandler = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middlewares/verifyToken');
const ConnectDB = require('./config/ConnectDB');

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;

ConnectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/app', productRoutes, customerRoutes, orderRoutes);
app.use(errorHandler);
app.get('/', (req, res) => {
    res.render('home')
});

const server = app.listen(PORT, () => {
    console.log('server is running on port', PORT);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged error : ${err}`);
    server.close(() => process.exit(1));
});

