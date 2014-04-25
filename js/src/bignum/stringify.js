
/**
 * Function template for number stringification.
 * Endianess provided by the iterator function
 * 
 * @param {int} f from radix
 * @param {int} t to radix
 * @param {function} iter iterator function
 */


var stringify_t = function(f, t, iter, zfill_t){

	if(t <= f){

		if(t > 36) throw 't > 36 not implemented';

		var z = 0;
		while(f >= t){
			if(f % t) break;
			f /= t;
			++z;
		}

		if(f !== 1) throw 'log(t) does not divide log(f) not implemented';

		var zfill = zfill_t(z);

		return function(a, i0, i1){
			var s = [];
			iter(i0, i1, function(i){
				s.push(zfill(Number(+a[i]).toString(t)));
			});
			return s.join('');
		};

	}
	else throw 't > f not implemented';

};

exports.stringify_t = stringify_t;