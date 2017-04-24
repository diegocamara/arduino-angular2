var test = require('tape');
var fs = require('fs');
var resolve = require('path').resolve;

test('valid configs', function(t){
  t.doesNotThorw(function(){
    var cfgs = fs.readdirSync(resolve(__dirname, '../env'));
    cfgs.forEach(function(env){
      require('../env/', + env);
    })
  }, 'confgs valid json');
  t.end();
});
