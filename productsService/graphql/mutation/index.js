'use strict'

const {GraphQLObjectType} = require("graphql");
// defaults to '.' And don't worry, the calling file is always ignored to prevent infinite loops.
const _ = require('require-dir')();

exports.mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addProduct : _.products.addProduct
    }
})