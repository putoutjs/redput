import {access} from 'node:fs/promises';
import {tryToCatch} from 'try-to-catch';
import {
    updateNestedIndex,
    updateOverallNestedFixtures,
    updateOverallNestedTest,
    writeNestedFixtures,
    writeNestedRule,
    writeNestedTests,
} from './nested/nested.js';
import {
    writeFixtures,
    writeRule,
    writeTests,
} from './simple.js';
import {isTSCode} from './is-ts/index.js';

export const writePlugin = async (name, {rule, fixture, report, options}) => {
    const [isNested] = await tryToCatch(access, './package.json');
    
    if (isNested)
        return await writeNested(name, {
            rule,
            fixture,
            report,
            options,
        });
    
    await writeSimple(name, {
        rule,
        fixture,
        report,
    });
};

export const writeNested = async (name, {rule, fixture, report, options}) => {
    const isTS = isTSCode(fixture);
    const ext = isTS ? 'ts' : 'js';
    
    await writeNestedRule(name, rule, options);
    await writeNestedFixtures(name, fixture, ext);
    await writeNestedTests(name, report);
    
    await tryToCatch(writeNestedOptional, name, {
        options,
        fixture,
        ext,
    });
};

export const writeNestedOptional = async (name, {options, fixture, ext}) => {
    await updateNestedIndex(name, options);
    await updateOverallNestedFixtures(name, fixture, ext);
    await updateOverallNestedTest(name);
};

export const writeSimple = async (name, {rule, fixture, report}) => {
    await writeRule(name, rule);
    await writeFixtures(name, fixture);
    await writeTests(name, report);
};
