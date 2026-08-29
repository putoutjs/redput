import {template, operator} from 'putout';

const {
    compare,
    __markdown,
    insertAfter,
} = operator;

export const report = ({name}) => `insert '#${name}' link to Rules`;

export const fix = ({name, rules}) => {
    const nodeLink = template.ast(`ul(li('✅ ', link('${name}', '#${name}')))`);
    insertAfter(rules, nodeLink);
};

export const traverse = ({options, push}) => {
    const {name = 'hello'} = options;
    
    return {
        [__markdown]: (path) => {
            const elements = path.get('arguments.0.elements');
            const {rules, link} = parseElements(elements, name);
            
            if (link)
                return;
            
            if (!rules)
                return;
            
            push({
                path,
                name,
                rules,
            });
        },
    };
};

function parseElements(elements, name) {
    let link;
    let rules;
    
    for (const element of elements) {
        if (compare(element, `ul(li('✅ ', link('${name}', '#${name}')))`)) {
            link = element;
            continue;
        }
        
        if (compare(element, `heading(2, 'Rules')`))
            rules = element;
    }
    
    return {
        link,
        rules,
    };
}

