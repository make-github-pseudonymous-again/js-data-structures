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

	var binomial_queue_pop = function ( list ) {

		var i, j, len, opt, item, candidate, orphan;

		len = list.length;

		// there MUST be at least one
		// non null element in this list
		// we look for the first one

		for ( j = 0 ; j < len - 1 && list[j] === null ; ++j ) ;

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

				if ( predicate( candidate, opt ) ) {

					i = j;
					opt = candidate;

				}

			}

		}

		orphan = list[i].children;
		list[i] = null;

		// we just removed the ith element
		// if list[i] is the last cell
		// of list we can drop it

		if ( i === len - 1 ) {
			list.pop();
		}

		// we merge back the children of
		// the removed tree into the queue

		mergequeues( list, orphan );

		return opt;
	};


	binomial_queue.prototype.pop = function () {

		if ( this.length === 0 ) {
			return undefined;
		}

		--this.length;

		return binomial_queue_pop( this.list );

	};

	binomial_queue.prototype.push = function (value) {

		++this.length;

		// push a new tree of rank 0

		return binomial_queue_push( this.list, new BinomialTree( value, [] ), 0 );

	};

	binomial_queue.prototype.merge = function ( other ) {

		mergequeues( this.list, other.list );

		this.length += other.length;

		return this;

	};

	return binomial_queue;

};

exports.binomial_queue_t = binomial_queue_t;
