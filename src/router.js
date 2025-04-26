//src/router.js
const send = require('./methods/send');
const url = require('url')
const {fileUploadMiddleware} = require('./fileupload/filleupload')

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
        this.middleware = [];
        this.use(fileUploadMiddleware);
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

    use(middleware) {
        this.middleware.push(middleware)
    }

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
        if (!handler) {
            return res.send('Not Found', 404)
        }
        let index = 0;
        const next = () => {
            if (index < this.middleware.length) {
                const middleware = this.middleware[index];
                index++;
                middleware(req, res, next)
            } else {
                handler(req, res);
            }
        }
        next()
    }
}

module.exports = Router