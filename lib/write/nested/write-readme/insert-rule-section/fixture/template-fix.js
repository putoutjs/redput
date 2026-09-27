__putout_processor_markdown([
    heading(2, 'Rules'),
    ul(li('✅ ', link('my-rule', '#my-rule'))),
    heading(2, 'Config'),
    codeblock('json', `{"rules": {"my-plugin/my-rule": "on"}}`),
    heading(2, 'my-rule'),
    paragraph('Checkout in 🐊', link(bold('Putout Editor'), 'https://putout.cloudcmd.io/#/gist/aaa/bbb'), '.'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', `
            if (isCallExpression(node) {}
        `),
    heading(3, '✅ Example of correct code'),
    codeblock('js', `
            if (node.type === \`CallExpression\`) {}
        `),
    heading(2, 'License'),
    paragraph('MIT'),
]);
