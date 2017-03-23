const path = require('path');
const testWrap = require(path.resolve('./test/helpers/wrap'));

testWrap(
    'keyframes',
    `@keyframes loading {
        0% { top: 0; left: 0; }
        2% { top: 50px; left: 25px; }
        100% { top: 100px; left: 100%; }
    }`,
    `module.insertRule('@keyframes loading{0%{top: 0;left: 0;} 2%{top: 50px;left: 25px;} 100%{top: 100px;left: 100%;}}');`
);
