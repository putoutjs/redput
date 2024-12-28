import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-strings-tuple', plugin],
    ],
});

test('lib: apply-strings-tuple: report', (t) => {
    t.report('apply-strings-tuple', `Apply strings tuple`);
    t.end();
});

test('lib: apply-strings-tuple: transform', (t) => {
    t.transform('apply-strings-tuple');
    t.end();
});
