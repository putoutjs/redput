import {test} from 'supertape';
import {tryToCatch} from 'try-to-catch';
import {montag} from 'montag';
import {runRule} from './run-rule.js';

test('redput: runRule: applies replace rule', (t) => {
    const ruleSource = montag`
        export const report = () => 'use const';
        export const replace = () => ({'var __a = __b': 'const __a = __b'});
    `;
    
    const result = runRule(ruleSource, 'var x = 1;');
    
    t.equal(result.trim(), 'const x = 1;');
    t.end();
});

test('redput: runRule: no match: returns source unchanged', (t) => {
    const ruleSource = montag`
        export const report = () => 'use const';
        export const replace = () => ({'var __a = __b': 'const __a = __b'});
    `;
    
    const result = runRule(ruleSource, 'const x = 1;');
    
    t.equal(result.trim(), 'const x = 1;');
    t.end();
});

test('redput: runRule: rule without report: does not throw', async (t) => {
    const ruleSource = montag`
        export const replace = () => ({'var __a = __b': 'const __a = __b'});
    `;
    
    const [error] = await tryToCatch(runRule, ruleSource, 'var x = 1;');
    
    t.notOk(error);
    t.end();
});

test('redput: runRule: rule with require of path', (t) => {
    const ruleSource = montag`
        import path from 'path';
        module.exports = {report: () => 'x', replace: () => ({'var __a = __b': 'const __a = __b'})};
    `;
    
    const result = runRule(ruleSource, 'var x = 1;');
    
    t.equal(result.trim(), 'const x = 1;');
    t.end();
});

test('redput: runRule: rule with require of node:path', (t) => {
    const ruleSource = montag`
        import path from 'node:path';
        module.exports = {report: () => 'x', replace: () => ({'var __a = __b': 'const __a = __b'})};
    `;
    
    const result = runRule(ruleSource, 'var x = 1;');
    
    t.equal(result.trim(), 'const x = 1;');
    t.end();
});

test('redput: runRule: rule with require of putout', (t) => {
    const ruleSource = montag`
        import {putout} from 'putout';
        module.exports = {report: () => 'x', replace: () => ({'var __a = __b': 'const __a = __b'})};
    `;
    
    const result = runRule(ruleSource, 'var x = 1;');
    
    t.equal(result.trim(), 'const x = 1;');
    t.end();
});
