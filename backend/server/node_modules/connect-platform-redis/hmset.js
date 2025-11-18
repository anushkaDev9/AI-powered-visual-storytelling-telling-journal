const instance = require('./instance');
const redis = instance.redis;
const client = instance.client;
const platform = require('connect-platform');


platform.core.node({
  path: '/redis/hmset',
  public: false,
  inputs: [
    'key',
    'fields',
    'values'
  ],
  outputs: [
  ],
  controlOutputs: [
    'done',
    'error'
  ],
  hints: {
    node: 'Sets the specified <span class="hl-blue">fields</span> to their respective <span class="hl-blue">values</span> in the key stored at <span class="hl-blue">key</span>.',
    inputs: {
      key: 'The has key to be used for the set operation.',
      fields: 'The field(s) to be used for the set operation.',
      values: 'The values to be set.'
    },
    controlOutputs: {
      error: 'An error was triggered during the set operation.'
    },
  }
}, (inputs, output, control, error) => {
  if (!redis) error(new Error('Redis not configured properly.'));
  else {
    inputs.fields = Array.isArray(inputs.fields) ? inputs.fields : [inputs.fields];
    inputs.values = Array.isArray(inputs.values) ? inputs.values : [inputs.values];
    
    var inputKeyValue = [];
    inputs.fields.forEach(function(element, i) {
      inputKeyValue.push(element, inputs.values[i]);
    });

    client.hmset(inputs.key, inputKeyValue, function (err, res) {
      if(err) {
        control('error');
        console.error(err);
        return ;
      }

      control('done');
    });  
  }
});