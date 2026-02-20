import {operator} from 'putout';

const {
    extract,
    getTemplateValues,
} = operator;

export const report = (path) => {
    const {__object} = getTemplateValues(path, 'addArgs(__object)');
    
    const name = extract(__object.properties[0].key);
    
    return `Argument '${name}' is missing`;
};

export const fix = () => {};
export const include = () => [
    'addArgs(__object)',
];
