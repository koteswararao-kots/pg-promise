const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLBoolean,
  }                       = require("graphql");
  const {GraphQLDateTime} = require("graphql-iso-date");
  const {GraphQLJSON}     = require("graphql-type-json"); 


  const productType = new GraphQLObjectType({
    name: 'productType',
    fields: {
      productsList: {
        type: GraphQLJSON,
        resolve: (stat) => stat,
      },
    }
  })

  module.exports = {
    productType
  }