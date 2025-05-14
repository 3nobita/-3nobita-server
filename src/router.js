const send = require('./methods/send');
const url = require('url');
const { fileUploadMiddleware } = require('./filleupload');

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
        };
        this.middleware = [];
        this.use(fileUploadMiddleware); // Apply file upload middleware globally
    }

    get(path, handler) {
        this.routes.GET[path] = handler;
    }

    post(path, handler) {
        this.routes.POST[path] = handler;
    }

    put(path, handler) {
        this.routes.PUT[path] = handler;
    }

    patch(path, handler) {
        this.routes.PATCH[path] = handler;
    }

    delete(path, handler) {
        this.routes.DELETE[path] = handler;
    }

    head(path, handler) {
        this.routes.HEAD[path] = handler;
    }

    options(path, handler) {
        this.routes.OPTIONS[path] = handler;
    }

    use(path, middleware) {
        if (typeof middleware !== 'function') {
            middleware = path;
            path = '/'
        }
        this.middleware.push({ path, middleware });
    }

    handle(req, res) {
        res.send = function (body, statuscode = 200) {
            send(res, body, statuscode);
        };

        const parsedUrl = url.parse(req.url);
        const pathname = parsedUrl.pathname;
        const method = req.method;

        if (!this.routes[method]) {
            return res.send("Method is not allowed", 405);
        }

        const handler = this.routes[method][pathname];
        if (!handler) {
            return res.send('Not Found', 404);
        }

        let index = 0;
        const next = (err) => {
            if (err) {
                return this.handleError(err, req, res)
            }
            if (index < this.middleware.length) {
                const { middleware, path } = this.middleware[index];
                index++;
                if (pathname === path || path === '/') {
                    try {
                        middleware(req, res, (innerErr) => next(innerErr))
                    } catch (error) {
                        next(error)
                    }
                } else {
                    next()
                }
            } else {
                try {
                    handler(req, res)
                } catch (error) {
                    this.handleError(error, req, res)
                }
            }
        }
        next(); // Start middleware execution
    }
    handleError(err, req, res) {
        const errorMiddleware = this.middleware.find(m => m.middleware.length === 4);

        if (errorMiddleware) {
            errorMiddleware.middleware(err, req, res, () => { });
        } else {
            console.error("Unhandled error:", err);
            res.send("Internal Server Error", 500);
        }
    }
}

module.exports = Router;
