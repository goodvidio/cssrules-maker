const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('media print 1', t => {
    const actual = `@media print {
        body {
            font-size: 16px;
        }

        p {
            padding: 1em;
        }
    }`;
    const expected = ['@media print{body{font-size: 16px;},p{padding: 1em;}}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('media list', t => {
    const actual = `@media screen, projection {
        body {
            font-size: 16px;
        }
    }`;
    const expected = ['@media screen, projection{body{font-size: 16px;}}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('media query 1', t => {
    const actual = `@media screen and (max-device-width: 480px), screen and (max-width: 480px) {
        .a {
            display: block;
        }
    }`;
    const expected = ['@media screen and (max-device-width: 480px), screen and (max-width: 480px){.a{display: block;}}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('media query 2', t => {
    const actual = `@media only screen
        and (min-device-width: 320px)
        and (max-device-width: 480px)
        and (-webkit-min-device-pixel-ratio: 2) {
            body { line-height: 1.4 }
    }`;
    const expected = ['@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2){body{line-height: 1.4;}}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});
