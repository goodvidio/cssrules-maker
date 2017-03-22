const path = require('path');
const testWrap = require(path.resolve('./test/helpers/wrap'));

testWrap(
    'font-face declaration',
    `@font-face {
      font-family: "Open Sans";
      font-style: normal;
      font-weight: 400;
      src: local("Open Sans"), local("OpenSans"), url("data:application/x-font-woff;base64,aaa=") format("woff"); }`,
    `module.insertRule('@font-face{font-family: "Open Sans";font-style: normal;font-weight: 400;src: local("Open Sans"), local("OpenSans"), url("data:application/x-font-woff;base64,aaa=") format("woff");}');`
);
