'use strict';

//Imports
var convert = require('./lib/convert');

colorine.rgb_to_lab  = convert.rgb_to_lab;
colorine.rgba_to_lab = convert.rgba_to_lab;

//Exports
var colorine = module.exports = {};