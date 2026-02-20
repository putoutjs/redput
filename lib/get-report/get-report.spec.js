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

test('redput: getReport: no report', (t) => {
    const source = montag`
        export const fix = () => {}
    `;
    
    const result = getReport(source);
    const expected = ``;
    
    t.equal(result, expected);
    t.end();
});

test('redput: getReport: string', (t) => {
    const source = montag`
        export const report = () => 'return await';
    `;
    
    const result = getReport(source);
    const expected = 'return await';
    
    t.equal(result, expected);
    t.end();
});

test('redput: getReport: operator: addArgs', (t) => {
    const source = montag`
        export const {
            report,
            fix,
            traverse,
        } = addArgs({
            path: ['path', {
                include: [
                    'export const filter = () => __body',
                    'module.exports.filter = () => __body',
                ],
            }],
        });
    `;
    
    const result = getReport(source);
    const expected = `Argument 'path' is missing`;
    
    t.equal(result, expected);
    t.end();
});
