

var pivotsearch_t = function(diff, pivot){

	var pivotsearch = function(k, a, i, j){
		if (i === j) return [0, i];
		var p = pivot(k, a, i, j);
		var d = diff(k, a[p]);
		if      (d === 0) return [1, p];
		else if (d   < 0) return pivotsearch(k, a, i, p);
		else              return pivotsearch(k, a, p + 1, j);
	};

	return pivotsearch;

};

exports.pivotsearch_t = pivotsearch_t;