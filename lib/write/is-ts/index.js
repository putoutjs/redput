import {parse} from 'putout';
import {tryCatch} from 'try-catch';

export const isTSCode = (source) => {
    const [error] = tryCatch(parse, source, {
        isTS: false,
    });
    
    return Boolean(error);
};
