#!/usr/bin/env node

var postcss = require('postcss');
var fs = require('fs');
var _ = require('underscore');

var inputFile = process.argv.slice(2)[0];
var outputFile = process.argv.slice(2)[1];

if (inputFile && outputFile) {
    var css = fs.readFileSync(inputFile, 'utf8');
    var output = '';

    var parseRule = function (rule) {
        var result;

        result = rule.selector + "', '";

        result += rule.childs.map(parseDeclaration).join('');

        result = "module.insertRule('" + result + "');";

        return result;
    };

    var parseDeclaration = function (child) {
        if (child.type !=='comment') {
            var important = child.important ? ' !important': '';

            return child.prop + child.between + child.value + important + ';';
        } else {
            return '';
        }
    };

    var parseAtRule = function (rule) {
        var result;

        if (rule.name === 'import') {
            result = parseImportAtRule(rule);
        } else if (rule.name === 'media') {
            result = parseMediaAtRule(rule);
        } else if (rule.name === 'font-face') {
            result = parseFontFaceAtRule(rule);
        } else if (rule.name.slice(-9) === 'keyframes') {
            result = parseKeyframesAtRule(rule);
        } else {
            throw new Error('Unsupported atRule');
        }

        return result;
    };

    parseKeyframesAtRule = function (rule) {

        var result = '';

        if (rule.childs) {
            var queryStart = "@" + rule.name + " " + rule.params + "{";
            var queryEnd = "}";

            result =
                queryStart +
                rule.childs.map(parseKeyframesBreakpointRule).join('') +
                queryEnd;
        }

        result = "module.injectRule('" + result + "');";

        return result;
    };

    parseKeyframesBreakpointRule = function (breakpoint) {
        var result = breakpoint.selector + "{";

        if (breakpoint.childs) {
            for (var i = 0; i < breakpoint.childs.length; i++) {
                result += breakpoint.childs[i].prop + breakpoint.childs[i].between + breakpoint.childs[i].value + ';';
            }
        }

        result += '}';

        return result;
    };

    parseImportAtRule = function (rule) {
        var result;

        result = "module.injectRule('@" + rule.name + ' ' + rule.params + ";');";

        return result;
    };

    parseMediaAtRule = function (rule) {
        var result = '';

        if (rule.childs) {
            var query = "@" + rule.name + " " + rule.params + "{";

            _.each(rule.childs, function (rule) {
                result = query + rule.selector + "{";

                for (var i = 0; i < rule.childs.length; i++) {
                    var important = rule.childs[i].important ? ' !important' : '';
                    result += rule.childs[i].prop + rule.childs[i].between + rule.childs[i].value + important + ';';
                }

                result += '}}';

                result = "module.injectRule('" + result + "');";
            });
        }

        return result;
    };

    parseFontFaceAtRule = function (rule) {
        var result;

        result = "@" + rule.name + "', '";

        for (var i = 0; i < rule.childs.length; i++) {
            if (rule.childs[i].prop === 'font-family') {
                result += rule.childs[i].prop + rule.childs[i].between + rule.childs[i].value.split('\'').join('"') + ';';
            } else {
                result += rule.childs[i].prop + rule.childs[i].between + rule.childs[i].value + ';';
            }
        }

        result = "module.insertRule('" + result + "');";

        return result;
    };

    var contenter = postcss(function (css) {
        output = 'define(function () { return function (module) {';

        css.each(function (rule, index) {
            if (rule.type === 'rule') {
                output += parseRule(rule);
            } else if (rule.type === 'atrule') {
                output += parseAtRule(rule);
            }
        })

        output += '}});';
    });

    contenter.process(css).css;

    output = output.replace(/(\r\n|\n|\r)/gm,"");

    fs.writeFileSync(outputFile, output, 'utf8');
} else {
    throw new Error('Illegal amount of parameters, input and output paths as parameters are required (ie: myapp style.css result.js)');
}
