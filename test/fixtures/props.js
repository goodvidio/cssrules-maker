const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('2 props', t => {
    const actual = `.a { color: red; top: 0; }`;
    const expected = ['.a{color: red;top: 0;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('5 props', t => {
    const actual = `.a { color: red; top: 0; bottom: 0; left: 0; right: 0; }`;
    const expected = ['.a{color: red;top: 0;bottom: 0;left: 0;right: 0;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('!important', t => {
    const actual = `.a { color: red !important; }`;
    const expected = ['.a{color: red !important;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('no !important', t => {
    const actual = `.a { color: red; }`;
    const expected = ['.a{color: red;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('prefixes', t => {
    const actual = `.a {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      padding: 0;
      width: 100%; }`;
    const expected = ['.a{display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;padding: 0;width: 100%;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});
