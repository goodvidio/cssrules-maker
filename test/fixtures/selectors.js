const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));
test('single class', t => {
    const actual = `.a { color: blue; }`;
    const expected = ['.a{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('coma separated classes', t => {
    const actual = `.b, .c { color: red; }`;
    const expected = ['.b, .c{color: red;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('single id', t => {
    const actual = `#a { color: red; }`;
    const expected = ['#a{color: red;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('coma separated ids', t => {
    const actual = `#b, #c { color: red; }`;
    const expected = ['#b, #c{color: red;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('id and class', t => {
    const actual = `#b .a { color: red; }`;
    const expected = ['#b .a{color: red;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('[dir="rtl"]', t => {
    const actual = `#a [dir="rtl"] .b {float: right}`;
    const expected = ['#a [dir="rtl"] .b{float: right;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('type selector', t => {
    const actual = `form input { color: blue; }`;
    const expected = ['form input{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('universal selector', t => {
    const actual = `* { color: blue; }`;
    const expected = ['*{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('id and universal selector', t => {
    const actual = `#el * { color: blue; }`;
    const expected = ['#el *{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

// Attribute selectors

test('[attr] selector', t => {
    const actual = `[attr] { color: blue; }`;
    const expected = ['[attr]{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('[attr=val] selector', t => {
    const actual = `[attr=val] { color: blue; }`;
    const expected = ['[attr=val]{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('[attr~=val] selector', t => {
    const actual = `[attr~=val] { color: blue; }`;
    const expected = ['[attr~=val]{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('[attr|=val] selector', t => {
    const actual = `[attr|=val] { color: blue; }`;
    const expected = ['[attr|=val]{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('[attr^=val] selector', t => {
    const actual = `[attr^=val] { color: blue; }`;
    const expected = ['[attr^=val]{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('[attr$=val] selector', t => {
    const actual = `[attr$=val] { color: blue; }`;
    const expected = ['[attr$=val]{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('[attr*=val] selector', t => {
    const actual = `[attr*=val] { color: blue; }`;
    const expected = ['[attr*=val]{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('[attr i] case insensitive selector', t => {
    const actual = `[attr i] { color: blue; }`;
    const expected = ['[attr i]{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

// Sibling selectors

test('Adjacent sibling selector', t => {
    const actual = `div + p { color: blue; }`;
    const expected = ['div + p{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('General sibling selector', t => {
    const actual = `div ~ p { color: blue; }`;
    const expected = ['div ~ p{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('Child selector', t => {
    const actual = `div > p { color: blue; }`;
    const expected = ['div > p{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('Descendant selector', t => {
    const actual = `div > p { color: blue; }`;
    const expected = ['div > p{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

// Pseudo element selectors

test('before pseudo-element (CSS3 syntax)', t => {
    const actual = `.a::before { color: blue; }`;
    const expected = ['.a::before{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('after pseudo-element (CSS3 syntax)', t => {
    const actual = `.a::after { color: blue; }`;
    const expected = ['.a::after{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('before pseudo-element (CSS3 syntax) with content', t => {
    const actual = `.a::before { content: ""; color: blue; }`;
    const expected = ['.a::before{content: "";color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('after pseudo-element (CSS3 syntax) with content', t => {
    const actual = `.a::after { content: ""; color: blue; }`;
    const expected = ['.a::after{content: "";color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('before pseudo-element (CSS2 syntax)', t => {
    const actual = `.a:before { color: blue; }`;
    const expected = ['.a:before{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('after pseudo-element (CSS2 syntax)', t => {
    const actual = `.a:after { color: blue; }`;
    const expected = ['.a:after{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

// Pseudo class selectors

test(':active pseudo class selector', t => {
    const actual = `a:active { color: blue; }`;
    const expected = ['a:active{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test(':checked pseudo class selector', t => {
    const actual = `input:checked { color: blue; }`;
    const expected = ['input:checked{color: blue;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});
