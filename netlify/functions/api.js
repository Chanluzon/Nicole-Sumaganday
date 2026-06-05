const serverless = require('serverless-http');
const app = require('../../backend/server');

// Wrap Express app as a Netlify Function
module.exports.handler = serverless(app);
