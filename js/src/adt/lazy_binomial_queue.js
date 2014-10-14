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
