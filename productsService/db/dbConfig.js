const {redisClient} = require('../lib/pubsub');

function connect(callback) {
    const REDIS_HOST = 'localhost';
    const REDIS_DB = 0;
    redisClient.select(REDIS_DB, function(err) {
        exports.get = redisGet;
        callback(err);
    })
}

exports.connect = connect;