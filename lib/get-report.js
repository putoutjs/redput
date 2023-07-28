import putout, {operator} from 'putout';

const {getTemplateValues} = operator;

const REPORT = 'export const report = () => __a';

export const getReport = (rule) => {
    let result;
    
    putout(rule, {
        fix: false,
        plugins: [
            ['read-report', {
                report: () => {},
                fix: () => {},
                traverse: () => ({
                    [REPORT](path) {
                        const {__a} = getTemplateValues(path, REPORT);
                        
                        result = __a.quasis[0].value.cooked;
                        path.stop();
                    }
                }),
            }],
        ],
    });
    
    return result;
};
