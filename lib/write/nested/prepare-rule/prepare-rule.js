import putout from 'putout';
import convertESMToCommonjs from '@putout/plugin-convert-esm-to-commonjs';
import putoutPlugin from '@putout/plugin-putout';
import declare from '@putout/plugin-declare';
import declareBeforeReference from '@putout/plugin-declare-before-reference';

export const prepareRule = (source) => {
    const {code} = putout(source, {
        plugins: [
            ['declare', declare],
            ['declare-before-reference', declareBeforeReference],
            ['convert-esm-to-commonjs', convertESMToCommonjs],
            ['putout', putoutPlugin],
        ],
    });
    
    return code;
};
