import {test} from 'supertape';
import montag from 'montag';
import {parsePlugin} from './parse-plugin.js';

test('redput: parse-plugin', (t) => {
    const {name} = parsePlugin(montag`
        //    hello.js
    `);
    
    const expected = 'hello.js';
    
    t.equal(name, expected);
    t.end();
});

test('redput: parse-plugin: lines', (t) => {
    const {lines} = parsePlugin(montag`
        //    hello.js
        export const report = () => 'hello';
    `);
    
    const expected = [`export const report = () => 'hello';`];
    
    t.deepEqual(lines, expected);
    t.end();
});

test('redput: parse-plugin: lines: name: disabled', (t) => {
    const {name} = parsePlugin(montag`
        // ["off", "hello.js"]
        export const report = () => 'hello';
    `);
    
    t.equal(name, 'hello.js');
    t.end();
});

test('redput: parse-plugin: lines: options: disabled', (t) => {
    const {options} = parsePlugin(montag`
        // ["off", "hello.js"]
        export const report = () => 'hello';
    `);
    
    t.equal(options, 'off');
    t.end();
});

