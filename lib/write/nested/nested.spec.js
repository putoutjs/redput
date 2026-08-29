import {test, stub} from 'supertape';
import {
    updateNestedIndex,
    updateOverallNestedFixtures,
    writeNestedFixtures,
} from './nested.js';

test('redput: nested: updateNestedIndex', async (t) => {
    const read = stub().resolves('');
    const write = stub().resolves();
    const access = stub().rejects(Error('x'));
    
    const options = {};
    await updateNestedIndex('hello', options, {
        read,
        write,
        access,
    });
    
    t.calledWith(write, ['./index.js', '\n']);
    t.end();
});

test('redput: nested: updateNestedIndex: plugin name', async (t) => {
    const read = stub().resolves('');
    const write = stub().resolves();
    const access = stub().resolves();
    
    const options = {};
    await updateNestedIndex('hello', options, {
        read,
        write,
        access,
        plugin: 'package-json',
    });
    
    t.calledWith(write, [
        './package-json.js',
        '\n',
    ]);
    t.end();
});

test('redput: nested: writeNestedFixtures: writes correct to fix file', async (t) => {
    const write = stub().resolves();
    const mkdir = stub().resolves();
    
    await writeNestedFixtures('hello', 'var x = 1;', 'js', 'const x = 1;', {
        write,
        mkdir,
    });
    
    t.calledWith(write, [
        './hello/fixture/hello-fix.js',
        'const x = 1;',
    ]);
    t.end();
});

test('redput: nested: updateOverallNestedFixtures: writes correct to fix file', async (t) => {
    const write = stub().resolves();
    
    await updateOverallNestedFixtures('hello', 'var x = 1;', 'js', 'const x = 1;', {
        write,
    });
    
    t.calledWith(write, [
        '../test/fixture/hello-fix.js',
        'const x = 1;',
    ]);
    t.end();
});
