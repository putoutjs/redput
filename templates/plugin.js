import {createTest} from '@putout/test';
import * as plugin from '{{ importPath }}';

const test = createTest(import.meta.url, {
    plugins: [
        ['{{ name }}', plugin],
    ],
});

test('{{ nested }}: {{ name }}: report', (t) => {
    t.report('{{ name }}', `{{ report }}`);
    t.end();
});

test('{{ nested }}: {{ name }}: transform', (t) => {
    t.transform('{{ name }}');
    t.end();
});
