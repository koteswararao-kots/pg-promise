'use strict'

var categories, connect, categoriesCollection;
const mongodb = require('mongodb');
const {config} = require('../../lib/config')

connect = function (callback) {

    const MONGO_OPTIONS = {
        poolSize: 64,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    return mongodb.MongoClient.connect(config.dbUrl, MONGO_OPTIONS, function (err, mc) {
        if (err || !mc) {
            return callback(err);
        }

        let db = mc.db(config.dbName);
        exports.mongoClient = mc;
        exports.mongoDb = db;
        db.collection('categories', function (err, collection) {
            exports.categoriesCollection = categoriesCollection = collection;
            if (err) {
                return callback(err);
            }
        });

    });
};

disconnect = function () {
    var ref;
    return (ref = exports.mongoClient) != null ? ref.close() : void 0;
};

function getAllProducts(cb) {
    categoriesCollection.find(query, proj).toArray(function(err, result) {
    if (err) throw err;
    cb(err, result);
  });
  }

exports.connect = connect;
exports.disconnect = disconnect;
exports.getAllProducts = getAllProducts;
