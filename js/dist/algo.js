(function(exports){

	'use strict';


/* /home/genius/Bureau/algo/js/src/adt */
/* /home/genius/Bureau/algo/js/src/adt/lazy_binomial_queue.js */
var lazy_binomial_queue_t = function(pred, opt_t){

	var binomial_tree_t = function(value, next){
		this.value = value;
		this.next = next;
	};


	binomial_tree_t.prototype.rank = function(){
		return this.next.length;
	};


	var lazy_binomial_queue = function(){
		this.length = 0;
		this.list = [null];
		this.lazy = [];
	};



	var binomial_tree_merge = function(tree1, tree2){
		var value = 0;
		var next = null;

		if(pred(tree1.value, tree2.value)){
			value = tree1.value;
			next = tree1.next.concat(tree2);
		}
		else{
			value = tree2.value;
			next = tree2.next.concat(tree1);
		}

		return new binomial_tree_t(value, next);
	};


	var lazy_binomial_queue_push = function(queue, value){
		var tree = new binomial_tree_t(value, []);
		queue.lazy.push([tree]);
		++queue.length;
	};

	var max = opt_t(function(a, b){ return a.rank() > b.rank(); });

	var lazy_binomial_queue_merge = function(queue, tree_l){
		if(tree_l.length === 0) return;

		var r = null;

		var m = max(tree_l);
		while(queue.list.length < m.rank() + 2) queue.list.push(null);

		for(var i = 0; i < tree_l.length; ++i){
			var j = tree_l[i].rank();

			if(r === null){
				if(queue.list[j] === null) queue.list[j] = tree_l[i];
				else{
					r = binomial_tree_merge(tree_l[i], queue.list[j]);
					queue.list[j] = null;
				}
			}
			else{
				r = binomial_tree_merge(tree_l[i], r);
			}

			if(i === tree_l.length - 1 || tree_l[i+1].rank() !== j + 1){
				var k = j + 1;
				while(r !== null && (i === tree_l.length - 1 || tree_l[i+1].rank() !== k)){
					if(queue.list[j+1] === null){
						queue.list[j+1] = r;
						r = null;
					}
					else{
						r = binomial_tree_merge(queue.list[j+1], r);
						queue.list[j+1] = null;
					}

					++k;
				}

			}

		}

		if(queue.list[queue.list.length - 1] !== null) queue.list.push(null);

	};


	var lazy_binomial_queue_pop = function(queue){
		var value = -1, x = -1, i;

		for(i = 0; i < queue.lazy.length; ++i){
			var tree_l = queue.lazy[i];
			lazy_binomial_queue_merge(queue, tree_l);
		}

		for(i = 0; i < queue.list.length - 1; ++i){
			if(queue.list[i] !== null){
				x = i;
				value = queue.list[x].value;
				break;
			}
		}

		for(var j = x + 1; j < queue.list.length - 1; ++j){
			if(queue.list[j] !== null && pred(queue.list[j].value, value)){
				x = j;
				value = queue.list[x].value;
			}
		}

		value = queue.list[x].value;
		queue.lazy = [queue.list[x].next];
		queue.list[x] = null;

		if(i === queue.list.length - 2) queue.list.pop();

		--queue.length;

		return value;
	};

	lazy_binomial_queue.prototype.pop = function(){
		return lazy_binomial_queue_pop(this);
	};

	lazy_binomial_queue.prototype.push = function(value){
		return lazy_binomial_queue_push(this, value);
	};

	return lazy_binomial_queue;
};

exports.lazy_binomial_queue_t = lazy_binomial_queue_t;
/* /home/genius/Bureau/algo/js/src/adt/splay_tree.js */

var splay_tree_t = function(diff){

	var zig = function(x, y){ y[0] = x[1]; x[1] = y; };
	var zag = function(x, y){ y[1] = x[0]; x[0] = y; };

	var zigzig = function(x, p, g){ zig(p, g); zig(x, p); };
	var zigzag = function(x, p, g){ zig(x, g); zag(x, p); };
	var zagzig = function(x, p, g){ zag(x, g); zig(x, p); };
	var zagzag = function(x, p, g){ zag(p, g); zag(x, p); };

	var z  = [zig, zag], zz = [[zigzig, zigzag], [zagzig, zagzag]];

	var insert = function(pt, v){
		var w = diff(v, pt[2]) > 0 | 0;
		if   (pt[w] === null) pt[w] = [null, null, v];
		else insert(pt[w], v);
	};

	var splay = function(el, v){

		var turn = [], path = [], pt = el, f, d, w;

		while(f === undefined){
			if(pt === null){
				f = false;
				pt = path[path.length - 1];
				--turn.length;
			}
			else {
				d = diff(v, pt[2]);
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
		for (; i > 0; i -= 2) zz[turn[i-1]][turn[i]](pt, path[i], path[i-1]);
		if  (i === 0)         z[turn[0]](pt, el);

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

exports.splay_tree_t = splay_tree_t;
/* /home/genius/Bureau/algo/js/src/adt/splay_tree_2.js */

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
/* /home/genius/Bureau/algo/js/src/adt/splay_tree_3.js */

var splay_tree_3_t = function(diff){

	var insert = function(pt, v){
		var w = diff(v, pt[2]) > 0 | 0;
		if   (pt[w] === null) pt[w] = [null, null, v];
		else insert(pt[w], v);
	};

	var splay = function(el, v){

		var l, r, t, y, x, d;
		l = r = x = [null, null, undefined];
		t = el;
		while (true) {
			d = diff(v, t[2]);
			if (d < 0) {
				if (!t[0]) break;
				if (diff(v, t[0][2]) < 0) {
					y = t[0];
					t[0] = y[1];
					y[1] = t;
					t = y;
					if (!t[0]) break;
				}
				r[0] = t;
				r = t;
				t = t[0];
			}
			else if (d > 0) {
				if (!t[1]) break;
				if (diff(v, t[1][2]) > 0) {
					y = t[1];
					t[1] = y[0];
					y[0] = t;
					t = y;
					if (!t[1]) break;
				}
				l[1] = t;
				l = t;
				t = t[1];
			}
			else break;
		}
		l[1] = t[0];
		r[0] = t[1];
		t[0] = x[1];
		t[1] = x[0];

		return [diff(v, t[2]) === 0, t];
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

exports.splay_tree_3_t = splay_tree_3_t;
/* /home/genius/Bureau/algo/js/src/adt/splay_tree_4.js */

var splay_tree_4_t = function(diff){

	var node = function(v){
		this.l = this.r = null;
		this.v = v;
	};

	var item = function(d, pt){
		this.d = d;
		this.pt = pt;
	};

	var splay = function(el, v){

		var l, r, t, y, x, d;
		l = r = x = new node();
		t = el;
		while (true) {
			d = diff(v, t.v);
			if (d < 0) {
				if (!t.l) break;
				if (diff(v, t.l.v) < 0) {
					y = t.l;
					t.l = y.r;
					y.r = t;
					t = y;
					if (!t.l) break;
				}
				r.l = t;
				r = t;
				t = t.l;
			}
			else if (d > 0) {
				if (!t.r) break;
				if (diff(v, t.r.v) > 0) {
					y = t.r;
					t.r = y.l;
					y.l = t;
					t = y;
					if (!t.r) break;
				}
				l.r = t;
				l = t;
				t = t.r;
			}
			else break;
		}
		l.r = t.l;
		r.l = t.r;
		t.l = x.r;
		t.r = x.l;

		return new item(d, t);
	};

	var remove = function(el, v){
		var i = splay(el, v);
		var pt = i.pt;
		if (i.d !== 0) return pt;

		if      (pt.l === null) return pt.r;
		else if (pt.r === null) return pt.l;
		else {
			pt.l = splay(pt.l, v).pt;
			pt.l.r = pt.r;
			return pt.l;
		}
	};

	var in_order_traversal = function(pt, fn){
		if(pt.l !== null) in_order_traversal(pt.l, fn);
		fn(pt.v);
		if(pt.r !== null) in_order_traversal(pt.r, fn);
	};


	var splay_tree = function(){ this.pt = null; };

	splay_tree.prototype.insert = function(v){
		var n = new node(v);
		if (this.pt !== null) {
			var i = splay(this.pt, v);
			this.pt = i.pt;

			if (i.d <= 0) {
				n.l = this.pt.l;
				n.r = this.pt;
				this.pt.l = null;
			}
			else {
				n.r = this.pt.r;
				n.l = this.pt;
				this.pt.r = null;
			}
		}
		this.pt = n;
	};

	splay_tree.prototype.find = function(v){
		if(this.pt === null) return [false, null];
		var i = splay(this.pt, v);
		this.pt = i.pt;
		return [i.d === 0, this.pt.v];
	};

	splay_tree.prototype.remove = function(v){
		if(this.pt !== null) this.pt = remove(this.pt, v);
	};

	splay_tree.prototype.in_order_traversal = function(fn){
		if(this.pt !== null) in_order_traversal(this.pt, fn);
	};

	return splay_tree;

};

exports.splay_tree_4_t = splay_tree_4_t;
/* /home/genius/Bureau/algo/js/src/adt/splay_tree_5.js */

var splay_tree_5_t = function(diff){

	var node = function(v){
		this.l = this.r = null;
		this.v = v;
	};

	var in_order_traversal = function(pt, fn){
		if(pt.l !== null) in_order_traversal(pt.l, fn);
		fn(pt.v);
		if(pt.r !== null) in_order_traversal(pt.r, fn);
	};

	var splay_tree = function(){ this.pt = null; };

	splay_tree.prototype.splay = function(v){

		var l, r, t, y, x, d;
		l = r = x = new node();
		t = this.pt;
		while (true) {
			d = diff(v, t.v);
			if (d < 0) {
				if (!t.l) break;
				if (diff(v, t.l.v) < 0) {
					y = t.l;
					t.l = y.r;
					y.r = t;
					t = y;
					if (!t.l) break;
				}
				r.l = t;
				r = t;
				t = t.l;
			}
			else if (d > 0) {
				if (!t.r) break;
				if (diff(v, t.r.v) > 0) {
					y = t.r;
					t.r = y.l;
					y.l = t;
					t = y;
					if (!t.r) break;
				}
				l.r = t;
				l = t;
				t = t.r;
			}
			else break;
		}
		l.r = t.l;
		r.l = t.r;
		t.l = x.r;
		t.r = x.l;

		this.pt = t;

		return d;
	};

	splay_tree.prototype.remove = function(v){
		if(this.pt === null) return;
		
		var d = this.splay(v);
		if (d !== 0) return;

		if      (this.pt.l === null) this.pt = this.pt.r;
		else if (this.pt.r === null) this.pt = this.pt.l;
		else {
			var tmp = this.pt.r;
			this.pt = this.pt.l;
			this.splay(v);
			this.pt.r = tmp;
		}
	};



	splay_tree.prototype.insert = function(v){
		var n = new node(v);
		if (this.pt !== null) {
			var d = this.splay(v);

			if (d <= 0) {
				n.l = this.pt.l;
				n.r = this.pt;
				this.pt.l = null;
			}
			else {
				n.r = this.pt.r;
				n.l = this.pt;
				this.pt.r = null;
			}
		}
		this.pt = n;
	};

	splay_tree.prototype.find = function(v){
		if(this.pt === null) return [false, null];
		var d = this.splay(v);
		return [d === 0, this.pt.v];
	};

	splay_tree.prototype.in_order_traversal = function(fn){
		if(this.pt !== null) in_order_traversal(this.pt, fn);
	};

	return splay_tree;

};

exports.splay_tree_5_t = splay_tree_5_t;
/* /home/genius/Bureau/algo/js/src/array */
/* /home/genius/Bureau/algo/js/src/array/binarysearch.js */


var binarysearch_tt = function(pivotsearch_t){

	return function(diff){

		return pivotsearch_t(diff, function(k, a, i, j){
			return Math.floor((i + j) / 2);
		});

	};

};

exports.binarysearch_tt = binarysearch_tt;
/* /home/genius/Bureau/algo/js/src/array/copy.js */


var copy = function(a, i, j, b, k){

	for(; i < j; ++i, ++k){
		b[k] = a[i];
	}
};

exports.copy = copy;
/* /home/genius/Bureau/algo/js/src/array/fill.js */



var fill = function(a, i, j, v){
	--i;
	while(++i < j){
		a[i] = v;
	}

};

exports.fill = fill;
/* /home/genius/Bureau/algo/js/src/array/interpolationsearch.js */


var interpolationsearch_tt = function(pivotsearch_t){

	return function(diff){

		return pivotsearch_t(diff, function(k, a, i, j){
			var w = diff(a[j-1], a[i]);
			var d = diff(k, a[i]);
			if(w === 0){
				w = 1;
				d = d > 0;
			}
			var p = i + Math.floor(d * (j - i - 1) / w);
			return Math.max(i, Math.min(j - 1, p));
		});

	};

};

exports.interpolationsearch_tt = interpolationsearch_tt;
/* /home/genius/Bureau/algo/js/src/array/iota.js */



var iota = function(a, i, j, v){
	if (v === undefined) v = 0;
	--i; --v;

	while(++i < j){
		a[i] = ++v;
	}
};

exports.iota = iota;
/* /home/genius/Bureau/algo/js/src/array/iter.js */



var fiter = function(i, j, fn){
	while(i < j){
		fn(i);
		++i;
	}
};

var biter = function(i, j, fn){
	while(--j >= i){
		fn(j);
	}
};



exports.fiter = fiter;
exports.biter = biter;
/* /home/genius/Bureau/algo/js/src/array/merge.js */


var merge_t = function(index, copy){

	var merge = function(a, i, j, b, k, l, c, m){

		var o = m - i - k;
		var t = i;

		for(; k < l; ++k){
			var q = index(b[k], a, i, j);
			i = q[0] + q[1];
			copy(a, t, i, c, o + t + k);
			c[o + i + k] = b[k];
			t = i;
		}

		copy(a, t, j, c, o + t + k);
	};

	return merge;

};

exports.merge_t = merge_t;
/* /home/genius/Bureau/algo/js/src/array/mergesort.js */


var mergesort_t = function(merge){

	var mergesort = function(a, i, j, d, l, r){
		if(j - i < 2) return;

		var p = Math.floor((i + j) / 2);
		mergesort(a, i, p, d, l, l + p - i);
		mergesort(a, p, j, d, l + p - i, r);
		merge(a, i, p, a, p, j, d, l);
		for(var t = 0; t < j - i; ++t) a[i + t] = d[l + t];
	};

	return mergesort;

};

exports.mergesort_t = mergesort_t;
/* /home/genius/Bureau/algo/js/src/array/multiselect.js */


var multiselect_t = function(partition, binarysearch){

	var multiselect = function(k, l, r, a, i, j){

		if(j - i < 2 || r - l === 0) return;

		var p = partition(a, i, j);
		var q = binarysearch(p, k, l, r);

		multiselect(k, l, q[1], a, i, p);
		multiselect(k, q[0] + q[1], r, a, p + 1, j);
	};

	return multiselect;

};

exports.multiselect_t = multiselect_t;
/* /home/genius/Bureau/algo/js/src/array/opt.js */




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
/* /home/genius/Bureau/algo/js/src/array/partition.js */
var partition_t = function(pred){

	var partition = function(a, i, j){

		var t, p = a[i], k = i + 1;
		--j;


		while(k <= j){
			if(pred(p, a[k])){
				t    = a[k];
				a[k] = a[j];
				a[j] = t;
				--j;
			}
			else ++k;
		}

		a[i]   = a[k-1];
		a[k-1] = p;

		return k - 1;
	};

	return partition;

};

exports.partition_t = partition_t;
/* /home/genius/Bureau/algo/js/src/array/pivotsearch.js */


var pivotsearch_t = function(diff, pivot){

	var pivotsearch = function(k, a, i, j){
		if (i === j) return [0, i];
		var p = pivot(k, a, i, j);
		var d = diff(k, a[p]);
		if      (d === 0) return [1, p];
		else if (d   < 0) return pivotsearch(k, a, i, p);
		else              return pivotsearch(k, a, p + 1, j);
	};

	return pivotsearch;

};

exports.pivotsearch_t = pivotsearch_t;
/* /home/genius/Bureau/algo/js/src/array/quickselect.js */


var quickselect_t = function(partition){

	var quickselect = function(k, a, i, j){
		if(j - i < 2) return;
		var p = partition(a, i, j);
		if      (k < p) quickselect(k, a, i, p);
		else if (k > p) quickselect(k, a, p + 1, j);
	};

	return quickselect;

};

exports.quickselect_t = quickselect_t;
/* /home/genius/Bureau/algo/js/src/array/quicksort.js */


var quicksort_t = function(partition){

	var quicksort = function(a, i, j){
		if(j - i < 2) return;
		var p = partition(a, i, j);
		quicksort(a, i, p);
		quicksort(a, p + 1, j);
	};

	return quicksort;

};

exports.quicksort_t = quicksort_t;
/* /home/genius/Bureau/algo/js/src/array/tapemerge.js */


var tapemerge_t = function(pred){

	var tapemerge = function(a, i, j, b, k, l, c, m){
		var n = m + j - i + l - k;
		
		for(; m < n; ++m){
			if(k >= l || (i < j && pred(a[i], b[k]))){
				c[m] = a[i]; ++i;
			}
			else{
				c[m] = b[k]; ++k;
			}
		}
		
	};

	return tapemerge;

};

exports.tapemerge_t = tapemerge_t;
/* /home/genius/Bureau/algo/js/src/bignum */
/* /home/genius/Bureau/algo/js/src/bignum/add.js */

/**
 * @param r base (radix)
 */


var badd_t = function(r){


	/**
	 * Adds two big endian arrays, k >= i >= j
	 * wraps
	 * 
	 * @param a first operand
	 * @param i0 a left
	 * @param i1 a right
	 * @param b second operand
	 * @param j0 b left
	 * @param j1 b right
	 * @param c result, must be 0 initialized
	 * @param k0 c left
	 * @param k1 c right
	 */

	return function(a, i0, i1, b, j0, j1, c, k0, k1){
		var t, C = 0;

		while(--j1 >= j0){
			--i1; --k1;
			t = a[i1] + b[j1] + C;
			c[k1] = t % r;
			C = t / r >= 1;
		}

		while(--i1 >= i0){
			--k1;
			t = a[i1] + C;
			c[k1] = t % r;
			C = t / r >= 1;
		}

		if(--k1 >= k0){
			c[k1] = +C;
		}

	};

};


/**
 * @param r base (radix)
 */

var ladd_t = function(r){

	/**
	 * Adds two little endian arrays, k >= i >= j
	 * wraps
	 * 
	 * @param a first operand
	 * @param i0 a left
	 * @param i1 a right
	 * @param b second operand
	 * @param j0 b left
	 * @param j1 b right
	 * @param c result, must be 0 initialized
	 * @param k0 c left
	 * @param k1 c right
	 */

	return function(a, i0, i1, b, j0, j1, c, k0, k1){
		var t, C = 0;

		while(j0 < j1){
			t = a[i0] + b[j0] + C;
			c[k0] = t % r;
			C = t / r >= 1;
			++i0; ++j0; ++k0;
		}

		while(i0 < i1){
			t = a[i0] + C;
			c[k0] = t % r;
			C = t / r >= 1;
			++i0; ++k0;
		}

		if(k0 < k1){
			c[k0] = +C;
		}

	};
};

exports.badd_t = badd_t;
exports.ladd_t = ladd_t;
/* /home/genius/Bureau/algo/js/src/bignum/karatsuba.js */
/**
 * /!\ BLOCK MULTIPLICATION RESULT MUST HOLD IN THE JAVASCRIPT NUMBER TYPE (DOUBLE i.e. 53 bits)
 *
 * 
 * @param {function} add addition algorithm
 * @param {function} sub subtraction algorithm
 * @param {function} mul multiplication algorithm
 * @param {function} copy copy algorithm
 * @param {prototype} num array ctor
 * @param {uint} r base (radix)
 *
 * 
 * EXPLANATION
 * ###########
 * 
 * a.b = (a1.r^{n} + a0).(b1.r^{n} + b0)
 *     = a1.b1.r^{2n} + (a1.b0 + a0.b1).r^{n} + a0.b0
 *     = z2.r^{2n} + z1.r^{n} + z0
 *       
 * z2 = a1.b1
 * z1 = a1.b0 + a0.b1
 * z0 = a0.b0
 *       
 * (a1 + a0)(b1 + b0) = a1.b1 + a0.b0 + (a1.b0 + a0.b1)
 *                    = z2 + z0 + z1
 *                    
 * z1 = (a1 + a0)(b1 + b0) - z2 - z0
 *
 * AN ANOTHER WAY AROUND (not used here)
 *
 * (a1 - a0)(b1 - b0) = a1.b1 + a0.b0 - (a1.b0 + a0.b1)
 * (a0 - a1)(b1 - b0) = (a1.b0 + a0.b1) - a1.b1 + a0.b0
 * a.b = (r^{2n} + r^{n})a1.b1 + r^{n}(a0 - a1)(b1 - b0) + (r^{n} + 1)a0.b0,
 */

var bkaratsuba_t = function(add, sub, mul, num, mov, r, wrap){

	/**
	 * Multiply two big endian arrays using karatsuba algorithm,
	 * i >= j, k >= 2 * i
	 * 
	 * 
	 * @param a first operand
	 * @param i0 a left
	 * @param i1 a right
	 * @param b second operand
	 * @param j0 b left
	 * @param j1 b right
	 * @param c result, must be 0 initialized
	 * @param k0 c left
	 * @param k1 c right
	 */

	var karatsuba = function(a, i0, i1, b, j0, j1, c, k0, k1){

		var z0, z2, t1, t2, t3, p, I, P, P_, i_, j_;

		var i = i1 - i0,
		j = j1 - j0,
		k = k1 - k0;

		// EMPTY CASE
		if(i <= 0 || j <= 0 || k <= 0) return;

		// BASE CASE i = j = 1
		if(i === 1){
			z0 = a[i0] * b[j0];
			c[k1-1] = z0 % r;

			if(k > 1)
				c[k1-2] = (z0 - c[k1-1]) / r;

		}

		// RECURSION
		else{
			p = Math.ceil(i / 2);
			I = i + j;
			P = 2 * p;
			P_ = I - P;
			i_ = i1 - p;
			j_ = Math.max(j0, j1 - p);

			t1 = new num(p+1); // + 1 to handle addition overflows
			t2 = new num(p+1); // and guarantee reducing k for the
			t3 = new num(P+1); // recursive calls
			z2 = new num(P_);
			z0 = new num(P);
			
		// RECURSIVE CALLS
			mul(a, i0, i_, b, j0, j_, z2, 0, P_);            // z2 = a1.b1
			mul(a, i_, i1, b, j_, j1, z0, 0, P);             // z0 = a0.b0
			add(a, i_, i1, a, i0, i_, t1, 0, p + 1);         // (a0 + a1)
			add(b, j0, j_, b, j_, j1, t2, 0, p + 1);         // (b1 + b0)
			mul(t1, 1, p + 1, t2, 1, p + 1, t3, 1, P + 1);   // (a0 + a1)(b1 + b0)

		// BUILD OUTPUT
			mov(z2, 0, P_, c, k1 - I);                       // + z2 . r^{2n}
			mov(z0, 0, P , c, k1 - P);                       // + z0
			if(t1[0])                                        // overflow on t1, add t2 . r^{p}
			add(t3, 0, P + 1 - p, t2, 1, p + 1, t3, 0, P + 1 - p);
			if(t2[0])                                        // overflow on t2, add t1 . r^{p}
			add(t3, 0, P + 1 - p, t1, 1, p + 1, t3, 0, P + 1 - p);
			if(t1[0] && t2[0])                               // overflow on t1 and t2, add 1 . r^{p+1}
			add(t3, 0, P - p, t1, 0, 1, t3, 0, P - p);
			add(c, k0, k1 - p, t3, 0, P + 1, c, k0, k1 - p); // + (a0 + a1)(b1 + b0) . r^{n}
			sub(c, k0, k1 - p, z2, 0, P_, c, k0, k1 - p);    // - z2 . r^{n}
			sub(c, k0, k1 - p, z0, 0, P, c, k0, k1 - p);     // - z1 . r^{n}
		}

	};

	if(wrap !== undefined) karatsuba = wrap(karatsuba);
	if(mul === undefined) mul = karatsuba;

	return karatsuba;

};


exports.bkaratsuba_t = bkaratsuba_t;
/* /home/genius/Bureau/algo/js/src/bignum/stringify.js */

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
/* /home/genius/Bureau/algo/js/src/bignum/sub.js */

/**
 * @param r base (radix)
 */


var bsub_t = function(r){

	/**
	 * Subtracts two big endian arrays, k >= i >= j
	 * wraps
	 * 
	 * @param a first operand
	 * @param i0 a left
	 * @param i1 a right
	 * @param b second operand
	 * @param j0 b left
	 * @param j1 b right
	 * @param c result, must be 0 initialized
	 * @param k0 c left
	 * @param k1 c right
	 */

	return function(a, i0, i1, b, j0, j1, c, k0, k1){
		var t, T, C = 0;

		while(--j1 >= j0){
			--i1; --k1;
			T = C;
			C = a[i1] < b[j1] + T;
			c[k1] = a[i1] - b[j1] + (C*r - T);
		}

		while(--i1 >= i0){
			--k1;
			T = C;
			C = a[i1] < T;
			c[k1] = a[i1] + (C*r - T);
		}

		if(C){
			while(--k1 >= k0){
				c[k0] = r - 1;
			}
		}

	};
};
/**
 * @param r base (radix)
 */


var lsub_t = function(r){

	/**
	 * Subtracts two little endian arrays, k >= i >= j
	 * wraps
	 * 
	 * @param a first operand
	 * @param i0 a left
	 * @param i1 a right
	 * @param b second operand
	 * @param j0 b left
	 * @param j1 b right
	 * @param c result, must be 0 initialized
	 * @param k0 c left
	 * @param k1 c right
	 */

	return function(a, i0, i1, b, j0, j1, c, k0, k1){
		var t, T, C = 0;

		while(j0 < j1){
			T = C;
			C = a[i0] < b[j0] + T;
			c[k0] = a[i0] - b[j0] + (C*r - T);
			++i0; ++j0; ++k0;
		}

		while(i0 < i1){
			T = C;
			C = a[i0] < T;
			c[k0] = a[i0] + (C*r - T);
			++i0; ++k0;
		}

		if(C){
			while(k0 < k1){
				c[k0] = r - 1;
				++k0;
			}
		}

	};
};


exports.bsub_t = bsub_t;
exports.lsub_t = lsub_t;

/* /home/genius/Bureau/algo/js/src/bignum/wrap.js */


var wrapbin = function(fn){

	return function(a, i0, i1, b, j0, j1, c, k0, k1){

		var i, j, k;

		k0 = Math.max(0, k0);
		k = k1 - k0;

		i0 = Math.max(0, i0, i1 - k);
		j0 = Math.max(0, j0, j1 - k);
		i = i1 - i0;
		j = j1 - j0;

		if(i < j)
		return fn(b, j0, j1, a, i0, i1, c, k0, k1);

		else
		return fn(a, i0, i1, b, j0, j1, c, k0, k1);
	};
};

var wrapmov = function(fn){
	return function(a, i, j, b, k){

		if(i < 0){
			k -= i;
			i = 0;
		}
		if(k < 0){
			i -= k;
			k = 0;
		}
		return fn(a, i, j, b, k);

	};
};


exports.wrapbin = wrapbin;
exports.wrapmov = wrapmov;
/* /home/genius/Bureau/algo/js/src/num */
/* /home/genius/Bureau/algo/js/src/num/gcd.js */



var gcd = function(a, b){
	while(true){
		if (a === 0) return b;
		b %= a;
		if (b === 0) return a;
		a %= b;
	}
};

exports.gcd = gcd;
/* /home/genius/Bureau/algo/js/src/num/ge.js */

var ge = function(a, b){ return a >= b; };

exports.ge = ge;

/* /home/genius/Bureau/algo/js/src/num/gt.js */

var gt = function(a, b){ return a > b; };

exports.gt = gt;

/* /home/genius/Bureau/algo/js/src/num/lcm.js */


var lcm_t = function(gcd){
	return function(a, b){
		return a / gcd(a, b) * b;
	};
};

exports.lcm_t = lcm_t;
/* /home/genius/Bureau/algo/js/src/num/le.js */

var le = function(a, b){ return a <= b; };

exports.le = le;

/* /home/genius/Bureau/algo/js/src/num/lt.js */


var lt = function(a, b){ return a < b; };

exports.lt = lt;

/* /home/genius/Bureau/algo/js/src/num/zfill.js */


var zfill_t = function(n, lfill_t){
	return lfill_t('0', n);
};

exports.zfill_t = zfill_t;
/* /home/genius/Bureau/algo/js/src/random */
/* /home/genius/Bureau/algo/js/src/random/randint.js */


var randint = function(i, j){
	return i + Math.floor(Math.random() * (j - i));
};

exports.randint = randint;
/* /home/genius/Bureau/algo/js/src/random/sample.js */


var sample_t = function(randint){

	var sample = function(n, a, i, j){
		var tmp, k, t = i - 1, x = i + n;

		while(++t < x){
			k    = randint(t, j);
			tmp  = a[t];
			a[t] = a[k];
			a[k] = tmp;
		}
	};

	return sample;

};

exports.sample_t = sample_t;
/* /home/genius/Bureau/algo/js/src/random/shuffle.js */


var shuffle_t = function(sample){

	var shuffle = function(a, i, j){
		sample(j - i, a, i, j);
	};

	return shuffle;
};

exports.shuffle_t = shuffle_t;
/* /home/genius/Bureau/algo/js/src/string */
/* /home/genius/Bureau/algo/js/src/string/fill.js */


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
/* /home/genius/Bureau/algo/js/src/string/strmul.js */


var strmul = function(s, len){
	var a = new Array(len);
	while(len--) a[len] = s;
	return a.join('');
};

exports.strmul = strmul;
})(typeof exports === 'undefined' ? this['algo'] = {} : exports);
