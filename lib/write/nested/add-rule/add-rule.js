import putout from 'putout';
import * as insertGetRulePlugin from './plugin-insert-get-rule/index.js';
import pluginPutout from '@putout/plugin-putout';
import removeUnusedVariables from '@putout/plugin-remove-unused-variables';

export const addRule = (name, source) => {
    const {code} = putout(source, {
        rules: {
            'add-rule': ['on', {
                name,
            }],
        },
        plugins: [
            ['putout', pluginPutout],
            ['remove-unused-variables', removeUnusedVariables],
            ['add-rule', insertGetRulePlugin],
        ],
    });
    
    return code;
};
