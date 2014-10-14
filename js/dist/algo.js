(function(exports, undefined){

	'use strict';


/* js/src/3sum */
/* js/src/3sum/_3sum_n2.js */


/**
 * Hypothesis :
 *   - A is sorted in increasing order
 *   - B is sorted in increasing order
 *   - |A| > 0
 *   - |B| > 0
 */

var _3sum_n2 = function (A, ai, aj, B, bi, bj, C, ci, cj, fn) {

	var hi, lo, a, b, c, v;

	for (; ci < cj; ++ci) {
		lo = ai;
		hi = bj - 1;

		do {

			a = A[lo];
			b = B[hi];
			c = C[ci];
			v = a + b;

			if (-c === v) fn(a, b, c);

			if (-c < v) --hi;
			else ++lo;

		} while (lo < aj && hi >= bi);
	}

};

exports._3sum_n2 = _3sum_n2;
/* js/src/adt */
/* js/src/adt/DoublyLinkedList.js */
(function(){

/**
 * Doubly linked list implementation
 * making use of dummy nodes for the
 * sake of simplicity.
 */

var DoublyLinkedList = function(){
	this.front = new Node(null, null, null);
	this.back = new Node(this.front, null, null);
	this.front.next = this.back;
	this.length = 0;
};

var Node = function(prev, next, value){
	this.prev = prev;
	this.next = next;
	this.value = value;
};

var Iterator = function(front, back, current){
	this.front = front;
	this.back = back;
	this.current = current;
};

var ReverseIterator = function(front, back, current){
	this.front = front;
	this.back = back;
	this.current = current;
};

DoublyLinkedList.prototype.insertAfter = function(iterator, value){
	var node, prev;

	prev = iterator.current;

	node = new Node(prev, prev.next, value);
	prev.next.prev = node;
	prev.next = node;

	++this.length;
	return this.iterator(node);
};

DoublyLinkedList.prototype.insertBefore = function(iterator, value){
	var node, next;

	next = iterator.current;

	node = new Node(next.prev, next, value);
	next.prev.next = node;
	next.prev = node;

	++this.length;
	return this.iterator(node);
};

DoublyLinkedList.prototype.unshift = function(value){
	return this.insertAfter(this.begin(), value);
};

DoublyLinkedList.prototype.push = function(value){
	return this.insertBefore(this.end(), value);
};

DoublyLinkedList.prototype.erase = function(iterator){
	var node = iterator.current;

	node.prev.next = node.next;
	node.next.prev = node.prev;	

	--this.length;
	return this.iterator(node.next);
};

DoublyLinkedList.prototype.rerase = function(iterator){
	var node = iterator.current;

	node.next.prev = node.prev;	
	node.prev.next = node.next;

	--this.length;
	return this.iterator(node.prev);
};

DoublyLinkedList.prototype.eraserange = function(first, last){
	var firstnode, lastnode, it;
	firstnode = first.current;
	lastnode = last.current;

	lastnode.prev = firstnode.prev;	
	firstnode.prev.next = lastnode;

	it = first.copy();

	while (it.current !== lastnode) {
		--this.length;
		it.next();
	}
	return last.copy();
};

DoublyLinkedList.prototype.reraserange = function(first, last){
	var firstnode, lastnode, it;
	firstnode = first.current;
	lastnode = last.current;

	lastnode.next = firstnode.next;	
	firstnode.next.prev = lastnode;

	it = first.copy();

	while (it.current !== lastnode) {
		--this.length;
		it.next();
	}
	return last.copy();
};

DoublyLinkedList.prototype.shift = function(){
	var it = this.begin();
	var e = it.next();

	if (e.done) {
		return null;
	}
	
	this.rerase(it);
	return e.value;
};

DoublyLinkedList.prototype.pop = function(){
	var it = this.rbegin();
	var e = it.next();

	if (e.done) {
		return null;
	}
	
	this.erase(it);
	return e.value;
};

DoublyLinkedList.prototype.clear = function(){
	this.front.next = this.back;
	this.back.prev = this.front;
	this.length = 0;
	return this;
};

DoublyLinkedList.prototype.iterator = function(node){
	return new Iterator(this.front, this.back, node);
};

DoublyLinkedList.prototype.riterator = function(node){
	return new ReverseIterator(this.front, this.back, node);
};

DoublyLinkedList.prototype.begin = function(){
	return this.iterator(this.front);
};

DoublyLinkedList.prototype.end = function(){
	return this.iterator(this.back);
};

DoublyLinkedList.prototype.rbegin = function(){
	return this.riterator(this.back);
};

DoublyLinkedList.prototype.rend = function(){
	return this.riterator(this.front);
};

Iterator.prototype.copy = function() {
	return new Iterator(this.front, this.back, this.current);
};

ReverseIterator.prototype.copy = function() {
	return new ReverseIterator(this.front, this.back, this.current);
};

Iterator.prototype.next =
ReverseIterator.prototype.prev =
function(){
	this.current = this.current.next;
	if (this.current === this.back) {
		return { done : true };
	}
	else {
		return {
			value : this.current.value,
			done : false
		};
	}
};

Iterator.prototype.prev =
ReverseIterator.prototype.next =
function(){
	this.current = this.current.prev;
	if (this.current === this.front) {
		return { done : true };
	}
	else {
		return {
			value : this.current.value,
			done : false
		};
	}
};

DoublyLinkedList.Node = Node;
DoublyLinkedList.Iterator = Iterator;
DoublyLinkedList.ReverseIterator = ReverseIterator;


exports.DoublyLinkedList = DoublyLinkedList;

})();

/* js/src/adt/binomial_queue.js */
var binomial_queue_t = function(pred){

	var binomial_tree_t = function(value, next){
		this.value = value;
		this.next = next;
	};


	binomial_tree_t.prototype.rank = function(){
		return this.next.length;
	};


	var binomial_queue = function(){
		this.length = 0;
		this.list = [null];
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


	var binomial_queue_push = function(queue, value){
		var tree = new binomial_tree_t(value, []), i;

		for (i = 0; i < queue.list.length; ++i) {
			if (queue.list[i] === null) {
				queue.list[i] = tree;
				break;
			}
			else {
				tree = binomial_tree_merge(tree, queue.list[i]);
				queue.list[i] = null;
			}
		}

		if (i === queue.list.length - 1) queue.list.push(null);

		++queue.length;

	};


	var binomial_queue_merge = function(queue, tree_l) {
		if (tree_l.length === 0) return;

		var r = null, i, j, k;

		var m = tree_l[tree_l.length - 1];
		while(queue.list.length < m.rank() + 2) queue.list.push(null);

		for (i = 0; i < tree_l.length; ++i) {
			j = tree_l[i].rank();

			if (r === null) {
				if (queue.list[j] === null) queue.list[j] = tree_l[i];
				else {
					r = binomial_tree_merge(tree_l[i], queue.list[j]);
					queue.list[j] = null;
				}
			}
			else r = binomial_tree_merge(tree_l[i], r);

			if (i === tree_l.length - 1 || tree_l[i+1].rank() !== j + 1) {
				k = j + 1;
				while (r !== null && (i === tree_l.length - 1 || tree_l[i+1].rank() !== k)) {
					if (queue.list[j+1] === null) {
						queue.list[j+1] = r;
						r = null;
					}
					else {
						r = binomial_tree_merge(queue.list[j+1], r);
						queue.list[j+1] = null;
					}
					++k;
				}
			}

		}

		if (queue.list[queue.list.length - 1] !== null) queue.list.push(null);
	};


	var binomial_queue_pop = function(queue) {
		var value = -1, x = -1, i, j, tree_l;

		for (i = 0; i < queue.list.length - 1; ++i) {
			if (queue.list[i] !== null) {
				x = i;
				value = queue.list[x].value;
				break;
			}
		}

		for (j = x + 1; j < queue.list.length - 1; ++j) {
			if (queue.list[j] !== null && pred(queue.list[j].value, value)) {
				x = j;
				value = queue.list[x].value;
			}
		}

		value = queue.list[x].value;
		tree_l = queue.list[x].next;
		queue.list[x] = null;

		if (i === queue.list.length - 2) queue.list.pop();

		binomial_queue_merge(queue, tree_l);

		--queue.length;

		return value;
	};


	binomial_queue.prototype.pop = function(){
		return binomial_queue_pop(this);
	};

	binomial_queue.prototype.push = function(value){
		return binomial_queue_push(this, value);
	};

	return binomial_queue;

};

exports.binomial_queue_t = binomial_queue_t;
/* js/src/adt/lazy_binomial_queue.js */
var lazy_binomial_queue_t = function(pred, __opt__){

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

	var max = __opt__(function(a, b){ return a.rank() > b.rank(); });

	var lazy_binomial_queue_merge = function(queue, tree_l){
		if ( tree_l.length === 0 ) return;

		var r = null;

		var m = max(tree_l, 0, tree_l.length);
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

/* js/src/adt/splay_tree.js */

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
/* js/src/adt/splay_tree_2.js */

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
/* js/src/adt/splay_tree_3.js */

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
/* js/src/adt/splay_tree_4.js */

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
/* js/src/adt/splay_tree_5.js */

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
/* js/src/array */
/* js/src/array/iter.js */



var fiter = function(i, j, fn){
	while (i < j) {
		fn(i);
		++i;
	}
};

var biter = function(i, j, fn){
	while (--j >= i) fn(j);
};



exports.fiter = fiter;
exports.biter = biter;
/* js/src/num */
/* js/src/num/eq.js */

var eq = function(a, b){ return a === b; };

exports.eq = eq;

/* js/src/num/gcd.js */



var gcd = function(a, b){
	while(true){
		if (a === 0) return b;
		b %= a;
		if (b === 0) return a;
		a %= b;
	}
};

exports.gcd = gcd;
/* js/src/num/ge.js */

var ge = function(a, b){ return a >= b; };

exports.ge = ge;

/* js/src/num/gt.js */

var gt = function(a, b){ return a > b; };

exports.gt = gt;

/* js/src/num/lcm.js */


var lcm_t = function(gcd){
	return function(a, b){
		return a / gcd(a, b) * b;
	};
};

exports.lcm_t = lcm_t;
/* js/src/num/le.js */

var le = function(a, b){ return a <= b; };

exports.le = le;

/* js/src/num/lt.js */


var lt = function(a, b){ return a < b; };

exports.lt = lt;

/* js/src/num/ne.js */

var ne = function(a, b){ return a !== b; };

exports.ne = ne;

/* js/src/num/zfill.js */


var zfill_t = function(n, lfill_t){
	return lfill_t('0', n);
};

exports.zfill_t = zfill_t;
/* js/src/string */
/* js/src/string/fill.js */


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
/* js/src/string/lempelziv.js */


/**
 * Simple lempelziv data compression algorithm implementation.
 */

var lempelziv_t = function(Trie, end){

	var lempelziv = {};

	lempelziv.encode = function(input, index, suffix){
		var j = 0;
		var tree = new Trie(), e = tree.empty(), pt = e, tmp;
		var i = 0, len = input.length;

		tree.put('', 0);

		for (; i < len; ++i) {

			for (; i < len; ++i) {
				tmp = pt.get(input, i);
				if (tmp === undefined) break;
				else pt = tmp;
			}

			if (i === len) break;

			pt.set(input, i, ++j);

			index.push(pt.value());
			suffix.push(input[i]);

			pt = e;
		}

		index.push(pt.value());
		suffix.push(end);
	};

	lempelziv.decode = function(index, suffix){
		var table = [[0, 0]], output = '';
		var i = 0, len = index.length, j, c, k, l, w;

		for (; i < len; ++i) {
			j = index[i];
			c = suffix[i];
			k = table[j][0];
			l = table[j][1];
			w = output.length;

			output += output.slice(k, l);

			if (c !== end) {
				table.push([w, w + l - k + 1]);
				output += c;
			}
		}

		return output;

	};

	return lempelziv;
};


exports.lempelziv_t = lempelziv_t;
/* js/src/string/strmul.js */


var strmul = function(s, len){
	var a = new Array(len);
	while(len--) a[len] = s;
	return a.join('');
};

exports.strmul = strmul;
/* js/src/string/trie.js */

/**
 * Simple implementation of a trie.
 * Can only add elements to the structure.
 * The code function must map each symbol to its own natural number.
 *
 * @param {natural} degree cardinality of symbol set
 * @param {natural} code code function
 */

var simpletrie_t = function(degree, code){


	var Node = function(val){
		this.ad = new Array(degree);
		this.val = val;
	};

	Node.prototype.get = function(key, i){
		return this.ad[code(key, i)];
	};

	Node.prototype.set = function(key, i, val){
		return this.ad[code(key, i)] = new Node(val);
	};

	Node.prototype.value = function(){
		return this.val;
	};


	var Trie = function(){
		this.pt = new Node();
	};

	Trie.prototype.empty = function(){
		return this.pt;
	};

	Trie.prototype.put = function(key, val) {

		var i = 0, len = key.length, pt = this.pt, k;

		for (; i < len; ++i) {
			k = code(key, i);
			pt = pt.ad[k] === undefined ? pt.ad[k] = new Node() : pt.ad[k];
		}

		pt.val = val;

		return pt;
	};


	Trie.prototype.get = function(key) {

		var i = 0, len = key.length, pt = this.pt, k;

		for (; i < len; ++i) pt = pt.get(key, i);

		return pt;
	};


	return Trie;

};

exports.simpletrie_t = simpletrie_t;

})(typeof exports === 'undefined' ? this['algo'] = {} : exports);
