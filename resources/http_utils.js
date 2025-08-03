export const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export const ContentTypes = {
    json: 'application/json',
    text: 'text/plain; charset=utf-8',
}

export const DefaultHttpResponses = {
    methodNotAllowed: (res) => {
        res.statusCode = 405;
        res.setHeader('Content-Type', ContentTypes.json);
        res.end(JSON.stringify({ error: 'Method not allowed' }));
    },
    notFound: (res) => {
        res.statusCode = 404;
        res.setHeader('Content-Type', ContentTypes.text);
        res.end('Not Found');
    }
}


export function setResponse(res, statusCode, contentType, body) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', contentType);
    res.end(body);
}

export class UrlData {
    constructor(url) {
        this.urlParts = url.split('?');
        this.path = this.urlParts[0];
        this.queryParams = getQueryParams(url);
    }

    getQueryParam(name) {
        return this.queryParams.get(name);
    }
}


function getQueryParams(url){
    const urlParts = url.split('?');

    const queryParams = urlParts[1];

    return new URLSearchParams(queryParams || '');
}
