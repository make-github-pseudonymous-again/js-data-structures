

var lcm_t = function(gcd){
	return function(a, b){
		return a / gcd(a, b) * b;
	};
};

exports.lcm_t = lcm_t;