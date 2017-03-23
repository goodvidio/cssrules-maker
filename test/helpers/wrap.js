const path = require ('path');
const test = require ('ava');

const cssrules = require(path.resolve('./src/app'));

test(
    'cssrules is a function',
    t => t.is(typeof cssrules, 'function')
);

test(
    'cssrules returns a promise',
    t => t.is(
        typeof Promise.resolve(cssrules).then,
        'function'
    )
);

const testWrap = (description, actual, expected) => {
    test(description, t => {
        return cssrules(actual)
            .then(result => t.is(expected, result));
    });
};

module.exports = testWrap;
