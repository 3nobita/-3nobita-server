# @3nobita/server


![npm](https://img.shields.io/npm/v/@3nobita/server?color=blue&label=npm%20version)
![npm](https://img.shields.io/npm/dw/@3nobita/server?color=green&label=weekly%20downloads)
![License](https://img.shields.io/npm/l/@3nobita/server?color=brightgreen)
![bundlephobia](https://img.shields.io/bundlephobia/minzip/@3nobita/server?label=bundle%20size)
![MadeWithLove](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F%20by%20Bhavesh-teal)


A lightweight Node.js HTTP framework alternative to Express.  
Super fast, super clean, and easy to use.
Lightweight web server framework made by Bhavesh Shinde 🧠🔥

## Install

```bash
npm i @3nobita/server
```
create app.js and add this code
```bash
const server = require('@3nobita/server')();

server.get('/get', (req, res) => {
    res.send('GET method is working');
});

server.post('/post', (req, res) => {
    res.send('POST method is working');
});

server.put('/put', (req, res) => {
    res.send('PUT method is working');
});

server.patch('/patch', (req, res) => {
    res.send('PATCH method is working');
});

server.delete('/delete', (req, res) => {
    res.send('DELETE method is working');
});

server.head('/head', (req, res) => {
    res.send(null, 200);  // HEAD should not send a body
});

server.options('/options', (req, res) => {
    res.send('OPTIONS method is working');
});


server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```
## How to Contribute
Interested in contributing? Here's how you can help:

1. Fork the repository.
2. Make your changes.
3. Create a Pull Request.

We'd love to have your help! Check out our [CONTRIBUTING.md](CONTRIBUTING.md) for more details.


# -3nobita-server framework 
