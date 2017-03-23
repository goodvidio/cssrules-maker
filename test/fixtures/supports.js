const path = require('path');
const testWrap = require(path.resolve('./test/helpers/wrap'));

testWrap(
    'supports 1',
    `@supports (animation-name: test) {
        @keyframes loading {
            0% { top: 0; left: 0; }
            2% { top: 50px; left: 25px; }
            100% { top: 100px; left: 100%; }
        }
    }`,
    `module.insertRule('@supports (animation-name: test) {@keyframes loading{0%{top: 0;left: 0;} 2%{top: 50px;left: 25px;} 100%{top: 100px;left: 100%;}}}');`
);

testWrap(
    'supports 2',
    `@supports (--foo: green) {
        body {
            color: green;
        }
    }`,
    `module.insertRule('@supports (--foo: green){body{color: green;}}');`
);
