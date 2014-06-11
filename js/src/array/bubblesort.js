

var bubblesort_t = function(pred){

	var bubblesort = function(a, i, j){
		var swapped = true, k, s = j-1, t;

		do {
			swapped = false;
			for (k = i; k < s; ++k) {
				if (!pred(a[k], a[k+1])) {
					t = a[k];
					a[k] = a[k+1];
					a[k+1] = t;
					swapped = true;
				}
			}
		} while (swapped);
	};

	return bubblesort;

};

exports.bubblesort_t = bubblesort_t;