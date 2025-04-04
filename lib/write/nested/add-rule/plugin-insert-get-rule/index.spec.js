import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['insert-get-rule', plugin],
    ],
});

test('redput: insert-get-rule: report', (t) => {
    t.reportWithOptions('insert-get-rule', `Insert 'getRule()'`, {
        name: 'hello',
    });
    t.end();
});

test('redput: insert-get-rule: transform', (t) => {
    t.transformWithOptions('insert-get-rule', {
        name: 'hello',
    });
    t.end();
});

test('redput: insert-get-rule: transform: esm', (t) => {
    t.transformWithOptions('esm', {
        name: 'hello',
    });
    t.end();
});

test('redput: insert-get-rule: transform: options', (t) => {
    t.transformWithOptions('off', {
        name: 'hello',
        ruleOptions: 'off',
    });
    t.end();
});
