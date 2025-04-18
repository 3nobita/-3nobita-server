//src/server.js

const http = require('http');
const Router = require('./router');

class Server{
    constructor(){
        this.router = new Router();
    }

    get(path,handler){
        this.router.get(path,handler)
    }

    post(path,handler){
        this.router.post(path,handler)
    }

    listen(port,callback){
        const server = http.createServer((req,res)=>{
            this.router.handle(req,res);
        });
        server.listen(port,callback)
    }

}

module.exports = () => new Server()