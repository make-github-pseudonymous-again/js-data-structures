/*
 * When used as a multiset, comp must be a comparison operator such that
 * 
 *     equals(a, b) => comp(a, b).
 *
 */

var splay_tree_t = function(comp, equals){

	var splay_tree = function(){ this.pt = null; };

	var zig = function(x, y){ y[0] = x[1]; x[1] = y; };
	var zag = function(x, y){ y[1] = x[0]; x[0] = y; };

	var zigzig = function(x, p, g){ zig(p, g); zig(x, p); };
	var zigzag = function(x, p, g){ zig(x, g); zag(x, p); };
	var zagzig = function(x, p, g){ zag(x, g); zig(x, p); };
	var zagzag = function(x, p, g){ zag(p, g); zag(x, p); };

	var z = [zig, zag];
	var zz = [[zigzig, zigzag], [zagzig, zagzag]];

	var find = function(n, value){

		var path = [], node = [], current = n, f;

		while(f === undefined){
			if(current === null){
				f = false;
				current = node[node.length - 1];
				--path.length;
			}
			else if(equals(value, current[2])) f = true;
			else if(comp(value, current[2])){
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

		if (i === 0) z[path[0]](current, n);

		return [f, current];
	};

	var remove = function(node, value){
		var r = find(node, value);
		if(!r[0]) return r[1];

		if(r[1][0] === null) return r[1][1];
		else{
			r[1][0] = find(r[1][0], value)[1];
			r[1][0][1] = r[1][1];
			return r[1][0];
		}
	};

	var in_order_traversal = function(node, fn){
		if(node[0] !== null) in_order_traversal(node[0], fn);
		fn(node[2]);
		if(node[1] !== null) in_order_traversal(node[1], fn);
	};


	splay_tree.prototype.insert = function(value){

		if(this.pt === null){
			this.pt = [null, null, value];
			return;
		}

		var current = this.pt;

		while(true){
			if(comp(value, current[2])){
				if(current[0] === null){
					current[0] = [null, null, value];
					return;
				}
				current = current[0];
			}
			else{
				if(current[1] === null){
					current[1] = [null, null, value];
					return;
				}
				current = current[1];
			}
		}
	};


	splay_tree.prototype.find = function(value){
		if(this.pt === null) return [false, null];
		var r = find(this.pt, value);
		this.pt = r[1];
		return [r[0], r[1][2]];
	};

	splay_tree.prototype.remove = function(value){
		if(this.pt !== null) this.pt = remove(this.pt, value);
	};

	splay_tree.prototype.in_order_traversal = function(fn){
		if(this.pt !== null) in_order_traversal(this.pt, fn);
	};


	return splay_tree;

};

exports.splay_tree_t = splay_tree_t;