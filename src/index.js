//src/index.js

const createServer = require('./server');
const fileUploadMiddleware = require('./filleupload');
const staticMiddleware = require('./static');

// Export everything directly as an object
module.exports = {
    createServer,
    fileUploadMiddleware,
    staticMiddleware
};
