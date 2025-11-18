const instance = require('./instance');
const redis = instance.redis;
const client = instance.client;
const platform = require('connect-platform');


platform.core.node({
  path: '/redis/expire',
  public: false,
  inputs: [
    'key',
    'ttl'
  ],
  outputs: [
  ],
  controlOutputs: [
    'done',
    'non_existant_key',
    'error'
  ],
  hints: {
    node: 'Set a timeout on <span class="hl-blue">key</span>. After the timeout has expired, the key will automatically be deleted.',
    inputs: {
      key: 'The key to be used for the expire operation.',
    },
    controlOutputs: {
      error: 'The operation has been successfully executed.',
      error: '<span class="hl-blue">key</span> doesn\'t exist.',
      error: 'An error was triggered during the send process.'
    },
  }
}, (inputs, output, control, error) => {
  if (!redis) error(new Error('Redis not configured properly.'));
  else {
    client.expire(inputs.key, inputs.ttl, function (err, res) {
      if(err) {
        control('error');
        console.error(err);
        return ;
      }

      if(res == 1) {
        control('done');
      } else {
        control('non_existant_key');
      }
    });  
  }
});