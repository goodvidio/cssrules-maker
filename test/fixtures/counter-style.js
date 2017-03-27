const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('counter-style 1', t => {
    const actual = `@counter-style nums {
        system: fixed;
        symbols: 1 2 3 4 5;
        suffix: " ";
    }`;
    const expected = ['@counter-style nums{system: fixed;symbols: 1 2 3 4 5;suffix: " ";}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('counter-style 2', t => {
    const actual = `@counter-style svg {
        system: fixed;
        symbols: url(a.svg) url(b.svg) url(c.svg);
        suffix: " ";
    }`;
    const expected = ['@counter-style svg{system: fixed;symbols: url(a.svg) url(b.svg) url(c.svg);suffix: " ";}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});
