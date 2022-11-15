'use strict'

const {GraphQLObjectType} = require("graphql");
// defaults to '.' And don't worry, the calling file is always ignored to prevent infinite loops.
const _ = require('require-dir')();

exports.query  = new GraphQLObjectType({
  name: 'Query',
  fields: {
    products: {
      type    : _.products.productsQuery,
      resolve : x => x
    },
    // device: {
    //   type    : _.device.cpeQuery,
    //   resolve : x => x
    // },
    
  }
});