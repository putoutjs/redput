import {create} from './create.js';
import {
    test,
    stub,
} from 'supertape';

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
    }];
    
    t.calledWith(Octokit, args);
    t.end();
});

