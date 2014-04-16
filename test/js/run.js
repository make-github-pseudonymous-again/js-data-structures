
var testrunner = require('qunit');
testrunner.run(
	{
		code : {path :[__dirname, '..', '..', 'js', 'index.js'].join('/'), namespace: 'neat'},
		tests : [__dirname, 'index.js'].join('/')
	},
	
	function(err, report) {
		console.dir(report);
	}
);