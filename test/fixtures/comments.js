const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('comment 1', t => {
    const actual = `/* hello world */`;
    const expected = [];

    return cssrules(actual)
        .then(result => t.deepEqual(result, []));
});

test('comment 2', t => {
    const actual = `/* hello world */.a{color: red}`;
    const expected = ['.a{color: red;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});
