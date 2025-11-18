const instance = require('./instance');
const redis = instance.redis;
const client = instance.client;
const platform = require('connect-platform');


platform.core.node({
  path: '/redis/hgetall',
  public: false,
  inputs: [
    'key',
  ],
  outputs: [
    'fieldsAndValues'
  ],
  controlOutputs: [
    'error'
  ],
  hints: {
    node: 'Returns all fields and values of the hash stored at <span class="hl-blue">key</span>.',
    inputs: {
      key: 'The has key to be used for the get operation.'
    },
    outputs: {
      fieldsAndValues: 'The returned field and values.'
    },
    controlOutputs: {
      error: 'An error was triggered during the send process.'
    },
  }
}, (inputs, output, control, error) => {
  if (!redis) error(new Error('Redis not configured properly.'));
  else {
    client.hgetall(inputs.key, function (err, res) {
      if(err) {
        control('error');
        console.error(err);
        return ;
      }

      output('fieldsAndValues', res);
    });  
  }
});