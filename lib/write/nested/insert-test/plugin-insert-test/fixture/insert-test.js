test('plugin-github: transform: install-bun', (t) => {
    t.transform('install-bun');
    t.end();
});

test('plugin-github: transform: convert-npm-to-bun', (t) => {
    t.transform('convert-npm-to-bun');
    t.end();
});
