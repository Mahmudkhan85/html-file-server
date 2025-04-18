const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'index.html');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading html file');
            } else {
                res.writeHead(200, { "content-type": 'text/html' });
                res.end(data);
            }
        })
    } else {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('404 ppage not found');

    }
})

server.listen(3000, () => {
    console.log('Server Running at localhost:3000');
})