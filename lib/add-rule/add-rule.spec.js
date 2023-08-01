import {test} from 'supertape';
import montag from 'montag';
import {addRule} from './add-rule.js';

test('redput: addRule', (t) => {
    const source = montag`
        module.exports.rules = {
            ...getRule('add-function'),
        };
    `;
    
    const result = addRule('hello', source);
    const expected = montag`
        module.exports.rules = {
            ...getRule('add-function'),
            ...getRule('hello'),
        };\n
    `;
    
    t.equal(result, expected);
    t.end();
});
