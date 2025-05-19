import {test} from 'supertape';
import {isTSCode} from './index.js';

test('redput: write: isTSCode', (t) => {
    const result = isTSCode('const a: number = 5');
    
    t.ok(result);
    t.end();
});

test('redput: write: isTSCode: no', (t) => {
    const result = isTSCode('const a = 5');
    
    t.notOk(result);
    t.end();
});

