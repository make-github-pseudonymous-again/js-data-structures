

var interpolationsearch_t = function(comp, equa, val){

	var interpolationsearch = function(k, a, i, j){
		if (i === j) return {f:0, w:i};
		var pivot = i + Math.floor((val(k) - val(a[i])) * (j - i - 1) / (val(a[j-1]) - val(a[i])));
		if      (pivot >= j) pivot = j - 1;
		else if (pivot  < i) pivot = i;

		if      (equa(k, a[pivot])) return {f:1, w:pivot};
		else if (comp(k, a[pivot])) return interpolationsearch(k, a, i, pivot);
		else                        return interpolationsearch(k, a, pivot + 1, j);
	};

	return interpolationsearch;

};

exports.interpolationsearch_t = interpolationsearch_t;