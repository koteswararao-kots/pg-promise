const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
  }                     = require("graphql");
  const {GraphQLJSON}     = require("graphql-type-json");
  const typeProducts       = global.gqlType.products;
  const products          = require('../../apis/products/products');

  exports.productsQuery = new GraphQLObjectType({
    name: 'productsRelatedQuery',
    fields: {
      getProducts: {
        type:  typeProducts.products.productType,
        args: {
          masterName  : {type: GraphQLString},
          ispId       : {type: GraphQLString},
          appName     : {type: GraphQLString},
        },
        resolve: (_, args, ctx) => {
          return products.getProducts(args)
          .then(global.query.onPass)
          .catch(global.query.onFail)
        }
      },
    //   getLicenseInfo: {
    //     type: typeDevice.system.licenseType,
    //     args: {
    //       masterName  : {type: GraphQLNonNull(GraphQLString)},
    //       ispId      : {type: GraphQLNonNull(GraphQLString)},
    //     },
    //     resolve: (_, args, ctx) => {
    //       return license.getLicenseInfo(args)
    //       .then(global.query.onPass)
    //       .catch(global.query.onFail)
    //     }
    //   },
    }
  });
  
