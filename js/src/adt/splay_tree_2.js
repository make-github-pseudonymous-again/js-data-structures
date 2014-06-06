
var splay_tree_2_t = function(diff){

	var insert = function(pt, v){
		var w = diff(v, pt[2]) > 0 | 0;
		if   (pt[w] === null) pt[w] = [null, null, v];
		else insert(pt[w], v);
	};

	var splay = function(el, v){

		var turn = [], path = [], pt = el, f, d, w, i, a, zoz, zoz1, zoz2, pox, p, g;

		while(f === undefined){
			d = diff(v, pt[2]);
			if(d === 0) f = true;
			else {
				w = d > 0 | 0;
				if(pt[w] === null) f = false;
				else{
					path.push(pt);
					turn.push(w);
					pt = pt[w];
				}
			}
		}

		i = turn.length - 1;
		a = [pt, null];
		for (; i > 0; i -= 2) {
			zoz2 = turn[i];
			zoz1 = turn[i-1];
			pox = zoz1 === zoz2 | 0;
			g = path[i-1];
			p = path[i];
			a[1] = p;

			g[zoz1] = a[pox][1 - zoz1];
			a[pox][1 - zoz1] = g;

			p[zoz2] = pt[1 - zoz2];
			pt[1 - zoz2] = p;
		}

		if (i === 0) {
			zoz = turn[0];
			el[zoz] = pt[1 - zoz];
			pt[1 - zoz] = el;
		}

		return [f, pt];
	};

	var remove = function(el, v){
		var r = splay(el, v);
		if (!r[0]) return r[1];

		if      (r[1][0] === null) return r[1][1];
		else if (r[1][1] === null) return r[1][0];
		else {
			r[1][0] = splay(r[1][0], v)[1];
			r[1][0][1] = r[1][1];
			return r[1][0];
		}
	};

	var in_order_traversal = function(pt, fn){
		if(pt[0] !== null) in_order_traversal(pt[0], fn);
		fn(pt[2]);
		if(pt[1] !== null) in_order_traversal(pt[1], fn);
	};


	var splay_tree = function(){ this.pt = null; };

	splay_tree.prototype.insert = function(v){
		if(this.pt === null) this.pt = [null, null, v];
		else insert(this.pt, v);
	};

	splay_tree.prototype.find = function(v){
		if(this.pt === null) return [false, null];
		var r = splay(this.pt, v);
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

exports.splay_tree_2_t = splay_tree_2_t;