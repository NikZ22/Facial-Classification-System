const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000; // Choose any port you prefer
const directories = {
    'dir1': './Models/Control/g_or_wg/',
    'dir2': './Models/Control/m_or_f/',
    'dir3': './Models/Control/o_or_y/',
    'dir4': './Models/Extended/g_or_wg/',
    'dir5': './Models/Extended/m_or_f/',
    'dir6': './Models/Extended/o_or_y/'
};

const server = http.createServer(function (request, response) {
    const url = request.url;
    let filePath;

    // Set CORS headers
    response.setHeader('Access-Control-Allow-Origin', '*'); // Adjust the origin as needed
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    if (url.startsWith('/dir1')) {
        filePath = path.join(directories['dir1'], url.replace('/dir1', ''));
    } else if (url.startsWith('/dir2')) {
        filePath = path.join(directories['dir2'], url.replace('/dir2', ''));
    } else if (url.startsWith('/dir3')) {
        filePath = path.join(directories['dir3'], url.replace('/dir3', ''));
    } else if (url.startsWith('/dir4')) {
        filePath = path.join(directories['dir4'], url.replace('/dir4', ''));
    } else if (url.startsWith('/dir5')) {
        filePath = path.join(directories['dir5'], url.replace('/dir5', ''));
    } else if (url.startsWith('/dir6')) {
        filePath = path.join(directories['dir6'], url.replace('/dir6', ''));
    } else {
        response.writeHead(404);
        response.end('Not found');
        return;
    }

    const contentType = getContentType(filePath);

    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                response.writeHead(404);
                response.end('File not found');
            } else {
                response.writeHead(500);
                response.end('Server error');
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

    function getContentType(filePath) {
        const extname = path.extname(filePath);
        switch (extname) {
            case '.html':
                return 'text/html';
            case '.js':
                return 'text/javascript';
            case '.css':
                return 'text/css';
            case '.json':
                return 'application/json';
            default:
                return 'text/plain';
        }
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
