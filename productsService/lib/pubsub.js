'use strict';

const USE_REDIS_PASSWORD= process.env.USE_REDIS_PASSWORD;
const REDIS_PASSWORD    = process.env.REDIS_PASSWORD || 'redis@Ac0M!@#';
const REDIS_PORT_NUMBER        = process.env.REDIS_PORT_NUMBER || 6379;
const REDIS_DOMAIN_NAME = process.env.REDIS_IP || "redis-ip";

const {RedisPubSub}     = require("graphql-redis-subscriptions");

const redisOptions = {
    host: 'localhost',
    port: REDIS_PORT_NUMBER,
    ...USE_REDIS_PASSWORD && {password: REDIS_PASSWORD},
    retry_strategy: options => {
      // reconnect after
      return Math.max(options.attempt * 100, 3000);
    }
  }

  const redisClient = require("redis").createClient(redisOptions);
  global.pubsub = new RedisPubSub({
    connection: redisOptions,
  });

  let channels = {
    addProduct  : "addProduct"
  }

  function redisPublish(channel, obj) {
    try {
      global.pubsub.publish(channel, obj);
      //log.debug(`RedisPubSub publish to channel: ${channel}: ${JSON.stringify(obj)}`);
    }
    catch(err) {
      console.log("error from redis", err);
      //log.error(`RedisPubSub publish to channel: ${channel}  failed:, ${err.stack}`);
    }
  }



  module.exports = {
    pubsub : global.pubsub,
    channels: channels,
    redisClient: redisClient,
    redisPublish: redisPublish,
  }