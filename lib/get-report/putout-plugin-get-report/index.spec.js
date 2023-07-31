import {createTest} from '@putout/test';
import * as getReport from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['get-report', getReport],
    ],
});

test('redput: get-report: plugin', (t) => {
    t.report('get-report', `Use 'return await'`);
    t.end();
});

test('redput: get-report: assign', (t) => {
    t.report('assign', `Use 'return await'`);
    t.end();
});
