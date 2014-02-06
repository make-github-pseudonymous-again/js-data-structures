

var sample_t = function(randint){

	var sample = function(n, a, i, j){
		var tmp, k, t = i - 1, x = i + n;

		while(++t < x){
			k    = randint(t, j);
			tmp  = a[t];
			a[t] = a[k];
			a[k] = tmp;
		}
	};

	return sample;

};