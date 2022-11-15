const {withFilter}        = require("graphql-subscriptions");
const { GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");
const {pubsub, channels} = require('../../lib/pubsub')

const typeDevice = global.gqlType.products;
let SPECIAL_KEY = 'PUBLISH_SUBSCRIBE|addProduct';

exports.addProduct = {
    type: typeDevice.products.productType,
    args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        imageUrl: {type: GraphQLNonNull(GraphQLString)},
        price: {type: GraphQLNonNull(GraphQLInt)}
    },
    resolve: payload => payload,
    subscribe: withFilter(
        (_, args, ctx) => pubsub.asyncIterator(SPECIAL_KEY),
        (payload, variables) => {
          return (true);
        }

    )
}