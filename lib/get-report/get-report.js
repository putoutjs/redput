import putout, {operator} from 'putout';
import * as getReportPlugin from './putout-plugin-get-report/index.js';

export const getReport = (rule) => {
    const {places} = putout(rule, {
        fix: false,
        plugins: [
            ['get-report', getReportPlugin],
        ],
    });
    
    if (!places.length)
        return '';
    
    const [first] = places;
    
    return first.message;
};
