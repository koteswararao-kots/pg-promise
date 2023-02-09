'use strict'

const {
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
  }                      = require("graphql");
  const {UserInputError} = require("apollo-server");
  const requireDir       = require('require-dir');
  //const {GraphQLUpload}  = require('graphql-upload');
  global.gqlType        = requireDir('./typedef/',     {recurse: true});


  global.query = {
    onPass: (resp) => {
      return resp;
    },
    onFail: (err) => {
      throw new UserInputError(err);
    }
  }

  global.mutation = {
    outputFields: {
      message    : {type: GraphQLNonNull(GraphQLString)},
      triggerTime: {type: GraphQLFloat},
    },
    onPass: (resp) => {
      let result = {message: null}
      if (typeof(resp) === 'object') {
        console.log("#############3")
        console.log("resp.msg", resp.msg);
        result = {
          message: resp.msg.toString(),
          ...(resp.triggerTime && {triggerTime: resp.triggerTime})
        }
      } else {
        result.message = resp;
      }
      return result;
    },
    onFail: (err) => {
      throw new UserInputError(err);
    }
  }
  

  const schema = new GraphQLSchema({
    query         :   require('./query/index').query,
    mutation      :   require('./mutation/index').mutation,
    subscription  :   require('./subscriptions/index').subscription,
  });
  
  exports.schema = schema;



