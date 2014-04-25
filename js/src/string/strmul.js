

var strmul = function(s, len){
	var a = new Array(len);
	while(len--) a[len] = s;
	return a.join('');
};

exports.strmul = strmul;