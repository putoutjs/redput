import putout from 'putout';
import * as getReportPlugin from './plugin-get-report/index.js';
import * as getReportFromAddArgsPlugin from './plugin-get-report-from-add-args/index.js';

export const getReport = (rule) => {
    const {places} = putout(rule, {
        fix: false,
        plugins: [
            ['get-report', getReportPlugin],
            ['get-report-from-add-args', getReportFromAddArgsPlugin],
        ],
    });
    
    if (!places.length)
        return '';
    
    const [first] = places;
    
    return first.message;
};
