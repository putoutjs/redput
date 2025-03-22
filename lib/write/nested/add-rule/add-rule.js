import putout from 'putout';
import * as pluginPutout from '@putout/plugin-putout';
import nodejs from '@putout/plugin-nodejs';
import removeUnusedVariables from '@putout/plugin-remove-unused-variables';
import * as insertGetRulePlugin from './plugin-insert-get-rule/index.js';

export const addRule = (name, source, ruleOptions) => {
    const {code} = putout(source, {
        rules: {
            'nodejs/convert-commonjs-to-esm': 'on',
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
