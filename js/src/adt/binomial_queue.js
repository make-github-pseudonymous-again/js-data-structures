var binomial_queue_t = function ( predicate ) {


	var BinomialTree = __BinomialTree__( predicate );

	var mergetrees = function ( tree1, tree2 ) {
		return tree1.merge( tree2 );
	};

	var binomial_queue = function () {

		// number of elements in this queue

		this.length = 0;


		// list of binomial trees

		this.list = [];

	};

	var binomial_queue_push = function ( list, tree, rank ) {

		var i, len;

		// ensures list has at least rank cells

		i = rank - list.length;

		while ( i --> 0 ) {
			list.push( null );
		}

		// loop invariant
		// tree and list[i] have the same rank

		len = list.length;

		for ( i = rank ; i < len && list[i] !== null ; ++i ) {

			// there is already a tree with this rank

			tree = mergetrees( tree, list[i] );
			list[i] = null;

		}

		// do not forget to append null if
		// we are lacking space

		if ( i === len ) {
			list.push( null );
		}

		// cell is empty
		// we can just put the new tree here

		list[i] = tree;

	};


	var mergequeues = function ( list, other ) {

		var i, len, carry;

		if ( other.length === 0 ) {
			return;
		}

		// merging two binomial queues is like
		// adding two little endian integers
		// so, we first make sure that we have
		// enough place to store the result

		i = other.length - list.length;

		while ( i --> 0 ) {
			list.push( null );
		}

		carry = null;

		len = list.length;

		// remember len >= other.length

		for ( i = 0 ; i < len ; ++i ) {

			// other[i] can be either null or not
			// list[i] can be either null or not
			// carry can be either null or not
			// --> 2^3 = 8 possibilities
			//
			//    null ? | other[i] | list[i] | carry
			// ---------------------------------------
			//     (0)   |    no    |     no  |   no
			//     (1)   |    no    |     no  |  yes
			//     (2)   |    no    |    yes  |   no
			//     (3)   |    no    |    yes  |  yes
			//     (4)   |   yes    |     no  |   no
			//     (5)   |   yes    |     no  |  yes
			//     (6)   |   yes    |    yes  |   no
			//     (7)   |   yes    |    yes  |  yes

			if ( i >= other.length || other[i] === null ) {

				if ( carry !== null ) {


					// (6) other[i] = null and list[i] = null and carry != null
					// --> put carry in current cell

					if ( list[i] === null ) {
						list[i] = carry;
						carry = null;
					}


					// (4) other[i] = null and list[i] != null and carry != null
					// --> merge carry with current cell

					else {
						carry = mergetrees( carry, list[i] );
						list[i] = null;
					}

				}

				// We do not need to do anything for
				// those 2 cases (carry and other[i] are null).
				// ==
				// (5) other[i] = null and list[i] != null and carry = null
				// (7) other[i] = null and list[i] = null and carry = null

			}

			// (0) other[i] != null and list[i] != null and carry != null
			// (2) other[i] != null and list[i] = null and carry != null
			// --> merge carry with other[i]

			else if ( carry !== null ) {

				carry = mergetrees( carry, other[i] );

			}

			// (1) other[i] != null and list[i] != null and carry = null
			// --> merge current cell with other[i]

			else if ( list[i] !== null ) {

				carry = mergetrees( list[i], other[i] );
				list[i] = null;

			}


			// (3) other[i] != null and list[i] = null and carry = null
			// --> put other[i] in list

			else {

				list[i] = other[i];

			}

		}

		// do not forget to append last carry

		if ( carry !== null ) {
			list.push( carry );
		}

	};

	var find_min_index = function ( list, j, len ) {

		var i, opt, item, candidate;

		// there MUST be at least one
		// non null element in this list
		// we look for the first one

		for ( ; j < len - 1 && list[j] === null ; ++j ) ;

		// here j is necessarily < len
		// and list[j] is non null

		i = j;
		opt = list[j].value;

		// we lookup remaining elements to see if there
		// is not a better candidate

		for ( ++j ; j < len ; ++j ) {

			item = list[j];

			if ( item !== null ) {

				candidate = item.value;

				if ( predicate( candidate, opt ) < 0 ) {

					i = j;
					opt = candidate;

				}

			}

		}

		return i;

	};

	var remove_head_at_index = function ( list, i, len ) {

		var orphans;

		orphans = list[i].children;
		list[i] = null;

		// we just removed the ith element
		// if list[i] is the last cell
		// of list we can drop it

		if ( i === len - 1 ) {
			list.pop();
		}

		// we merge back the children of
		// the removed tree into the queue

		mergequeues( list, orphans );

	};

	var binomial_queue_pop = function ( list ) {

		var i, len, tree;

		len = list.length;

		i = find_min_index( list, 0, len );

		tree = list[i];

		remove_head_at_index( list, i, len );

		return tree;
	};

	var shift_up = function ( tree, parent ) {

		var tmp;

		// Here, we cannot just swap values as it would invalidate
		// externally stored references.
		// Instead, we swap children lists and update references
		// between the tree and its parent.
		// Then we update and return the new tree's parent.

		tmp = parent.children;
		parent.children = tree.children;
		tree.children = tmp;

		tree.children[parent.rank()] = parent;

		tree.parent = parent.parent;
		parent.parent = tree;
		parent = tree.parent;

		return parent;

	};

	var percolate_up = function ( list, tree ) {

		var tmp, parent;

		parent = tree.parent;

		if ( parent !== null ) {

			while ( true ) {

				parent = shift_up( tree, parent );

				if ( parent === null ) {
					break;
				}

				// TODO this call might not be necessary
				parent.children[tree.rank()] = tree;

			}

			list[tree.rank()] = tree;

		}

	};

	var decreasekey = function ( list, tree, value ) {

		var d, tmp, parent;

		tree.value = value;
		parent = tree.parent;

		if ( parent !== null ) {

			while ( true ) {

				d = predicate( value, parent.value );

				if ( d >= 0 ) {
					return;
				}

				parent = shift_up( tree, parent );

				if ( parent === null ) {
					break;
				}

				// TODO this call should be in if ( d >= 0 )
				parent.children[tree.rank()] = tree;

			}

			list[tree.rank()] = tree;

		}

	};

	var deletetree = function ( list, tree ) {

		percolate_up( list, tree );

		remove_head_at_index( list, tree.rank(), list.length );

		tree.detach();

	};

	binomial_queue.prototype.pop = function () {

		if ( this.length === 0 ) {
			return undefined;
		}

		--this.length;

		return binomial_queue_pop( this.list ).value;

	};

	binomial_queue.prototype.popreference = function () {

		if ( this.length === 0 ) {
			return null;
		}

		--this.length;

		return binomial_queue_pop( this.list ).detach();

	};

	binomial_queue.prototype.push = function ( value ) {

		var reference;

		++this.length;

		// push a new tree of rank 0

		reference = new BinomialTree( value, [] );

		binomial_queue_push( this.list, reference, 0 );

		return reference;

	};

	binomial_queue.prototype.pushreference = function ( tree ) {

		++this.length;

		// push an existing tree of rank 0

		binomial_queue_push( this.list, tree, 0 );

	};

	binomial_queue.prototype.merge = function ( other ) {

		mergequeues( this.list, other.list );

		this.length += other.length;

		return this;

	};

	binomial_queue.prototype.update = function ( tree, value ) {

		var d;

		d = predicate( value, tree.value );

		if ( d < 0 ) {
			this.decreasekey( tree, value );
		}
		else if ( d > 0 ) {
			this.increasekey( tree, value );
		}

	};

	binomial_queue.prototype.decreasekey = function ( tree, value ) {

		decreasekey( this.list, tree, value );

	};

	binomial_queue.prototype.delete = function ( tree ) {

		--this.length;

		deletetree( this.list, tree );

	};

	binomial_queue.prototype.increasekey = function ( tree, value ) {

		deletetree( this.list, tree );

		binomial_queue_push( this.list, tree, 0 );

	};

	return binomial_queue;

};

exports.binomial_queue_t = binomial_queue_t;
