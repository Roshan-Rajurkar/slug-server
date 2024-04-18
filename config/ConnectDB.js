const mongoose = require('mongoose')
require('dotenv').config();

const MONGOURI = process.env.MONGOURI

const ConnectDB = async () => {
    const response = await mongoose.connect(MONGOURI);

    console.log(response.connection.host);
}

module.exports = ConnectDB;