import {test} from 'supertape';
import tryToCatch from 'try-to-catch';
import {readGist} from './read-gist.js';

test('redput: readGist', async (t) => {
    const hash = '/33a75dce299788583a567e02f29828c8/7a97049f1c88ef9e3396d43b6a64246da0093670';
    const token = 'abcd';
    
    const [error] = await tryToCatch(readGist, hash, {
        token,
    });
    
    t.match(error.message, 'Bad credentials');
    t.end();
});
