//src/server.js
const http = require('http');
const Router = require('./router');

class Server {
    constructor() {
        this.router = new Router();
    }

    get(path, handler) {
        this.router.get(path, handler);
    }

    post(path, handler) {
        this.router.post(path, handler);
    }

    put(path, handler) {
        this.router.put(path, handler);
    }

    patch(path, handler) {
        this.router.patch(path, handler);
    }

    delete(path, handler) {
        this.router.delete(path, handler);
    }

    head(path, handler) {
        this.router.head(path, handler);
    }

    options(path, handler) {
        this.router.options(path, handler);
    }

    listen(port, callback) {
        const server = http.createServer((req, res) => {
            this.router.handle(req, res);
        });
        server.listen(port, callback);
    }
}

module.exports = () => new Server();
