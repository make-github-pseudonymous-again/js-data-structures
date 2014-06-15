


var fiter = function(i, j, fn){
	while (i < j) {
		fn(i);
		++i;
	}
};

var biter = function(i, j, fn){
	while (--j >= i) fn(j);
};



exports.fiter = fiter;
exports.biter = biter;