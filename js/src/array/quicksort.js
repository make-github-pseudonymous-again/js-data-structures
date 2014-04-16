

var quicksort_t = function(partition){

	var quicksort = function(a, i, j){
		if(j - i < 2) return;
		var pivot = partition(a, i, j);
		quicksort(a, i, pivot);
		quicksort(a, pivot + 1, j);
	};

	return quicksort;

};

exports.quicksort_t = quicksort_t;