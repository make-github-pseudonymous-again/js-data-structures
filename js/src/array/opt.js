



var opt_t = function(pred){

	var opt = function(a) {
		var c = a[0];

		var i = a.length;

		while(--i){
			if(pred(a[i], c)) c = a[i];
		}

		return c;
	};

	return opt;

};


exports.opt_t = opt_t;