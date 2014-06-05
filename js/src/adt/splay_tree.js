/*
 * When used as a multiset, comp must be a comparison operator such that
 * 
 *     equals(a, b) => comp(a, b).
 *
 */

var splay_tree_t = function(comp, equals){

	var SplayTree = function(){
		this.root = null;
	};

	var Node = SplayTree.Node = function(value){
		this.value = value;
		this.left = this.right = null;
	};

	SplayTree.prototype.insert = function(value){

		if(this.root === null){
			this.root = new Node(value);
			return;
		}

		var current = this.root;

		while(true){
			if(comp(value, current.value)){
				if(current.left === null){
					current.left = new Node(value);
					return;
				}
				current = current.left;
			}
			else{
				if(current.right === null){
					current.right = new Node(value);
					return;
				}
				current = current.right;
			}
		}
	};

	var zigzig = function(x, p, g){
		p.left = x.right;
		x.right = p;
		g.left = p.right;
		p.right = g;
	};

	var zigzag = function(x, p, g){
		p.right = x.left;
		x.left = p;
		g.left = x.right;
		x.right = g;
	};

	var zagzig = function(x, p, g){
		p.left = x.right;
		x.right = p;
		g.right = x.left;
		x.left = g;
	};

	var zagzag = function(x, p, g){
		p.right = x.left;
		x.left = p;
		g.right = p.left;
		p.left = g;
	};

	var zig = function(x, root){
		root.left = x.right;
		x.right = root;
	};

	var zag = function(x, root){
		root.right = x.left;
		x.left = root;
	};

	var zz = [[zigzig, zigzag], [zagzig, zagzag]];
	var z = [zig, zag];
	var side = ['left', 'right'];

	SplayTree.prototype.find = function(value){
		if(this.root === null) return {f:false, v:null};
		var r = this.root.find(value);
		this.root = r.w;
		return r;
	};

	Node.prototype.find = function(value){

		var path = [];
		var node = [];

		var current = this;
		var f;

		while(f === undefined){
			if(current === null){
				f = false;
				current = node[node.length - 1];
				--path.length;
			}
			else if(equals(value, current.value)) f = true;
			else if(comp(value, current.value)){
				node.push(current);
				current = current.left;
				path.push(0);
			}
			else{
				node.push(current);
				current = current.right;
				path.push(1);
			}
		}

		var i = path.length - 1;
		for(; i > 0; i -= 2){
			zz[path[i-1]][path[i]](current, node[i], node[i-1]);
			if(i > 1) node[i-2][side[path[i-2]]] = current;
		}

		if (i === 0) z[path[0]](current, this);

		return {f:f, w:current};
	};

	SplayTree.prototype.remove = function(value){
		if(this.root !== null) this.root = this.root.remove(value);
	};

	Node.prototype.remove = function(value){
		var r = this.find(value);
		if(!r.f) return r.w;

		if(r.w.left === null) return r.w.right;
		else{
			r.w.left = r.w.left.find(value).w;
			r.w.left.right = r.w.right;
			return r.w.left;
		}
	};

	SplayTree.prototype.in_order_traversal = function(fn){
		if(this.root !== null) this.root.in_order_traversal(fn);
	};

	Node.prototype.in_order_traversal = function(fn){
		if(this.left !== null) this.left.in_order_traversal(fn);
		fn(this.value);
		if(this.right !== null) this.right.in_order_traversal(fn);
	};

	return SplayTree;

};

exports.splay_tree_t = splay_tree_t;