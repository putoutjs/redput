import putout from 'putout';
import * as insertGetRulePlugin from './plugin-insert-get-rule/index.js';

export const addRule = (name, source) => {
    const {code} = putout(source, {
        rules: {
            'add-rule': ['on', {
                name,
            }],
        },
        plugins: [
            ['add-rule', insertGetRulePlugin],
        ],
    });
    
    return code;
};
