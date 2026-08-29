__putout_processor_markdown([
    heading(2, 'Rules'),
    ul(li('✅ ', link('my-rule', '#my-rule'))),
    heading(2, 'Config'),
    codeblock('json', `{"rules": {"my-plugin/my-rule": "on"}}`),
    heading(2, 'License'),
    paragraph('MIT'),
]);
