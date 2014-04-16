

var interpolationsearch_tt = function(pivotsearch_t){

	return function(diff){

		return pivotsearch_t(diff, function(k, a, i, j){
			var p = i + Math.floor(diff(k, a[i]) * (j - i - 1) / diff(a[j-1], a[i]));
			return Math.min(i, Math.max(j - 1, p));
		});

	};

};

exports.interpolationsearch_tt = interpolationsearch_tt;