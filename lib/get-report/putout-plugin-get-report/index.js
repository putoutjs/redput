import {operator} from 'putout';

const {getTemplateValues} = operator;
const REPORT = 'export const report = () => __a';
const ASSIGN = 'export const report = __a';

export const report = ({value}) => value;
export const fix = () => {};
export const traverse = ({push}) => ({
    [REPORT](path) {
        const {__a} = getTemplateValues(path, REPORT);
        
        push({
            path,
            value: __a.quasis[0].value.cooked,
        });
        
        path.stop();
    },
    [ASSIGN](path) {
        const {__a} = getTemplateValues(path, ASSIGN);
        
        push({
            path,
            value: __a.quasis[0].value.cooked,
        });
        
        path.stop();
    },
});

