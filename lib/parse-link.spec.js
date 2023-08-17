import {test} from 'supertape';
import {link} from 'fs/promises';
import {
    MOBILE_PUTOUT_EDITOR,
    parseLink,
    PUTOUT_EDITOR,
} from './parse-link.js';

const HASH = '#/gist/152cd7ab663d1ad34c95e49806e21d28/71dba19eb23fbf8f81a0c8d620b3cb93f567f3a9';

test('redput: parse-link: putout editor', (t) => {
    const link = PUTOUT_EDITOR + HASH;
    const result = parseLink(link);
    const expected = HASH;
    
    t.equal(result, expected);
    t.end();
});

test('redput: parse-link: mobile putout editor', (t) => {
    const link = MOBILE_PUTOUT_EDITOR + HASH;
    
    const result = parseLink(link);
    
    const expected = HASH;
    
    t.equal(result, expected);
    t.end();
});

