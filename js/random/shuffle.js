

var shuffle_t = function(sample){

	var shuffle = function(a, i, j){
		sample(j - i, a, i, j);
	};

	return shuffle;
};