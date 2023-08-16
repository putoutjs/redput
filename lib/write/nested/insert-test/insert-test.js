import putout from 'putout';
import * as insertTestPlugin from './plugin-insert-test/index.js';

export const insertTest = (rule, plugin, source) => {
    const {code} = putout(source, {
        rules: {
            'insert-test': ['on', {
                rule,
                plugin,
            }],
        },
        plugins: [
            ['insert-test', insertTestPlugin],
        ],
    });
    
    return code;
};
