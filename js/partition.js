

var partition_t = function(compare){

	var partition = function(a, i, j){

		var tmp;

		while(i < j){
			if(compare(a[i], a[i+1])){
				tmp    = a[i+1];
				a[i+1] = a[j];
				a[j]   = tmp;
				--j;
			}
			else{
				tmp    = a[i];
				a[i]   = a[i+1];
				a[i+1] = tmp;
				++i;
			}
		}

		return i;
	};

	return partition;

};