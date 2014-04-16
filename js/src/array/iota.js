


var iota = function(a, i, j, v){
	if (v === undefined) v = 0;
	--i; --v;

	while(++i < j){
		a[i] = ++v;
	}
};

exports.iota = iota;