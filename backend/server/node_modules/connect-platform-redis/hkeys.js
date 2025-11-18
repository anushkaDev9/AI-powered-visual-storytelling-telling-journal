const instance = require('./instance');
const redis = instance.redis;
const client = instance.client;
const platform = require('connect-platform');


platform.core.node({
  path: '/redis/hkeys',
  public: false,
  inputs: [
    'key',
  ],
  outputs: [
    'fields'
  ],
  controlOutputs: [
    'error'
  ],
  hints: {
    node: 'Returns all <span class="hl-blue">field names</span> in the hash stored at <span class="hl-blue">key</span>.',
    inputs: {
      key: 'The has key to be used for the get operation.'
    },
    outputs: {
      fields: 'The returned fields.'
    },
    controlOutputs: {
      error: 'An error was triggered during the send process.'
    },
  }
}, (inputs, output, control, error) => {
  if (!redis) error(new Error('Redis not configured properly.'));
  else {
    client.hkeys(inputs.key, function (err, res) {
      if(err) {
        control('error');
        console.error(err);
        return ;
      }

      output('fields', res);
    });  
  }
});