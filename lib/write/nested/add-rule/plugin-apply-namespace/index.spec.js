import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['insert-get-rule', plugin],
    ],
});

test('redput: add-rule: report: apply-namespace', (t) => {
    t.report('apply-namespace', 'Apply namespace');
    t.end();
});

test('redput: add-rule: transform: apply-namespace', (t) => {
    t.transform('apply-namespace');
    t.end();
});
