# @3nobita/server

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
