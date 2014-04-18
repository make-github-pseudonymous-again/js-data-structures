var recquire_t = require('recquire');

var recquire = recquire_t('neat-test', 'index.js', false, false);

recquire(__dirname + '/src/', module.exports, -1);