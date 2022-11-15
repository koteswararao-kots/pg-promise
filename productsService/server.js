// const { ApolloServer, gql } = require('apollo-server');


// const server = new ApolloServer({ typeDefs, resolvers })

// server.listen().then(({ url }) => {
//   console.log(`Server is ready at ${url}`)
// });

//const koa               = require('./lib/koa');
const schema            = require('./graphql/index').schema;
const {graphqlKoa, graphiqlKoa} = require("apollo-server-koa");
const koaRouter                 = require("koa-router");

//global.apis               = require('./apis/index');
let Koa                   = require('koa');
let bodyParser            = require('koa-bodyparser');
let cors                  = require('koa2-cors');
let compress              = require('koa-compress');
const {graphqlUploadKoa}  = require('graphql-upload')
const {execute, subscribe}      = require("graphql");
const {SubscriptionServer}      = require("subscriptions-transport-ws");

let app = new Koa();
let server;

let http   = require('http');
server = http.createServer( app.callback() );

app.use(compress({
  filter: function (content_type) {
    return true;
  },
  threshold: 2048,
  flush: require('zlib').constants.Z_SYNC_FLUSH,
  br: false // disable brotli
}))

app.use(cors());
app.use(bodyParser({jsonLimit: '10mb'}));

// app.use(graphqlUploadKoa({maxFileSize: 50000000, maxFiles: 10})); // 50 mb
app.use(graphqlUploadKoa({maxFileSize: 150000000, maxFiles: 10})); // 150 mb

const rootValue = {}; 
const testCtx = {
  anyKey: 'anyValue',
}

const formatError = error => {
  const format = {
    error: error.message,
    locations: error.locations,
    path: error.path,
    //stack: global.mode === "production" && error.stack.split("\n")[0]
  };
  // log.error(format);
  return format;
};

const graphql = graphqlKoa({schema, rootValue, formatError});
const router  = new koaRouter();
//router.get("/graphql", graphql);

router.post('/graphql',
  (context, next) => graphqlKoa({
    rootValue,
    schema,
    context: () => {
      return testCtx; 
    },
  })(context, next)
);

router.get(
  "/",
  graphiqlKoa({
    endpointURL: "/graphql", 
    subscriptionsEndpoint: `${"ws"}://localhost:${3000}/subscriptions`,
    ctx :(req) => req,
  })
);

app.use(router.routes());
app.use(router.allowedMethods());

// console.log("koa is", koa.server);
server.listen(3000, error => { 
  if (error) {
    console.log("error from server is ", error);
  }
  console.log(`==> ✅ GraphQL Server Started at [ 🌎 ${"http"}://${'localhost'}:${3000} ] <==`);
   
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: (connectionParams, webSocket) => {
        // log.debug(`$$$connectionParams: ${JSON.stringify(connectionParams)}`);
        // if (global.mode === "production") {
        //   let token = connectionParams.authorization;
        //   if (!token) throw new Error('authorization token not found');
        //   try {
        //     const claim = jwt.verify(token, secret);
        //     const context = {user: claim.username, role: claim.role, level: claim.level};
        //     return context;
        //   } catch (err) {
        //     //error log only if its not an expired Token (hence avoiding too many logs)
        //     if (err.name != 'TokenExpiredError') log.error(err.stack);
        //     throw new Error('user not authorized due to [' + err + ']');
        //   }
        // } else {
          return testCtx;
        // }
      },
      // onDisconnect: webSocket => {
      //   log.debug("$$$onDisconnect");
      // },
      // onOperation: (message,params,webSocket) => {
      //      log.debug("Message:", message)
      //  },
      //  onOperationComplete: (webSocket, opId) => {
      //      log.debug("OperationID: => " + opId)
      //  },
    },
    {
      server: server,
      path: "/subscriptions",
    }
  );
});
