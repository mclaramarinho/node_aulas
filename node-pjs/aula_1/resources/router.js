import { RoutePaths } from "./routes.js";
import { ContentTypes, DefaultHttpResponses, setResponse, UrlData } from './http_utils.js';
import { getRandomName } from "./random_names.js";
import { generateUUID } from "./uuid_utils.js";

export function router(req, res) {
    const method = req.method;
    const url = new UrlData(req.url);

    if(url.path === RoutePaths.generateUUID){
        switch(method){
            case 'GET':
                let version = 4;
                if(url.getQueryParam('version')!==null) {
                    version = parseInt(url.getQueryParam('version'), 10);
                }
                try {
                    const uuid = generateUUID(version);
                    setResponse(res, 200, ContentTypes.text, uuid);
                } catch (error) {
                    setResponse(res, 422, ContentTypes.text, error.message);
                }
                return;
            default:
                methodNotAllowed(res);
                return;
        }
    }else if(url.path === RoutePaths.generateName){
        switch(method){
            case 'GET':
                const name = getRandomName();
                setResponse(res, 200, ContentTypes.text, name);
                return;
            default:
                DefaultHttpResponses.methodNotAllowed(res);
                return;
        }
    }

    DefaultHttpResponses.notFound(res);
}