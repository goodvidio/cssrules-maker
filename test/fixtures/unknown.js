const path = require('path');
const errorWrap = require(path.resolve('./test/helpers/errors'));
const unknownRule = require(path.resolve('./src/app'));

errorWrap(
    'unknown rule',
    `asdf{}`,
    `cannot parse asdf type of rule, visit this url to request this feature:
https://github.com/goodvidio/cssrules-maker/issues/new`
);
