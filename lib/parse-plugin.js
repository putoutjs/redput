import tryCatch from 'try-catch';

const {parse} = JSON;

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
    
    const [error, data] = tryCatch(parse, raw);
    
    if (error)
        return ['', raw];
    
    return [data[0], data[1]];
}
