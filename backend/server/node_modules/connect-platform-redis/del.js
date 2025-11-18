const instance = require('./instance');
const redis = instance.redis;
const client = instance.client;
const platform = require('connect-platform');


platform.core.node({
  path: '/redis/del',
  public: false,
  inputs: [
    'key'
  ],
  outputs: [],
  controlOutputs: [
    'done',
    'error'
  ],
  hints: {
    node: 'Deletes the <span class="hl-blue">value</span> associated with the <span class="hl-blue">key</span>.',
    inputs: {
      key: 'The has key to be used for the get operation.'
    },
    controlOutputs: {
      done: "Signals that the deletion has been successful",
      error: 'An error was triggered during the send process.'
    },
  }
}, (inputs, output, control, error) => {
  if (!redis) error(new Error('Redis not configured properly.'));
  else {
    client.del(inputs.key, function (err, res) {
      if(err) {
        control('error');
        console.error(err);
        return ;
      }

      control('done');
    });  
  }
});