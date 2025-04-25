//src/router.js
const send = require('./methods/send');
const url = require('url')

class Router {
    constructor() {
        this.routes = {
            GET: {},
            POST: {},
            PUT: {},
            PATCH: {},
            DELETE: {},
            HEAD: {},
            OPTIONS: {},
            ALL: {}
        }
    }
    get(path, handler) {
        this.routes.GET[path] = handler
    }
    post(path, handler) {
        this.routes.POST[path] = handler
    }
    put(path, handler) {
        this.routes.PUT[path] = handler
    }
    patch(path, handler) {
        this.routes.PATCH[path] = handler
    }
    delete(path, handler) {
        this.routes.DELETE[path] = handler
    }
    head(path, handler) {
        this.routes.HEAD[path] = handler
    }
    options(path, handler) {
        this.routes.OPTIONS[path] = handler
    }
    // all(path, handler) {
    //     this.routes.ALL[path] = handler
    // }


    handle(req, res) {

        res.send = function (body, statuscode = 200) {
            send(res, body, statuscode)
        }
        const parsedUrl = url.parse(req.url)
        const pathname = parsedUrl.pathname;
        const method = req.method;

        if (!this.routes[method]) {
            return res.send("Method is not allowd", 405)
        }
        
        const handler = this.routes[method][pathname];

        if (handler) {
            handler(req, res)
        }
        else {
            res.send('Not Found', 404)
        }
    }
}

module.exports = Router