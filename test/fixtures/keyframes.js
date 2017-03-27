const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('keyframes', t => {
    const actual = `@keyframes loading {
        0% { top: 0; left: 0; }
        2% { top: 50px; left: 25px; }
        100% { top: 100px; left: 100%; }
    }`;
    const expected = ['@keyframes loading{0%{top: 0;left: 0;} 2%{top: 50px;left: 25px;} 100%{top: 100px;left: 100%;}}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});
