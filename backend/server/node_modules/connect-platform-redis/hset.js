const instance = require('./instance');
const redis = instance.redis;
const client = instance.client;
const platform = require('connect-platform');


platform.core.node({
  path: '/redis/hset',
  public: false,
  inputs: [
    'key',
    'field',
    'value'
  ],
  outputs: [
  ],
  controlOutputs: [
    'done',
    'error'
  ],
  hints: {
    node: 'Sets field in the hash stored at <span class="hl-blue">key</span> to <span class="hl-blue">value</span>.',
    inputs: {
      key: 'The has key to be used for the set operation.',
      field: 'The field to be used for the set operation.',
      value: 'The value to be set.'
    },
    controlOutputs: {
      error: 'An error was triggered during the send process.'
    },
  }
}, (inputs, output, control, error) => {
  if (!redis) error(new Error('Redis not configured properly.'));
  else {
    client.hmset(inputs.key, inputs.field, inputs.value, function (err, res) {
      if(err) {
        control('error');
        console.error(err);
        return ;
      }

      control('done');
    });  
  }
});