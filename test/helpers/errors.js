const path = require ('path');
const test = require ('ava');

const cssrules = require(path.resolve('./src/app'));

const errorWrap = (description, actual, expected) => {
    test(description, t => {
        return cssrules(actual)
            .then(result => result)
            .catch(e =>
            t.is(e.message, expected));
    });
};

module.exports = errorWrap;
