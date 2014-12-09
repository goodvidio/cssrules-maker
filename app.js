#!/usr/bin/env node

var postcss = require('postcss');
var fs = require('fs');
var _ = require('underscore');

var input = process.argv.slice(2)[0];
var output = process.argv.slice(2)[1];

if (input && output) {
    var css = fs.readFileSync(input, 'utf8');
    var result;

    var contenter = postcss(function (css) {
        result = 'define(function () { return function (module) {';

        css.eachRule(function (rule) {
            if (rule.parent.type === 'root') {
                result += "module.insertRule('" + rule.selector + "', '";

                for (var i = 0; i < rule.childs.length; i++) {
                    result += rule.childs[i].prop + rule.childs[i].between + rule.childs[i].value + ';';
                }

                result += "');";
            }
        });

        css.eachAtRule(function (atrule) {
            if (atrule.name === 'import') {
                result += "module.injectRule('@" + atrule.name + ' ' + atrule.params + ";');";
            } else if (atrule.name === 'media') {
                if (atrule.childs) {

                    _.each(atrule.childs, function (rule) {
                        var temp = "@" + atrule.name + " " + atrule.params + "{" + rule.selector + "{";

                        for (var i = 0; i < rule.childs.length; i++) {
                            temp += rule.childs[i].prop + rule.childs[i].between + rule.childs[i].value + ';';
                        }

                        temp += '}}';

                        result += "module.injectRule('" + temp + "');";
                    });
                }
            } else{
                throw new Error('Unsupported atRule');
            }
        });

       result += '}});';
    });

    contenter.process(css).css;


    result = result.replace(/(\r\n|\n|\r)/gm,"");

    var css = fs.writeFileSync(output, result, 'utf8');
} else {
    throw Error('Illegal amount of parameters, input and output paths as parameters are required (ie: myapp style.css result.js)');
}
