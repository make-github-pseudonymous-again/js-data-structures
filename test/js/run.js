
var argv = require('optimist').argv;
var path = require('path');

var testrunner = require('qunit');
testrunner.options.coverage = true;
testrunner.options.log.tests = false;
testrunner.options.log.testing = false;
testrunner.options.log.assertions = false;
testrunner.options.log.summary = false;

var cb = function(err, report) {
	// console.dir(report);
};

var run = function(item, ns) {
	testrunner.run(
		{
			code : {
				// path : path.normalize([__dirname, '..', '..', 'js', 'index.js'].join('/')),
				path : path.normalize([__dirname, '..', '..', 'js', 'dist', 'algo.js'].join('/')),
				namespace: ns
			},
			tests : [__dirname, item].join('/')
		}, cb
	);
};


for(var i = 0; i < argv._.length; ++i){
	argv._[i] = ['src', argv._[i]+'.js'].join('/');
}

if (argv._.length === 0) argv._.push('index.js');

for(var i = 0; i < argv._.length; ++i){
	run(argv._[i], 'algo');
}