import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
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
