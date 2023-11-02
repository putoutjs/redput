import tryToCatch from 'try-to-catch';
import {getReport} from './get-report/get-report.js';
import {readGist} from './read-gist/read-gist.js';
import {writePlugin} from './write/index.js';
import {parseLink} from './parse-link.js';
import {parsePlugin} from './parse-plugin.js';

const SUCCESS = [null, 'Done'];

export const redput = async (link, {token}) => {
    const gistLink = parseLink(link);
    const [error, result] = await tryToCatch(readGist, gistLink, {
        token,
    });
    
    if (error)
        return [
            Error(error.response.data.message),
        ];
    
    const raw = result.data.files['transform.js'].content;
    const fixture = result.data.files['source.js'].content;
    
    const {name, lines} = parsePlugin(raw);
    
    if (name.includes(':') || name.includes('{'))
        return [
            Error(`Bad name: ${name}`),
        ];
    
    const rule = lines.join('\n');
    const report = getReport(rule);
    
    const [errorWrite] = await tryToCatch(writePlugin, name, {
        rule,
        fixture,
        report,
    });
    
    if (errorWrite)
        return [errorWrite];
    
    return SUCCESS;
};
