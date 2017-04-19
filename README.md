cssrules
==============

[![npm](https://img.shields.io/npm/v/cssrules.svg?style=flat-square)](https://www.npmjs.com/package/cssrules)
[![Build Status](https://travis-ci.org/goodvidio/cssrules-maker.svg?branch=master)](https://travis-ci.org/goodvidio/cssrules-maker)
[![Dependency Status](https://dependencyci.com/github/goodvidio/cssrules-maker/badge)](https://dependencyci.com/github/goodvidio/cssrules-maker)
[![Coverage Status](https://coveralls.io/repos/github/goodvidio/cssrules-maker/badge.svg?branch=master)](https://coveralls.io/github/goodvidio/cssrules-maker?branch=master)

## About

CSS in JS via the CSSStylesheet API

## Description

This library takes a CSS string and outputs an Array of Strings that are consumable by the CSSStylesheet API

## Installation

```shell
npm install --save cssrules
```

## Usage

### Example #1

```js
const cssrules = require('cssrules');

cssrules(`.myrule { color: red; }`)
  .then(output => {
      console.log(output);
  });

```

### Example #2

```js
const cssrules = require('cssrules');
const fs = require('fs');
const path = require('path');
const myCssFile = fs.readFileSync(path.resolve('./my_file.css', 'utf8'));

cssrules(myCssFile)
  .then(output => {
      console.log(output);
  });
```

## Integrations

* webpack via [cssrules-loader](https://github.com/goodvidio/cssrules-loader)
