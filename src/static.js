// src/static.js
const fs = require('fs');
const path = require('path');

function staticMiddleware(folderPath = 'public') {
    const basePath = path.resolve(folderPath);

    return function (req, res, next) {
        let reqPath = req.url === '/' ? '/index.html' : req.url;
        const filePath = path.join(basePath, reqPath);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                return next(); // File not found, move to next
            }

            // Simple content type based on file extension
            let contentType = 'text/html';
            if (filePath.endsWith('.css')) contentType = 'text/css';
            else if (filePath.endsWith('.js')) contentType = 'text/javascript';
            else if (filePath.endsWith('.json')) contentType = 'application/json';
            else if (filePath.endsWith('.png')) contentType = 'image/png';
            else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    };
}

module.exports = staticMiddleware;
