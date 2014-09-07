var pkg = require('aureooms-node-package');


var opt = {
	src     : __dirname + '/src/',
	exports : module.exports,
	base    : 0
};

pkg.include(opt);
