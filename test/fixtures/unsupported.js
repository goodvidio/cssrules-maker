const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('unsupported top level declaration', t => {
    const actual = `a:red`;
    const expected = [];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});
