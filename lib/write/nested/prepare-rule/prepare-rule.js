import putout from 'putout';

export const prepareRule = (source) => {
    const {code} = putout(source, {
        plugins: [
            'declare',
            'convert-esm-to-commonjs',
            'putout',
        ],
    });
    
    return code;
};
