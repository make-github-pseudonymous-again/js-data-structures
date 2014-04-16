

var randint = function(i, j){
	return i + Math.floor(Math.random() * (j - i));
};

exports.randint = randint;