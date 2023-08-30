#!/usr/bin/env node

import process from 'node:process';
import {redput} from '../lib/redput.js';

const {GITHUB_TOKEN} = process.env;
const [url] = process.argv.slice(2);

if (!url) {
    console.error('redput [putout-editor-url]');
    process.exit(1);
}

if (url === '-v' || url === '--version') {
    const {version} = await import('../lib/version.js');
    console.log(await version());
    process.exit();
}

const [error, result] = await redput(url, {
    token: GITHUB_TOKEN,
});

if (error) {
    console.error('❌', error.message);
    process.exit(1);
}

console.log('✅', result);
