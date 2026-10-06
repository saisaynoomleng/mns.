import http from 'node:http';
import app from './app.js';

const server = http.createServer(app);

server.listen(3000, () => console.log(`Server is listening on Port: 3000`));
