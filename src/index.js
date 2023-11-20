const dotenv = require('dotenv');
dotenv.config();

const {startApp, checkUserStatuses} = require('./src/integration');

// Start the app
startApp();

// Periodically check user statuses (e.g., every minute)
setInterval(() => {
    checkUserStatuses();
}, process.env.PERIOD);
