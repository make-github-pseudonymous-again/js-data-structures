

var copy = function(a, i, j, b, k){

	for(; i < j; ++i, ++k){
		b[k] = a[i];
	}
};

exports.copy = copy;