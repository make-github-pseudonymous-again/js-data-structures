var recquire_t = require('recquire');

var recquire = recquire_t('algo-test', 'index.js', 'intro.js', 'outro.js', false, true);

recquire(__dirname + '/src/', module.exports, 0);