

var interpolationsearch_tt = function(pivotsearch_t){

	return function(diff){

		return pivotsearch_t(diff, function(k, a, i, j){
			var w = diff(a[j-1], a[i]);
			var d = diff(k, a[i]);
			if(w === 0){
				w = 1;
				d = d > 0;
			}
			var p = i + Math.floor(d * (j - i - 1) / w);
			return Math.max(i, Math.min(j - 1, p));
		});

	};

};

exports.interpolationsearch_tt = interpolationsearch_tt;