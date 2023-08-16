import {access} from 'fs/promises';
import {
    updateNestedIndex,
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
    await updateNestedIndex(name);
};

export const writeSimple = async (name, {rule, fixture, report}) => {
    await writeRule(name, rule);
    await writeFixtures(name, fixture);
    await writeTests(name, report);
};
