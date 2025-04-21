const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const serveFile = (res, filename, contentType) => {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading file');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
        serveFile(res, 'index.html', 'text/html');
    } else if (req.method === 'GET' && req.url === '/contact.html') {
        serveFile(res, 'contact.html', 'text/html');
    } else if (req.method === 'GET' && req.url === '/about.html') {
        serveFile(res, 'about.html', 'text/html');
    } else if (req.url.startsWith('/public/')) {
        const filePath = req.url.slice(1);
        const ext = path.extname(filePath);
        if (ext === '.css') {
            serveFile(res, filePath, 'text/css');
        } else {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('Forbidden file type');
        }
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const parsedData = parse(body);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h2>Form Submitted!</h2>
                <p>Name: ${parsedData.name}</p>
                <p>Age: ${parsedData.age}</p>
            `);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }
});

server.listen(4000, () => {
    console.log('Server running at http://localhost:4000');
});
