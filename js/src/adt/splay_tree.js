
var splay_tree_t = function(diff){

	var zig = function(x, y){ y[0] = x[1]; x[1] = y; };
	var zag = function(x, y){ y[1] = x[0]; x[0] = y; };

	var zigzig = function(x, p, g){ zig(p, g); zig(x, p); };
	var zigzag = function(x, p, g){ zig(x, g); zag(x, p); };
	var zagzig = function(x, p, g){ zag(x, g); zig(x, p); };
	var zagzag = function(x, p, g){ zag(p, g); zag(x, p); };

	var z = [zig, zag];
	var zz = [[zigzig, zigzag], [zagzig, zagzag]];

	var find = function(el, value){

		var turn = [], path = [], pt = el, f, d, w;

		while(f === undefined){
			if(pt === null){
				f = false;
				pt = path[path.length - 1];
				--turn.length;
			}
			else {
				d = diff(value, pt[2]);
				if(d === 0) f = true;
				else {
					w = d > 0 | 0;
					path.push(pt);
					turn.push(w);
					pt = pt[w];
				}
			}
		}

		var i = turn.length - 1;
		for(; i > 0; i -= 2){
			zz[turn[i-1]][turn[i]](pt, path[i], path[i-1]);
			if(i > 1) path[i-2][turn[i-2]] = pt;
		}

		if (i === 0) z[turn[0]](pt, el);

		return [f, pt];
	};

	var remove = function(el, v){
		var r = find(el, v);
		if(!r[0]) return r[1];

		if(r[1][0] === null) return r[1][1];
		else{
			r[1][0] = find(r[1][0], v)[1];
			r[1][0][1] = r[1][1];
			return r[1][0];
		}
	};

	var in_order_traversal = function(el, fn){
		if(el[0] !== null) in_order_traversal(el[0], fn);
		fn(el[2]);
		if(el[1] !== null) in_order_traversal(el[1], fn);
	};


	var splay_tree = function(){ this.pt = null; };

	splay_tree.prototype.insert = function(v){

		if(this.pt === null){
			this.pt = [null, null, v];
			return;
		}

		var current = this.pt;

		while(true){
			if(diff(v, current[2]) <= 0){
				if(current[0] === null){
					current[0] = [null, null, v];
					return;
				}
				current = current[0];
			}
			else{
				if(current[1] === null){
					current[1] = [null, null, v];
					return;
				}
				current = current[1];
			}
		}
	};


	splay_tree.prototype.find = function(v){
		if(this.pt === null) return [false, null];
		var r = find(this.pt, v);
		this.pt = r[1];
		return [r[0], r[1][2]];
	};

	splay_tree.prototype.remove = function(v){
		if(this.pt !== null) this.pt = remove(this.pt, v);
	};

	splay_tree.prototype.in_order_traversal = function(fn){
		if(this.pt !== null) in_order_traversal(this.pt, fn);
	};


	return splay_tree;

};

exports.splay_tree_t = splay_tree_t;