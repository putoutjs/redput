import {access} from 'node:fs/promises';
import {tryToCatch} from 'try-to-catch';
import {isTSCode} from './is-ts/index.js';
import {runRule} from '../run-rule/run-rule.js';
import {
    updateNestedIndex,
    updateOverallNestedFixtures,
    updateOverallNestedTest,
    writeNestedFixtures,
    writeNestedRule,
    writeNestedTests,
} from './nested/nested.js';
import {writeReadme} from './nested/write-readme/write-readme.js';
import {
    writeFixtures,
    writeRule,
    writeTests,
} from './simple.js';

export const writePlugin = async (name, {rule, fixture, report, options, link}) => {
    const [isNested] = await tryToCatch(access, './package.json');
    
    if (isNested)
        return await writeNested(name, {
            rule,
            fixture,
            report,
            options,
            link,
        });
    
    await writeSimple(name, {
        rule,
        fixture,
        report,
    });
};

export const writeNested = async (name, {rule, fixture, report, options, link}) => {
    const isTS = isTSCode(fixture);
    const ext = isTS ? 'ts' : 'js';
    const correct = runRule(rule, fixture);
    
    await writeNestedRule(name, rule, options);
    await writeNestedFixtures(name, fixture, ext, correct);
    await writeNestedTests(name, report);
    
    await tryToCatch(writeNestedOptional, name, {
        options,
        fixture,
        ext,
        correct,
        link,
    });
};

export const writeNestedOptional = async (name, {options, fixture, ext, correct, link}) => {
    await updateNestedIndex(name, options);
    await updateOverallNestedFixtures(name, fixture, ext, correct);
    await updateOverallNestedTest(name);
    await writeReadme(name, link, correct, fixture);
};

export const writeSimple = async (name, {rule, fixture, report}) => {
    await writeRule(name, rule);
    await writeFixtures(name, fixture);
    await writeTests(name, report);
};
