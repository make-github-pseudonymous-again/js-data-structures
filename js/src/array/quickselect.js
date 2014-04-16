

var quickselect_t = function(partition){

	var quickselect = function(k, a, i, j){
		if(j - i < 2) return;
		var pivot = partition(a, i, j);
		if      (k < pivot) quickselect(k, a, i, pivot);
		else if (k > pivot) quickselect(k, a, pivot + 1, j);
	};

	return quickselect;

};

exports.quickselect_t = quickselect_t;