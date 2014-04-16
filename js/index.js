

var list_t = function(name, index, rec, flat) {

	var fs = require('fs');
	var util = require('util');
	var clc = require('cli-color');
	var extend = require('node.extend');


	// DEBUG
	var msg_t = function(type, transform){
		transform = transform || function(s){return s;};
		return function(){
			console.log(
				[
					clc.white(clc.bgBlack(name)),
					clc.green(type),
					transform(util.format.apply(this, arguments))
				].join(' ')
			);
		};
	};
	var info = msg_t('info', clc.blue);
	var action = msg_t('action', clc.magenta);

	return function(dir, exports, level) {
		fs.readdirSync(dir).forEach(function(file) {
			var path = dir + file;
			if (fs.lstatSync(path).isDirectory()) {
				if (fs.existsSync(path + '/' + index)) {

					// DEBUG
					info("index file found in '%s'", path);
					action("@ exports['%s'] = require('%s');", file, path);

					exports[file] = require(path);
				}
				else{

					var target = rec ? exports[file] = {} : exports;

					// DEBUG
					info("no index file found in '%s'", path);
					action(
						"@ list('%s/', %s, %d);",
						path,
						rec ? util.format("exports['%s'] = {}", file) : 'exports',
						level + 1
					);

					list(path + '/', target, level + 1);
				}

			}
			else if (level >= 0 && file.match(/.+\.js/g) !== null && file !== index) {

				if(flat){

					// DEBUG
					info(".js file '%s'", path);
					action("@ extend(true, exports, require('%s'));", path);

					extend(true, exports, require(path));
				}
				else{
					var name = file.substr(0, file.length - 3);

					// DEBUG
					info(".js file '%s'", path);
					action("@ exports['%s'] = require('%s');", name, path);

					exports[name] = require(path);
				}
			}
		});
	};


};

var list = list_t('neat', 'index.js', false, true);

list(__dirname + '/src/', module.exports, -1);