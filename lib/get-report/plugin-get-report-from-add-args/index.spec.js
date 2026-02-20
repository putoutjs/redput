import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['plugin-get-report-from-add-args', plugin],
    ],
});

test('lib: plugin-get-report-from-add-args: report', (t) => {
    t.report('plugin-get-report-from-add-args', `Argument 'path' is missing`);
    t.end();
});

test('lib: plugin-get-report-from-add-args: transform', (t) => {
    t.transform('plugin-get-report-from-add-args');
    t.end();
});
