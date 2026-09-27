import {test, stub} from 'supertape';
import {montag} from 'montag';
import {tryToCatch} from 'try-to-catch';
import {writeNested} from './index.js';

test('redput: write: writeNested: no catch', async (t) => {
    const rule = montag`
        export const report = () => 'hello';
        export const replace = () => ({});
    `;
    
    const [error] = await tryToCatch(writeNested, 'hello', {
        rule,
        fixture: 'b',
        report: 'c',
        options: {},
        link: 5,
        writeNestedRule: stub().resolves(),
        writeNestedFixtures: stub().resolves(),
        writeNestedTests: stub().resolves(),
    });
    
    t.equal(error.message, `ENOENT: no such file or directory, open './index.js'`);
    t.end();
});
