const instance = require('./instance');
const redis = instance.redis;
const client = instance.client;
const platform = require('connect-platform');


platform.core.node({
  path: '/redis/set',
  public: false,
  inputs: [
    'key',
    'value'
  ],
  outputs: [
  ],
  controlOutputs: [
    'done',
    'error'
  ],
  hints: {
    node: 'Set a <span class="hl-blue">value</span> to the <span class="hl-blue">key</span>.',
    inputs: {
      key: 'The has key to be used for the set operation.',
      value: 'The value to be set.'
    },
    controlOutputs: {
      done: 'The operation successfully completed.',
      error: 'An error was triggered during the send process.'
    },
  }
}, (inputs, output, control, error) => {
  if (!redis) error(new Error('Redis not configured properly.'));
  else {
    client.set(inputs.key, inputs.value, function (err, res) {
      if(err) {
        control('error');
        console.error(err);
        return ;
      }

      control('done');
    });  
  }
});