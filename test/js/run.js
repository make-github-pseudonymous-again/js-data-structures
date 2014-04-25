
var argv = require('optimist').argv;

var testrunner = require('qunit');
testrunner.options.coverage = true;

var cb = function(err, report) {
	// console.dir(report);
};

var run = function(item, ns) {
	testrunner.run(
		{
			code : {
				path :[__dirname, '..', '..', 'js', 'index.js'].join('/'),
				namespace: ns
			},
			tests : [__dirname, item].join('/')
		}, cb
	);
};


for(var i = 0; i < argv._.length; ++i){
	argv._[i] = ['src', argv._[i]+'.js'].join('/');
}

if(argv._.length === 0) argv._.push('index.js');

for(var i = 0; i < argv._.length; ++i){
	run(argv._[i], 'algo');
}