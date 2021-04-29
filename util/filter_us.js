#!/usr/bin/env node

// Read Open Weather Map city list and output US city list names to stdout

'use strict';

var uscore = require("underscore");
var fs = require("fs");
var beautify = require("json-beautify");

let rawdata = fs.readFileSync('../extdata/city.list.json');
let cities = JSON.parse(rawdata);

var onlyUS = uscore.where(cities, {country: "US"});

let unsortedCities = [];
onlyUS.forEach(function(c) {
    if (c.state.match(/[A-Z][A-Z]/)) {
        unsortedCities.push(c.name+","+c.state);
    }
});

let uniqueSortedCities = unsortedCities.sort();

 let justName=[];
 let idx=0;
 for (let e of uniqueSortedCities) {
    if (uniqueSortedCities.indexOf(e) === idx) {
        let city={};
        city.name = e;
        justName.push(city);
    }
    idx++;
}

process.stdout.write("const cities = ");
process.stdout.write(beautify(justName,null,1,78));
process.stdout.write(";\n");
process.stdout.write("export default cities;\n")
