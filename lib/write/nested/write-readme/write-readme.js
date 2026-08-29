import {readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import process from 'node:process';
import {putout} from 'putout';
import {branch, merge} from '@putout/processor-markdown';
import * as insertRuleSection from './insert-rule-section/index.js';
import * as insertRuleLink from './insert-rule-link/index.js';

const README = 'README.md';
const getSource = (a) => a.source;

export const writeReadme = async (name, link, correct, incorrect, overrides = {}) => {
    const {
        read = readFile,
        write = writeFile,
        cwd = process.cwd(),
    } = overrides;
    
    const readmePath = join(cwd, '..', README);
    const readme = await read(readmePath, 'utf8');
    
    const list = await branch(readme);
    const [{source}] = list;
    
    const {code} = putout(source, {
        rules: {
            'insert-rule-section': ['on', {
                name,
                link,
                correct,
                incorrect,
            }],
            'insert-rule-link': ['on', {
                name,
            }],
        },
        plugins: [
            ['insert-rule-section', insertRuleSection],
            ['insert-rule-link', insertRuleLink],
        ],
    });
    
    const newList = [
        code,
        ...list
            .slice(1)
            .map(getSource),
        incorrect,
        correct,
    ];
    
    const result = await merge(source, newList);
    
    await write(readmePath, result);
};
