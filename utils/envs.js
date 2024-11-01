const dotenv = require("dotenv");

dotenv.config();

const apiServerPort = process.env.API_PORT;
const testServerPort = process.env.TEST_PORT;

module.exports = {apiServerPort, testServerPort};