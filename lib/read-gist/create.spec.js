import fetch from 'node-fetch';
import {test, stub} from 'supertape';
import {create} from './create.js';

test('redput: read-gist: create: new', (t) => {
    const Octokit = stub();
    const token = '';
    
    create({
        token,
        Octokit,
    });
    
    t.calledWithNew(Octokit);
    t.end();
});

test('redput: read-gist: create: token', (t) => {
    const Octokit = stub();
    const token = 'hello';
    
    create({
        token,
        Octokit,
    });
    
    const args = [{
        auth: 'hello',
        request: {
            fetch,
        },
    }];
    
    t.calledWith(Octokit, args);
    t.end();
});
