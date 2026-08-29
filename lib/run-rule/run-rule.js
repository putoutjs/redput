import path from 'node:path';
import {putout} from 'putout';
import {compileRule} from '../compile-rule/compile-rule.js';

const noop = () => '';

export const runRule = (ruleSource, source) => {
    const plugin = compileRule(ruleSource, {
        require: (name) => {
            if (name === 'path' || name === 'node:path')
                return path;
            
            return putout;
        },
    });
    
    plugin.report = plugin.report ?? noop;
    
    const {code} = putout(source, {
        cache: false,
        fixCount: 1,
        plugins: [
            ['run-rule', plugin],
        ],
    });
    
    return code;
};
