const modulify = require('./utils').modulify;
const stringify = require('./utils').stringify;
const cleanupTokens = require('./utils').cleanupTokens;
const notSupportedYet = require('./utils').notSupportedYet;
const isSimple = require('./utils').isSimple;

const parsers = {};

parsers.root = root => {
    const output = [];

    root.each(statement => {
        switch (statement.type) {
            case 'rule':
                output.push(parsers.rule(statement));
                break;
            case 'atrule':
                output.push(parsers.atrule(statement));
                break;
            case 'comment':
                return '';
            default:
                notSupportedYet(statement.type);
        };
    });

    return output;
};

parsers.rule = rule => {
    const selector = `${cleanupTokens(rule.selector)}`;
    const props = parsers.declarations(rule.nodes);

    return {
        selector,
        props
    };
};

parsers.rules = (rules, joinChar = ',') => {
    return rules
        .map(rule => {
            const selector = `${cleanupTokens(rule.selector)}`;
            const props = parsers.declarations(rule.nodes);
            return `${selector}{${props}}`;
        })
        .join(joinChar)
};

parsers.declaration = declaration => {
    if (declaration.type !=='comment') {
        const important = declaration.important ? ' !important': '';

        return `${declaration.prop}: ${declaration.value}${important};`;
    } else {
        return '';
    }
};

parsers.declarations = declarations => {
    return declarations
        .map(parsers.declaration)
        .join('');
};

parsers.fontFace = atrule => {
    const selector = `@${atrule.name}`;
    const props = parsers.declarations(atrule.nodes);

    return {
        selector,
        props
    };
};

parsers.import = atrule => {
    const selector = `@${cleanupTokens(atrule.name)}`;
    const params = cleanupTokens(atrule.params);

    return {
        selector,
        params
    };
};

parsers.charset = atrule => {
    const selector = `@${cleanupTokens(atrule.name)}`;
    const params = cleanupTokens(atrule.params);

    return {
        selector,
        params
    };
};

parsers.media = atrule => {
    const selector = `@${atrule.name} ${cleanupTokens(atrule.params)}`;
    const rules = parsers.rules(atrule.nodes);

    return {
        selector,
        rules
    };
};

parsers.counterStyle = atrule => {
    const selector = `@${atrule.name} ${cleanupTokens(atrule.params)}`;
    const rules = parsers.declarations(atrule.nodes);

    return {
        selector,
        rules
    };
};

parsers.keyframes = atrule => {
    const selector = `@${atrule.name} ${cleanupTokens(atrule.params)}`;
    const rules = parsers.rules(atrule.nodes, ' ');

    return {
        selector,
        rules
    };
};

// parsers.supports = atrule => {
//     const selector = `@${atrule.name} ${cleanupTokens(atrule.params)}`;
//     const children = atrule
//         .nodes
//         .map(parsers.root)
//         .map(data => {
//             console.log(data);
//             if (isSimple(data)) {
//                 return stringify.simple(data);
//             } else {
//                 return stringify.wrap(data);
//             }
//         });
//
//     console.log(children);
//
//     return {
//         selector,
//         rules
//     };
// };

parsers.atrule = function (atrule) {
    switch (atrule.name) {
        case 'font-face':
           return parsers.fontFace(atrule);
        case 'media':
           return parsers.media(atrule);
        case 'import':
           return parsers.import(atrule);
        case 'charset':
           return parsers.charset(atrule);
        case 'keyframes':
           return parsers.keyframes(atrule);
        case 'counter-style':
           return parsers.counterStyle(atrule);
       // case 'supports':
       //    return parsers.supports(atrule);
        default:
            notSupportedYet(atrule.name);
    }
};

module.exports = parsers;
