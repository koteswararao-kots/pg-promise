'use strict'

let requireDir          = require('require-dir');

module.exports = {
    products : requireDir('./this.products', {recurse:true }),
    
}