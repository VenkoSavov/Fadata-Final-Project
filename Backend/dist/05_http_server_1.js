"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const HOSTNAME = '127.0.0.1';
const PORT = 9000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h2>Hello World from TypeScript: ${req.rawHeaders}`);
});
server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
server.on('error', err => {
    if ()
        ;
});
//# sourceMappingURL=05_http_server_1.js.map