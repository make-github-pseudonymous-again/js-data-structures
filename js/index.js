var recquire_t = require('recquire');

var recquire = recquire_t('neat', 'index.js', false, true);

recquire(__dirname + '/src/', module.exports, -1);