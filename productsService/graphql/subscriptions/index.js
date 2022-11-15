'use strict'

const {GraphQLObjectType} = require("graphql");
// defaults to '.' And don't worry, the calling file is always ignored to prevent infinite loops.
const _ = require('require-dir')();

exports.subscription  = new GraphQLObjectType({
    name: "Subscription",
    fields: {
      addProduct           : _.subscribe.addProduct,
      
    }
  });