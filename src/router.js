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
        this.middleware.push({ path, middleware }); // Store path along with middleware
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
        const next = () => {
            if (index < this.middleware.length) {
                const { path, middleware } = this.middleware[index];
                index++;

                // Check if the middleware path matches the request's pathname
                if (pathname === path || path === '/') {
                    middleware(req, res, next); // Apply the middleware if paths match
                } else {
                    next(); // Skip this middleware and move to the next one
                }
            } else {
                handler(req, res); // Call the handler if all middleware passes
            }
        };

        next(); // Start middleware execution
    }
}

module.exports = Router;
