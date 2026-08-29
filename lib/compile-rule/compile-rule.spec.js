import {test} from 'supertape';
import {tryToCatch} from 'try-to-catch';
import {compileRule} from './compile-rule.js';

test('redput: compileRule: cjs passthrough', (t) => {
    const result = compileRule('module.exports = {a: 1}');
    const expected = {
        a: 1,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('redput: compileRule: esm: report is function', (t) => {
    const code = `
        export const report = () => 'use const';
        export const replace = () => ({'var __a = __b': 'const __a = __b'});
    `;
    
    const result = compileRule(code);
    
    t.equal(typeof result.report, 'function');
    t.end();
});

test('redput: compileRule: esm: replace is function', (t) => {
    const code = `
        export const report = () => 'use const';
        export const replace = () => ({'var __a = __b': 'const __a = __b'});
    `;
    
    const result = compileRule(code);
    
    t.equal(typeof result.replace, 'function');
    t.end();
});

test('redput: compileRule: esm traverse rule', (t) => {
    const code = `
        export const report = () => 'x';
        export const traverse = ({push}) => ({'Identifier': (path) => push(path)});
    `;
    
    const result = compileRule(code);
    
    t.equal(typeof result.traverse, 'function');
    t.end();
});

test('redput: compileRule: globals: require shim', (t) => {
    const fakeRequire = () => ({
        fake: true,
    });
    
    const code = 'const m = require("anything"); module.exports = m;';
    
    const result = compileRule(code, {
        require: fakeRequire,
    });
    
    const expected = {
        fake: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('redput: compileRule: infinite loop: throws', async (t) => {
    const [error] = await tryToCatch(compileRule, 'while(true){}');
    
    t.ok(error);
    t.end();
});
