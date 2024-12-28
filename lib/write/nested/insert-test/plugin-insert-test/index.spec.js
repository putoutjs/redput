import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['insert-test', plugin],
    ],
});

test('redput: insert-test: report', (t) => {
    t.report('insert-test', `Insert test`);
    t.end();
});

test('redput: insert-test: transform', (t) => {
    t.transform('insert-test');
    t.end();
});

test('redput: insert-test: no transform: exists', (t) => {
    t.noTransform('exists');
    t.end();
});
