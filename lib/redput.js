import tryToCatch from 'try-to-catch';

import {readGist} from './read-gist.js';
import {writeRule, writeFixtures, writeTestForNested} from './write.js';
import {getReport} from './get-report.js';

export const redput = async (link, {token}) => {
    const gistLink = link.replace('https://putout.cloudcmd.io/#/gist/', '');
    const [error, result] = await tryToCatch(readGist, gistLink, {
        token,
    });
    
    if (error)
        return [Error(error.response.data.message)];
        
    const raw = result.data.files['transform.js'].content;
    const fixture = result.data.files['source.js'].content;
    
    const [comment, ...lines] = raw.split('\n');
    const name = comment.replace(/\/\/\s+?/, '');
    
    if (name.includes(':'))
        return [Error(`Bad name: ${name}`)];
    
    const rule = lines.join('\n');
    const report = getReport(rule);
    
    await writeRule(name, rule);
    await writeFixtures(name, fixture);
    await writeTestForNested(name, report);
    
    return [null, 'Done'];
};

