

var multiselect_t = function(partition){

	var multiselect = function(k, a, i, j){

		if(j - i < 2 || k.length === 0) return;

		var pivot = partition(a, i, j);
		var l = [], r = [];

		for(var t = 0; t < k.length; ++t){
			if      (k[t] < pivot) l.push(k[t]);
			else if (k[t] > pivot) r.push(k[t]);
		}

		multiselect(l, a, i, pivot);
		multiselect(r, a, pivot + 1, j);
	};

	return multiselect;

};

exports.multiselect_t = multiselect_t;