import {test} from 'supertape';
import montag from 'montag';
import {getReport} from './get-report.js';

test('redput: getReport', (t) => {
    const source = montag`
        export const report = () => \`Use 'return await'\`;
    `;
    const result = getReport(source);
    const expected = `Use 'return await'`;
    
    t.equal(result, expected);
    t.end();
});

