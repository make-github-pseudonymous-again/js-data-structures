

var quicksort_t = function(partition){

	var quicksort = function(a, i, j){
		if(j - i < 2) return;
		var p = partition(a, i, j);
		quicksort(a, i, p);
		quicksort(a, p + 1, j);
	};

	return quicksort;

};

exports.quicksort_t = quicksort_t;