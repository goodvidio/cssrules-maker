const path = require('path');
const testWrap = require(path.resolve('./test/helpers/wrap'));

testWrap(
    '2 props',
    `.a { color: red; top: 0; }`,
    `module.insertRule('.a{color: red;top: 0;}');`
);

testWrap(
    '5 props',
    `.a { color: red; top: 0; bottom: 0; left: 0; right: 0; }`,
    `module.insertRule('.a{color: red;top: 0;bottom: 0;left: 0;right: 0;}');`
);

testWrap(
    '!important',
    `.a { color: red !important; }`,
    `module.insertRule('.a{color: red !important;}');`
);

testWrap(
    'no !important',
    `.a { color: red; }`,
    `module.insertRule('.a{color: red;}');`
);

testWrap(
    'prefixes',
    `.a {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      padding: 0;
      width: 100%; }`,
    `module.insertRule('.a{display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;padding: 0;width: 100%;}');`
);
