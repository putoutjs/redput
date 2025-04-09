import putout from 'putout';
import * as pluginPutout from '@putout/plugin-putout';
import * as nodejs from '@putout/plugin-nodejs';
import * as removeUnusedVariables from '@putout/plugin-remove-unused-variables';
import * as esm from '@putout/plugin-esm';
import * as insertGetRulePlugin from './plugin-insert-get-rule/index.js';

export const addRule = (name, source, ruleOptions) => {
    const {code} = putout(source, {
        rules: {
            'nodejs/convert-commonjs-to-esm': 'on',
            'add-rule': ['on', {
                name,
                ruleOptions,
            }],
            'esm': 'off',
            'esm/add-index-to-import': 'on',
            'putout/declare': ['on', {
                dismiss: 'getRule',
            }],
        },
        plugins: [
            ['nodejs', nodejs],
            ['putout', pluginPutout],
            ['remove-unused-variables', removeUnusedVariables],
            ['add-rule', insertGetRulePlugin],
            ['esm', esm],
        ],
    });
    
    return code;
};
