const instance = require('./instance');
const redis = instance.redis;
const client = instance.client;
const platform = require('connect-platform');


platform.core.node({
  path: '/redis/get',
  public: false,
  inputs: [
    'key'
  ],
  outputs: [
    'value'
  ],
  controlOutputs: [
    'error'
  ],
  hints: {
    node: 'Gets the <span class="hl-blue">value</span> associated with the <span class="hl-blue">key</span>.',
    inputs: {
      key: 'The key to be used for the get operation.',
      value: 'The returned value.'
    },
    controlOutputs: {
      error: 'An error was triggered during the send process.'
    },
  }
}, (inputs, output, control, error) => {
  if (!redis) error(new Error('Redis not configured properly.'));
  else {
    client.get(inputs.key, function (err, res) {
      if(err) {
        control('error');
        console.error(err);
        return ;
      }

      output('value', res);
    });  
  }
});