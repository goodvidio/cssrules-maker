#!/usr/bin/env node

var postcss = require('postcss');
var fs = require('fs');

var input = process.argv.slice(2)[0];
var output = process.argv.slice(2)[1];

if (input && output) {
    var css = fs.readFileSync(input, 'utf8');
    var result = 'define(function () { return function (module) {';

    var contenter = postcss(function (css) {
        css.eachRule(function (rule) {
            result += "module.insertRule('" + rule.selector + "', '";

            for (var i = 0; i < rule.childs.length; i++) {
                result += rule.childs[i].prop + rule.childs[i].between + rule.childs[i].value + ';'
            }

            result += "');";
        });
    });

    result += '}});';

    contenter.process(css).css;

    result = result.replace(/(\r\n|\n|\r)/gm,"");

    var css = fs.writeFileSync(output, result, 'utf8');
} else {
    throw Error('Illegal amount of parameters, input and output paths as parameters are required (ie: myapp style.css result.js)');
}
