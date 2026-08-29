import {test} from 'supertape';
import {tryToCatch} from 'try-to-catch';
import protectFromLoops from './protect-from-loops.js';

test('redput: protectFromLoops: obvious loop: throws', async (t) => {
    const [error] = await tryToCatch(protectFromLoops, 'while(true){}');
    t.ok(error);
    t.end();
});

test('redput: protectFromLoops: loop: injects guard', (t) => {
    const result = protectFromLoops('for(let i=0;i<10;i++){}');
    t.match(result, 'Infinite loop detected on line');
    t.end();
});

test('redput: protectFromLoops: no loop: returns unchanged', (t) => {
    const input = 'var x = 1;';
    t.equal(protectFromLoops(input), input);
    t.end();
});