import {template, operator} from 'putout';

const {
    compare,
    __markdown,
    remove,
} = operator;

export const report = ({name}) => `Insert '${name}' to 'README.md'`;

export const fix = ({name, link, license, correct, incorrect}) => {
    const {elements} = license.parentPath.node;
    
    const heading = template.ast(`heading(2, '${name}')`);
    const paragraph = template.ast(`paragraph('Checkout in 🐊', link(bold('Putout Editor'), '${link}'), '.')`);
    const headingIncorrect = template.ast(`heading(3, '❌ Example of incorrect code')`);
    const codeIncorrect = template.ast(`codeblock('js', \`${incorrect}\`)`);
    const headingCorrect = template.ast(`heading(3, '✅ Example of correct code')`);
    const codeCorrect = template.ast(`codeblock('js', \`${correct}\`)`);
    
    const licenseType = license.getNextSibling();
    
    elements.push(...[
        heading,
        paragraph,
        headingIncorrect,
        codeIncorrect,
        headingCorrect,
        codeCorrect,
        license.node,
        licenseType.node,
    ]);
    
    remove(licenseType);
    remove(license);
};

export const traverse = ({options, push}) => {
    const {
        name,
        link,
        correct = '',
        incorrect = '',
    } = options;
    
    return {
        [__markdown]: (path) => {
            const elements = path.get('arguments.0.elements');
            const {license, ruleSection} = parseElements(elements, name);
            
            if (ruleSection)
                return;
            
            if (!license)
                return;
            
            push({
                path,
                name,
                link,
                license,
                correct,
                incorrect,
            });
        },
    };
};

function parseElements(elements, name) {
    let license;
    let ruleSection;
    
    for (const element of elements) {
        if (compare(element, 'heading(2, "License")')) {
            license = element;
            continue;
        }
        
        if (compare(element, `heading(2, '${name}')`))
            ruleSection = element;
    }
    
    return {
        license,
        ruleSection,
    };
}
