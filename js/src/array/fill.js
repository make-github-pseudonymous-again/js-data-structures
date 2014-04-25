


var fill = function(a, i, j, v){
	--i;
	while(++i < j){
		a[i] = v;
	}

};

exports.fill = fill;