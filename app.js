const http = require('http');
const fs = require('fs');
const path = require('path');

const serveFile = (res, filename, contentType) => {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'content-type': 'text/plain' });
            res.end('error loading file');
        } else {
            res.writeHead(200, { 'content-type': contentType });
            res.end(data)
        }
    })
}

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        serveFile(res, 'index.html', 'text/html');
    } else if (req.url === '/contact.html') {
        serveFile(res, 'contact.html', 'text/html');
    } else if (req.url === '/about.html') {
        serveFile(res, 'about.html', 'text/html');
    } else if (req.url.startsWith('/public/')) {
        const filePath = req.url.slice(1);
        const ext = path.extname(filePath);

        if (ext === '.css') {
            serveFile(res, filePath, 'text/css');
        } else {
            res.writeHead(403, { 'content-type': 'text/plain' });
            res.end('forbiden file type')
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }
})

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});