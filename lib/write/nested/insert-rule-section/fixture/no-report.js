__putout_processor_markdown([
    heading(2, 'Rules'),
    heading(2, 'my-rule'),
    paragraph('Checkout in 🐊', link(bold('Putout Editor'), 'https://putout.cloudcmd.io/#/gist/aaa/bbb'), '.'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', 'var x = 1;'),
    heading(3, '✅ Example of correct code'),
    codeblock('js', 'const x = 1;'),
    heading(2, 'License'),
    paragraph('MIT'),
]);