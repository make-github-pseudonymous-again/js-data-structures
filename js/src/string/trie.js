
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
