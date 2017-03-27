const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('UTF-8 charset', t => {
    const actual = `@charset "UTF-8";`;
    const expected = ['@charset "UTF-8";'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('iso-8859-15 charset', t => {
    const actual = `@charset "iso-8859-15";`;
    const expected = ['@charset "iso-8859-15";'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});
