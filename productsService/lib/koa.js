let Koa                   = require('koa');
let bodyParser            = require('koa-bodyparser');
let cors                  = require('koa2-cors');
let compress              = require('koa-compress');
const {graphqlUploadKoa}  = require('graphql-upload')

module.exports = function(obj) {
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
    
    return( {app: app, server: server} );
  };
  