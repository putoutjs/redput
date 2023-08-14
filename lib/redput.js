import tryToCatch from 'try-to-catch';
import {getReport} from './get-report/get-report.js';
import {readGist} from './read-gist/read-gist.js';
import {writePlugin} from './write/index.js';

const SUCCESS = [null, 'Done'];

const URL = 'https://putout.cloudcmd.io/#/gist/';

export const redput = async (link, {token}) => {
    const gistLink = link.replace(URL, '');
    const [error, result] = await tryToCatch(readGist, gistLink, {
        token,
    });
    
    if (error)
        return [
            Error(error.response.data.message),
        ];
    
    const raw = result.data.files['transform.js'].content;
    const fixture = result.data.files['source.js'].content;
    
    const [comment, ...lines] = raw.split('\n');
    const name = comment.replace(/\/\/\s+?/, '');
    
    if (name.includes(':') || name.includes('{'))
        return [
            Error(`Bad name: ${name}`),
        ];
    
    const rule = lines.join('\n');
    const report = getReport(rule);
    
    await writePlugin(name, {
        rule,
        fixture,
        report,
    });
    
    return SUCCESS;
};
