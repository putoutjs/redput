import putout from 'putout';
import * as putoutPlugin from '@putout/plugin-putout';
import * as declare from '@putout/plugin-declare';
import * as convertCommonjsToESM from '@putout/plugin-nodejs/convert-commonjs-to-esm';
import * as declareBeforeReference from '@putout/plugin-declare-before-reference';

export const prepareRule = (source) => {
    const {code} = putout(source, {
        plugins: [
            ['convert-commonjs-to-esm', convertCommonjsToESM],
            ['declare', declare],
            ['declare-before-reference', declareBeforeReference],
            ['putout', putoutPlugin],
        ],
    });
    
    return code;
};
