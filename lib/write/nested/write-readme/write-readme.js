import {readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import process from 'node:process';
import {putout} from 'putout';
import {branch, merge} from '@putout/processor-markdown';
import * as insertRuleSection from './insert-rule-section/index.js';

const README = 'README.md';

export const writeReadme = async (name, link, correct, incorrect, overrides = {}) => {
    const {
        read = readFile,
        write = writeFile,
        cwd = process.cwd(),
    } = overrides;
    
    const readmePath = join(cwd, '..', README);
    const source = await read(readmePath, 'utf8');
    
    const [mdItem] = await branch(source);
    
    const {code} = putout(mdItem.source, {
        rules: {
            'insert-rule-section': ['on', {
                name,
                link,
                correct,
                incorrect,
            }],
        },
        plugins: [
            ['insert-rule-section', insertRuleSection],
        ],
    });
    
    mdItem.source = code;
    
    const result = await merge(source, [mdItem.source]);
    
    await write(readmePath, result);
};
