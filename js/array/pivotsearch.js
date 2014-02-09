

var pivotsearch_t = function(comp, equa, pivot){

	var pivotsearch = function(k, a, i, j){
		if (i === j) return {f:0, w:i};
		var p = pivot(k, a, i, j)
		if      (equa(k, a[p])) return {f:1, w:p};
		else if (comp(k, a[p])) return pivotsearch(k, a, i, p);
		else                    return pivotsearch(k, a, p + 1, j);
	};

	return pivotsearch;

};