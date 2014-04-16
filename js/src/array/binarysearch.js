

var binarysearch_tt = function(pivotsearch_t){

	return function(diff){

		return pivotsearch_t(diff, function(k, a, i, j){
			return Math.floor((i + j) / 2);
		});

	};

};

exports.binarysearch_tt = binarysearch_tt;