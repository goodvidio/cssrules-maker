const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('import css file', t => {
    const actual = `@import 'custom.css';`;
    const expected = [`@import 'custom.css';`];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('import url print', t => {
    const actual = `@import url("fineprint.css") print;`;
    const expected = [`@import url("fineprint.css") print;`];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('import chrome:// urls', t => {
    const actual = `@import url("chrome://communicator/skin/");`;
    const expected = [`@import url("chrome://communicator/skin/");`];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex import 1', t => {
    const actual = `@import url("bluish.css") projection, tv;`;
    const expected = [`@import url("bluish.css") projection, tv;`];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex import 2', t => {
    const actual = `@import "common.css" screen, projection;`;
    const expected = [`@import "common.css" screen, projection;`];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex import 3', t => {
    const actual = `@import url('landscape.css') screen and (orientation:landscape);`;
    const expected = [`@import url('landscape.css') screen and (orientation:landscape);`];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});
