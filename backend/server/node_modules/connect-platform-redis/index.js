module.exports.platform = {
  config : {
    nodes : {
      native : [
        'hmget',
        'hmset',
        'hget',
        'hset',
        'hgetall',
        'hkeys',
        'hvals',
        'set',
        'get',
        'del',
        'expire'
      ]
    },
    aliases: {
    }
  },
  hints: {
    setup:
`Check the sample configuration below and <a href="https://github.com/NodeRedis/node_redis#options-object-properties">this page</a> for a more detailled description on all the options.`,
  sampleConfig: {
      redis: {
        "host": "127.0.0.1",
        "port": "6379",
        "password": "password"
      }
    }
  }
};