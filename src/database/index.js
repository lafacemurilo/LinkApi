const mongoose = require('mongoose');
require('dotenv/config')

mongoose.connect(process.env.MONGO_API_LINK);
mongoose.Promise = global.Promise;

module.exports = mongoose;
