//src/methods/send.js

function send(res, body, statuscode = 200) {
    const isObject = typeof body === 'object';
    const contentType = isObject ? 'application/json' : 'text/plain';
    const finalBody = isObject ? JSON.stringify(body) : body

    res.writeHead(statuscode, { 'Content-Type': contentType })
    res.end(finalBody)

}

module.exports = send