import putout from 'putout';
import * as insertGetRulePlugin from './plugin-insert-get-rule/index.js';
import pluginPutout from '@putout/plugin-putout';
import nodejs from '@putout/plugin-nodejs';
import removeUnusedVariables from '@putout/plugin-remove-unused-variables';

export const addRule = (name, source, ruleOptions) => {
    const {code} = putout(source, {
        rules: {
            'nodejs/convert-esm-to-commonjs': 'on',
            'add-rule': ['on', {
                name,
                ruleOptions,
            }],
            'putout/declare': ['on', {
                dismiss: 'getRule',
            }],
        },
        plugins: [
            ['nodejs', nodejs],
            ['putout', pluginPutout],
            ['remove-unused-variables', removeUnusedVariables],
            ['add-rule', insertGetRulePlugin],
        ],
    });
    
    return code;
};
