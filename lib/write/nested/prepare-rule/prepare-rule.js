import putout from 'putout';
import * as putoutPlugin from '@putout/plugin-putout';
import declare from '@putout/plugin-declare';
import declareBeforeReference from '@putout/plugin-declare-before-reference';

export const prepareRule = (source) => {
    const {code} = putout(source, {
        plugins: [
            ['declare', declare],
            ['declare-before-reference', declareBeforeReference],
            ['putout', putoutPlugin],
        ],
    });
    
    return code;
};
