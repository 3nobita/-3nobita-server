# @3nobita/server

Lightweight web server framework made by Bhavesh Shinde 🧠🔥

## Install

```bash
npm i @3nobita/server
```
create app.js and add this code
```bash
const server = require('@3nobita/server')();

server.get('/', (req, res) => {
  req.send('working');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

=======
# -3nobita-server
framework 
