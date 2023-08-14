import rendy from 'rendy';
import {
    readFile,
    writeFile,
    mkdir,
    access,
} from 'fs/promises';
import {
    dirname,
    basename,
    join,
} from 'path';
import {
    writeNestedFixtures,
    writeNestedRule,
    writeNestedTests,
} from './nested.js';
import {
    writeFixtures,
    writeRule,
    writeTests,
} from './simple.js';
import tryToCatch from 'try-to-catch';

export const writePlugin = async (name, {rule, fixture, report}) => {
    const [isNested] = await tryToCatch(access, './package.json');
    
    if (isNested) {
        return await writeNested(name, {
            rule,
            fixture,
            report,
        });
    }
    
    await writeSimple(name, {
        rule,
        fixture,
        report,
    });
};

export const writeNested = async (name, {rule, fixture, report}) => {
    await writeNestedRule(name, rule);
    await writeNestedFixtures(name, fixture);
    await writeNestedTests(name, report);
};

export const writeSimple = async (name, {rule, fixture, report}) => {
    await writeRule(name, rule);
    await writeFixtures(name, fixture);
    await writeTests(name, report);
};