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
        const addFunction = require('./add-function');
        const hello = require('./hello');
        
        module.exports.rules = {
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
        const addFunction = require('./add-function');
        const hello = require('./hello');
        
        module.exports.rules = {
            'add-function': addFunction,
            'hello': ['off', hello],
        };\n
    `;
    
    t.equal(result, expected);
    t.end();
});
