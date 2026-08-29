import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['insert-rule-link', plugin],
    ],
});

test('nested: insert-rule-link: report', (t) => {
    t.report('insert-rule-link', `insert '#hello' link to Rules`);
    t.end();
});

test('nested: insert-rule-link: transform', (t) => {
    t.transform('insert-rule-link');
    t.end();
});
