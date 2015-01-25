var pkg = require('aureooms-node-package');

var fs  = require('fs');
var data = fs.readFileSync(pkg.config, 'utf8');
var opt = JSON.parse(data);

opt = {
	name    : opt.name,
	src     : __dirname + '/src/',
	exports : module.exports,
	base    : 0,
	debug   : opt.debug
};

pkg.include(opt);
