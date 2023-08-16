import {test} from 'supertape';
import montag from 'montag';
import {insertTest} from './insert-test.js';

test('redput: insertTest', (t) => {
    const source = montag`
        test('plugin-github: transform: convert-npm-to-bun', (t) => {
            t.transform('convert-npm-to-bun');
            t.end();
        });
    `;
    
    const result = insertTest('insert-test', 'github', source);
    const expected = montag`
        test('plugin-github: transform: convert-npm-to-bun', (t) => {
            t.transform('convert-npm-to-bun');
            t.end();
        });
        test('plugin-github: transform: insert-test', (t) => {
            t.transform('insert-test');
            t.end();
        })\n
    `;
    
    t.equal(result, expected);
    t.end();
});
