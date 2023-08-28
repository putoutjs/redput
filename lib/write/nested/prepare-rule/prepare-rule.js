import putout from 'putout';
import convertESMToCommonjs from '@putout/plugin-convert-esm-to-commonjs';
import putoutPlugin from '@putout/plugin-putout';
import declare from '@putout/plugin-declare';

export const prepareRule = (source) => {
    const {code} = putout(source, {
        plugins: [
            ['declare', declare],
            ['convert-esm-to-commonjs', convertESMToCommonjs],
            ['putout', putoutPlugin],
        ],
    });
    
    return code;
};
