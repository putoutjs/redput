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
        import * as addFunction from './add-function/index.js';
        import * as hello from './hello/index.js';
        
        export const rules = {
            'add-function': addFunction,
            'hello': hello,
        };\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('redput: addRule: off', (t) => {
    const source = montag`
        module.exports.rules = {
            ...getRule('add-function'),
        };
    `;
    
    const result = addRule('hello', source, 'off');
    const expected = montag`
        import * as addFunction from './add-function/index.js';
        import * as hello from './hello/index.js';
        
        export const rules = {
            'add-function': addFunction,
            'hello': ['off', hello],
        };\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('redput: addRule: esm', (t) => {
    const source = montag`
        import * as addFunction from './add-function/index.js';
        
        export const rules = {
            'add-function': addFunction,
        };
    `;
    
    const result = addRule('hello', source, 'off');
    const expected = montag`
        import * as hello from './hello/index.js';
        import * as addFunction from './add-function/index.js';
        
        export const rules = {
            'add-function': addFunction,
            'hello': ['off', hello],
        };\n
    `;
    
    t.equal(result, expected);
    t.end();
});
