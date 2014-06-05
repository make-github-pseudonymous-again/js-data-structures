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
		this[0] = this[1] = null;
	};

	SplayTree.prototype.insert = function(value){

		if(this.root === null){
			this.root = new Node(value);
			return;
		}

		var current = this.root;

		while(true){
			if(comp(value, current.value)){
				if(current[0] === null){
					current[0] = new Node(value);
					return;
				}
				current = current[0];
			}
			else{
				if(current[1] === null){
					current[1] = new Node(value);
					return;
				}
				current = current[1];
			}
		}
	};


	var zig = function(x, root){
		root[0] = x[1];
		x[1] = root;
	};

	var zag = function(x, root){
		root[1] = x[0];
		x[0] = root;
	};

	var zigzig = function(x, p, g){ zig(p, g); zig(x, p); };
	var zigzag = function(x, p, g){ zig(x, g); zag(x, p); };
	var zagzig = function(x, p, g){ zag(x, g); zig(x, p); };
	var zagzag = function(x, p, g){ zag(p, g); zag(x, p); };

	var z = [zig, zag];
	var zz = [[zigzig, zigzag], [zagzig, zagzag]];

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
				current = current[0];
				path.push(0);
			}
			else{
				node.push(current);
				current = current[1];
				path.push(1);
			}
		}

		var i = path.length - 1;
		for(; i > 0; i -= 2){
			zz[path[i-1]][path[i]](current, node[i], node[i-1]);
			if(i > 1) node[i-2][path[i-2]] = current;
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

		if(r.w[0] === null) return r.w[1];
		else{
			r.w[0] = r.w[0].find(value).w;
			r.w[0][1] = r.w[1];
			return r.w[0];
		}
	};

	SplayTree.prototype.in_order_traversal = function(fn){
		if(this.root !== null) this.root.in_order_traversal(fn);
	};

	Node.prototype.in_order_traversal = function(fn){
		if(this[0] !== null) this[0].in_order_traversal(fn);
		fn(this.value);
		if(this[1] !== null) this[1].in_order_traversal(fn);
	};

	return SplayTree;

};

exports.splay_tree_t = splay_tree_t;