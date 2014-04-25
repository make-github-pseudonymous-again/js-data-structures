

var lfill_t = function(c, n, mul){


	var f = mul(c, n);

	return function(s){
		return (f + s).slice(-n);
	};

};



var rfill_t = function(c, n, mul){


	var f = mul(c, n);

	return function(s){
		return (s + f).slice(0, n);
	};

};

exports.lfill_t = lfill_t;
exports.rfill_t = rfill_t;