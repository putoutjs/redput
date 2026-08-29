import {test, stub} from 'supertape';
import {montag} from 'montag';
import {writeReadme} from './write-readme.js';

const NAME = 'my-rule';
const LINK = 'https://putout.cloudcmd.io/#/gist/aaa/bbb';
const CORRECT = 'const x = 1;';
const INCORRECT = 'var x = 1;';

test('redput: writeReadme: inserts rule section before License', async (t) => {
    const source = montag`
        ## Rules
        
        ## License
        
        MIT
    `;
    
    const write = stub();
    const read = stub().resolves(source);
    
    await writeReadme(NAME, LINK, CORRECT, INCORRECT, {
        read,
        write,
        cwd: '/plugin/lib/my-rule',
    });
    
    const [, written] = write.args[0];
    
    t.match(written, '## my-rule');
    t.end();
});

test('redput: writeReadme: includes Putout Editor link', async (t) => {
    const source = montag`
        ## Rules
        
        ## License
        
        MIT
    `;
    
    const write = stub();
    const read = stub().resolves(source);
    
    await writeReadme(NAME, LINK, CORRECT, INCORRECT, {
        read,
        write,
        cwd: '/plugin/lib/my-rule',
    });
    
    const [, written] = write.args[0];
    
    t.match(written, 'Putout Editor');
    t.end();
});

test('redput: writeReadme: idempotent: section already exists', async (t) => {
    const source = montag`
        ## Rules
        
        ## my-rule
        
        Checkout in 🐊[**Putout Editor**](${LINK}).
        
        ### ❌ Example of incorrect code
        
        \`\`\`js
        var x = 1;
        \`\`\`
        
        ### ✅ Example of correct code
        
        \`\`\`js
        const x = 1;
        \`\`\`
        
        ## License
        
        MIT
    `;
    
    const write = stub();
    const read = stub().resolves(source);
    
    await writeReadme(NAME, LINK, CORRECT, INCORRECT, {
        read,
        write,
        cwd: '/plugin/lib/my-rule',
    });
    
    const [, written] = write.args[0];
    
    t.match(written, '## my-rule');
    t.end();
});

test('redput: writeReadme: writes to correct path', async (t) => {
    const source = montag`
        ## License
        
        MIT
    `;
    
    const write = stub();
    const read = stub().resolves(source);
    
    await writeReadme(NAME, LINK, CORRECT, INCORRECT, {
        read,
        write,
        cwd: '/home/coderaiser/plugin-foo/lib',
    });
    
    const [writtenPath] = write.args[0];
    
    t.equal(writtenPath, '/home/coderaiser/plugin-foo/README.md');
    t.end();
});

test('redput: writeReadme: code blocks', async (t) => {
    const source = montag`
        ## Rules
        
        ## License
        
        MIT
    `;
    
    const write = stub();
    const read = stub().resolves(source);
    
    await writeReadme(NAME, LINK, CORRECT, INCORRECT, {
        read,
        write,
        cwd: '/plugin/lib/my-rule',
    });
    
    const [, result] = write.args[0];
    
    const expected = montag`
        ## Rules
        
        ## my-rule
        
        Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/aaa/bbb).
        
        ### ❌ Example of incorrect code
        
        \`\`\`js
        var x = 1;
        \`\`\`
        
        ### ✅ Example of correct code
        
        \`\`\`js
        const x = 1;
        \`\`\`
        
        ## License
        
        MIT
    
    `;
    
    t.equal(result, expected);
    t.end();
});
