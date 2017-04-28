const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('font-face declaration', t => {
    const actual = `@font-face {
      font-family: "Open Sans" !important;
      font-style: normal;
      font-weight: 400;
      src: local("Open Sans"), local("OpenSans"), url("data:application/x-font-woff;base64,aaa=") format("woff"); }`;
    const expected = ['@font-face{font-family: "Open Sans";font-style: normal;font-weight: 400;src: local("Open Sans"), local("OpenSans"), url("data:application/x-font-woff;base64,aaa=") format("woff");}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('font-face declaration with !important', t => {
    const actual = `@font-face {
      font-family: "Open Sans" !important;
      font-style: normal;
      font-weight: 400;
      src: local("Open Sans"), local("OpenSans"), url("data:application/x-font-woff;base64,aaa=") format("woff"); }`;
    const expected = ['@font-face{font-family: "Open Sans";font-style: normal;font-weight: 400;src: local("Open Sans"), local("OpenSans"), url("data:application/x-font-woff;base64,aaa=") format("woff");}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});
