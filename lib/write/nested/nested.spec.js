import {test, stub} from 'supertape';
import {updateNestedIndex} from './nested.js';

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
