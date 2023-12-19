import tryCatch from 'try-catch';
import {
    parse,
    transform,
    print,
} from 'putout';

import * as applyStringsTuple from './apply-strings-tuple/index.js';

export const parsePlugin = (raw) => {
    const [comment, ...lines] = raw.split('\n');
    const [options, name] = parseComment(comment);
    
    return {
        name,
        lines,
        options,
    };
};

function parseComment(comment) {
    const raw = comment
        .replace('//', '')
        .trimStart();
    
    const [error, data] = tryCatch(JSON.parse, raw);
    
    if (!error)
        return data;
    
    const [parseError, ast] = tryCatch(parse, raw);
    
    if (parseError)
        return ['', raw];
    
    transform(ast, raw, {
        plugins: [
            ['apply-strings-tuple', applyStringsTuple],
        ],
    });
    
    const json = print(ast, {
        printer: ['putout', {
            format: {
                quote: '"',
            },
            semantics: {
                encodeDoubleQuote: false,
                trailingComma: false,
            },
        }],
    }).slice(0, -2);
    
    const [secondError, result] = tryCatch(JSON.parse, json);
    
    if (secondError)
        return ['', raw];
    
    return result;
}
