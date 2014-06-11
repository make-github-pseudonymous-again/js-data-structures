

var insertionsort_t = function(pred){

	var insertionsort = function(a, i, j){
		var o, k = i + 1, t;

		for (; k < j; ++k) {
			t = k; o = a[t];
			while (t --> i && !pred(a[t], o)) a[t + 1] = a[t];
			a[t + 1] = o;
		}
	};

	return insertionsort;

};

exports.insertionsort_t = insertionsort_t;