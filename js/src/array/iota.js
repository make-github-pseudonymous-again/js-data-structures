


var iota = function(a, i, j, v){
	v !== undefined || (v = 0);
	--i; --v;

	while(++i < j){
		a[i] = ++v;
	}
};

exports.iota = iota;