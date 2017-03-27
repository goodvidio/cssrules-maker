const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('unknown atrule', t => {
    const actual = `@asdf{}`;
    const expected = `cannot parse asdf type of rule, visit this url to request this feature:
https://github.com/goodvidio/cssrules-maker/issues/new`;

    return cssrules(actual)
        .catch(e => t.is(e.message, expected));
});
