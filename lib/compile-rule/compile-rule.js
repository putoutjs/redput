import {putout} from 'putout';
import * as pluginConvertEsmToCommonjs from '@putout/plugin-nodejs/convert-esm-to-commonjs';
import * as pluginOptionalChaining from '@putout/plugin-optional-chaining';
import * as pluginPutout from '@putout/plugin-putout';
import * as pluginDeclare from '@putout/plugin-declare';
import * as pluginTypes from '@putout/plugin-types';
import * as pluginDeclareBeforeReference from '@putout/plugin-declare-before-reference';
import * as pluginNodejs from '@putout/plugin-nodejs';
import * as pluginDestructuring from '@putout/plugin-destructuring';
import * as pluginMaybe from '@putout/plugin-maybe';
import * as pluginVariables from '@putout/plugin-variables';
import * as pluginConditions from '@putout/plugin-conditions';
import protectFromLoops from './protect-from-loops/protect-from-loops.js';

export const compileRule = (code, globals = {}) => {
    const exports = {};
    const module = {
        exports,
    };
    
    const keys = [
        'module',
        'exports',
        ...Object.keys(globals),
    ];
    
    const values = [
        module,
        exports,
        ...Object.values(globals),
    ];
    
    const {code: compiled} = putout(code, {
        fixCount: 10,
        plugins: [
            ['declare', pluginDeclare],
            ['declare-before-reference', pluginDeclareBeforeReference],
            ['destructuring/merge-properties', pluginDestructuring.rules['merge-properties']],
            ['variables/extract-keywords', pluginVariables.rules['extract-keywords']],
            ['putout', pluginPutout],
            ['maybe', pluginMaybe],
            ['types', pluginTypes],
            ['conditions', pluginConditions],
            ['variables/convert-const-to-let', pluginVariables.rules['convert-const-to-let']],
            ['optional-chaining', pluginOptionalChaining],
            ['nodejs/declare-after-require', pluginNodejs.rules['declare-after-require']],
            ['nodejs/convert-esm-to-commonjs', pluginConvertEsmToCommonjs],
        ],
    });
    
    const safe = protectFromLoops(compiled);
    
    new Function(keys.join(), safe).apply(exports, values);
    
    return module.exports;
};
