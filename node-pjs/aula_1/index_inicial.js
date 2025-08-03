import * as http from 'http';
import { v1, v4, v6 } from 'uuid'; 
import { randomNames } from './resources/random_names';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const method = req.method;
    
    const url = req.url;
    const urlParts = url.split('?');

    const queryParams = urlParts[1];


    const queryParamsMap = new URLSearchParams(queryParams || '');


    if(urlParts[0] === '/generate-uuid'){
        switch(method){
            case 'GET':
                if(queryParamsMap.has('version')){
                    const version = queryParamsMap.get('version');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    switch(version){
                        case '1':
                            res.end(v1());
                            return;
                        case '4':
                            res.end(v4());
                            return;
                        case '6':
                            res.end(v6());
                            return;
                        default:
                            res.statusCode = 422;
                            res.setHeader('Content-Type', 'text/plain');
                            res.end('Invalid UUID version. Use 1, 4, or 6.');
                    }
                }else{
                    res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end(v1());
                        return;
                }
            default:
                res.statusCode = 405;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Method not allowed' }));
                return;
        }
    }else if(url === '/generate-name'){
        switch(method){
            case 'GET':
                res.statusCode = 200;
                const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
                res.setHeader('Content-Type', 'text/plain');
                res.end(randomName);
                return;
            default:
                res.statusCode = 405;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Method not allowed' }));
                return;
        }
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Not Found');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});  