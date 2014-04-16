

var quickselect_t = function(partition){

	var quickselect = function(k, a, i, j){
		if(j - i < 2) return;
		var p = partition(a, i, j);
		if      (k < p) quickselect(k, a, i, p);
		else if (k > p) quickselect(k, a, p + 1, j);
	};

	return quickselect;

};

exports.quickselect_t = quickselect_t;