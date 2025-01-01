const {createTest} = require('@putout/test');
const plugin = require('{{ importPath }}');

const test = createTest(__dirname, {
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
