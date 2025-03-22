import {test} from 'supertape';
import montag from 'montag';
import {prepareRule} from './prepare-rule.js';

test('redput: prepareRule', (t) => {
    const source = montag`
        export const report = 'hello';
    `;
    
    const result = prepareRule(source);
    const expected = montag`
        export const report = () => 'hello';\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('redput: prepareRule: declare-before-reference', (t) => {
    const source = montag`
        const {getTemplateValues} = operator;
        const {operator} = require('putout');
    `;
    
    const result = prepareRule(source);
    const expected = montag`
        const {operator} = require('putout');
        const {getTemplateValues} = operator;
    
    `;
    
    t.equal(result, expected);
    t.end();
});
