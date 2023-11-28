import {access} from 'node:fs/promises';
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
import tryToCatch from 'try-to-catch';

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
    await writeNestedRule(name, rule, options);
    await writeNestedFixtures(name, fixture);
    await writeNestedTests(name, report);
    
    await tryToCatch(writeNestedOptional, name, {
        options,
        fixture,
    });
};

export const writeNestedOptional = async (name, {options, fixture}) => {
    await updateNestedIndex(name, options);
    await updateOverallNestedFixtures(name, fixture);
    await updateOverallNestedTest(name);
};

export const writeSimple = async (name, {rule, fixture, report}) => {
    await writeRule(name, rule);
    await writeFixtures(name, fixture);
    await writeTests(name, report);
};
