import {createTest} from '@putout/test';
import * as plugin from './index.js';

const NAME = 'my-rule';
const LINK = 'https://putout.cloudcmd.io/#/gist/aaa/bbb';

const test = createTest(import.meta.url, {
    plugins: [
        ['insert-rule-section', plugin],
    ],
});

test('redput: insert-rule-section: report', (t) => {
    t.reportWithOptions('insert-rule-section', `Insert '${NAME}' to 'README.md'`, {
        name: NAME,
        link: LINK,
        correct: 'const x = 1;',
        incorrect: 'var x = 1;',
    });
    t.end();
});

test('redput: insert-rule-section: transform with options', (t) => {
    t.transformWithOptions('insert-rule-section', {
        name: NAME,
        link: LINK,
        correct: 'const x = 1;',
        incorrect: 'var x = 1;',
    });
    t.end();
});

test('redput: insert-rule-section: no report with options: no-report', (t) => {
    t.noReportWithOptions('no-report', {
        name: NAME,
        link: LINK,
        correct: 'const x = 1;',
        incorrect: 'var x = 1;',
    });
    t.end();
});

test('redput: insert-rule-section: transform with options: multiline', (t) => {
    t.transformWithOptions('multiline', {
        name: NAME,
        link: LINK,
        correct: `
            const x = 1;
            const y = 2;
        `,
        incorrect: `
            const x = 1;
            const y = 2;
        `,
    });
    t.end();
});
