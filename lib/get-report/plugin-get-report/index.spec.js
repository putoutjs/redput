import {createTest} from '@putout/test';
import * as getReport from './index.js';

const test = createTest(import.meta.url, {
    'get-report': getReport,
});

test('redput: get-report: report: plugin', (t) => {
    t.report('get-report', `Use 'return await'`);
    t.end();
});

test('redput: get-report: report: assign', (t) => {
    t.report('assign', `Use 'return await'`);
    t.end();
});

test('redput: get-report: report: string', (t) => {
    t.report('string', 'hello');
    t.end();
});

test('redput: get-report: no transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});
