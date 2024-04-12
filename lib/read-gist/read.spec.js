import {test, stub} from 'supertape';
import {read} from './read.js';

test('redput: read: return', async (t) => {
    const hash = '/33a75dce299788583a567e02f29828c8/7a97049f1c88ef9e3396d43b6a64246da0093670';
    const request = stub().returns('ok');
    const octokit = {
        request,
    };
    
    const result = await read(hash, octokit);
    const expected = 'ok';
    
    t.equal(result, expected);
    t.end();
});

test('redput: read: call', async (t) => {
    const hash = '33a75dce299788583a567e02f29828c8/7a97049f1c88ef9e3396d43b6a64246da0093670';
    const request = stub();
    const octokit = {
        request,
    };
    
    await read(hash, octokit);
    const args = ['GET /gists/33a75dce299788583a567e02f29828c8/7a97049f1c88ef9e3396d43b6a64246da0093670', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    }];
    
    t.calledWith(request, args);
    t.end();
});
