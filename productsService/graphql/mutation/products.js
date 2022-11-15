const { GraphQLNonNull, GraphQLInt, GraphQLString, graphql } = require("graphql");
const {mutationWithClientMutationId}  = require("graphql-relay");

// const apis = global.apis;
const apis = require("../../apis/products/addProduct")

const addProduct = mutationWithClientMutationId({
    name: 'cpeSetConfig',
    inputFields: {
    //    id : {type: GraphQLNonNull(GraphQLInt)},
       name: {type: GraphQLNonNull(GraphQLString)},
       imageUrl: {type: GraphQLNonNull(GraphQLString)},
       price: {type: GraphQLNonNull(GraphQLInt)} 
    },
    outputFields: global.mutation.outputFields,
    mutateAndGetPayload: (inputobj, ctx) => {
        return apis.addProduct(inputobj)
        .then(global.mutation.onPass)
        .catch(global.mutation.onFail)

    }

})

exports.addProduct = addProduct;