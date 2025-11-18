const instance = require('./instance');
const redis = instance.redis;
const client = instance.client;
const platform = require('connect-platform');


platform.core.node({
  path: '/redis/hmget',
  public: false,
  inputs: [
    'key',
    'fields'
  ],
  outputs: [
    'values'
  ],
  controlOutputs: [
    'error'
  ],
  hints: {
    node: 'Returns the <span class="hl-blue">values</span> associated with the specified <span class="hl-blue">fields</span> in the hash stored at <span class="hl-blue">key</span>.',
    inputs: {
      key: 'The has key to be used for the set operation.',
      fields: 'The field(s) to be used for the set operation.',
    },
    outputs: {
      values: 'The returned values.'
    },
    controlOutputs: {
      error: 'An error was triggered during the send process.'
    },
  }
}, (inputs, output, control, error) => {
  if (!redis) error(new Error('Redis not configured properly.'));
  else {
    inputs.fields = Array.isArray(inputs.fields) ? inputs.fields : [inputs.fields];

    client.hmget(inputs.key, inputs.fields, function (err, res) {
      if(err) {
        control('error');
        console.error(err);
        return ;
      }

      output('values', res);
    });  
  }
});