const redis = require("redis");
const platform = require('connect-platform');

let options = platform.config.get('redis', {});

let client = {};

if(Object.keys(options).length == 0) {
  console.error("Connect-redis package wasn't configured");
} else {
  client = redis.createClient(options);
  client.on("error", function (err) {
    console.error(err);
  });
}

module.exports = { redis, client };