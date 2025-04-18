const http = require('http');
const fs = require('fs');
const path = require('path');

const serverFile = (res, filename, contentType) => {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error Loading Files');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        serverFile(res, 'index.html', 'text/html');
    } else if (req.url === '/about.html') {
        serverFile(res, 'about.html', 'text/html');
    } else if (req.url === '/contact.html') {
        serverFile(res, 'contact.html', 'text/html');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
