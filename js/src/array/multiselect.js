

var multiselect_t = function(partition, binarysearch){

	var multiselect = function(k, l, r, a, i, j){

		if(j - i < 2 || r - l === 0) return;

		var p = partition(a, i, j);
		var q = binarysearch(p, k, l, r);

		multiselect(k, l, q[1], a, i, p);
		multiselect(k, q[1] + q[0], r, a, p + 1, j);
	};

	return multiselect;

};

exports.multiselect_t = multiselect_t;