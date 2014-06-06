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