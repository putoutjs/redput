import {test} from 'supertape';
import montag from 'montag';
import {prepareRule} from './prepare-rule.js';

test('redput: prepareRule', (t) => {
    const source = montag`
        export const report = () => 'hello';
    `;
    
    const result = prepareRule(source);
    const expected = montag`
        module.exports.report = () => 'hello';\n
    `;
    
    t.equal(result, expected);
    t.end();
});
