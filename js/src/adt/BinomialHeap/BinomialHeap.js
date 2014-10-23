var __BinomialHeap__ = function ( BinomialTree ) {

	var binomial_heap_push = function ( predicate, list, tree, rank ) {

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

			tree = tree.merge( predicate, list[i] );
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


	var merge = function ( predicate, list, other ) {

		var i, len, carry;

		if ( other.length === 0 ) {
			return;
		}

		// merging two binomial heaps is like
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
						carry = carry.merge( predicate, list[i] );
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

				carry = carry.merge( predicate, other[i] );

			}

			// (1) other[i] != null and list[i] != null and carry = null
			// --> merge current cell with other[i]

			else if ( list[i] !== null ) {

				carry = list[i].merge( predicate, other[i] );
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

	var find_min_index = function ( predicate, list, j, len ) {

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

	var remove_head_at_index = function ( predicate, list, i, len ) {

		var orphans;

		orphans = list[i].children;
		list[i] = null;

		change_parent( null, orphans );

		// we just removed the ith element
		// if list[i] is the last cell
		// of list we can drop it

		if ( i === len - 1 ) {
			list.pop();
		}

		// we merge back the children of
		// the removed tree into the heap

		merge( predicate, list, orphans );

	};

	var binomial_heap_pop = function ( predicate, list ) {

		var i, len, tree;

		len = list.length;

		i = find_min_index( predicate, list, 0, len );

		tree = list[i];

		remove_head_at_index( predicate, list, i, len );

		return tree;
	};

	var change_parent = function ( parent, children ) {

		var i, len;

		for ( i = 0, len = children.length ; i < len ; ++i ) {
			children[i].setparent(parent);
		}

	};

	var shift_up = function ( tree, parent ) {

		var tmp, i;

		// console.log( "tree", tree.value );
		// console.log( "parent", parent.value );

		// Here, we cannot just swap values as it would invalidate
		// externally stored references.
		// Instead, we swap children lists and update references
		// between the tree and its parent.
		// Then we update and return the new tree's parent.

		// console.log( "tree.children", tree.children );
		// console.log( "parent.children", parent.children );

		tmp = parent.children;
		parent.children = tree.children;
		tree.children = tmp;


		i = parent.rank();

		// console.log( tree.children, i );

		tree.children[i] = parent;

		tree.parent = parent.parent;

		change_parent( tree, tree.children );
		change_parent( parent, parent.children );

		// console.log( "tree.children", tree.children );
		// console.log( "parent.children", parent.children );

		return tree.parent;

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

	var decreasekey = function ( predicate, list, tree, value ) {

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

	var deletetree = function ( predicate, list, tree ) {

		percolate_up( list, tree );

		remove_head_at_index( predicate, list, tree.rank(), list.length );

		tree.detach();

	};

	var BinomialHeap = function ( predicate ) {

		// the predicate to use to compare values

		this.predicate = predicate;


		// number of elements in this heap

		this.length = 0;


		// list of binomial trees

		this.list = [];

	};

	BinomialHeap.prototype.head = function () {

		var i, tree;

		if ( this.length === 0 ) {
			return undefined;
		}

		i = find_min_index( this.predicate, this.list, 0, this.list.length );

		tree = this.list[i];

		return tree.value;

	};

	BinomialHeap.prototype.headreference = function () {

		var i, tree;

		if ( this.length === 0 ) {
			return null;
		}

		i = find_min_index( this.predicate, this.list, 0, this.list.length );

		tree = this.list[i];

		return tree;

	};

	BinomialHeap.prototype.pop = function () {

		if ( this.length === 0 ) {
			return undefined;
		}

		--this.length;

		return binomial_heap_pop( this.predicate, this.list ).value;

	};

	BinomialHeap.prototype.popreference = function () {

		if ( this.length === 0 ) {
			return null;
		}

		--this.length;

		return binomial_heap_pop( this.predicate, this.list ).detach();

	};

	BinomialHeap.prototype.push = function ( value ) {

		var tree;

		// push a new tree of rank 0

		tree = new BinomialTree( value, [] );

		this.pushreference( tree );

		return tree;

	};

	BinomialHeap.prototype.pushreference = function ( tree ) {

		++this.length;

		// push an existing tree of rank 0

		binomial_heap_push( this.predicate, this.list, tree, 0 );

	};

	BinomialHeap.prototype.merge = function ( other ) {

		merge( this.predicate, this.list, other.list );

		this.length += other.length;

		return this;

	};

	BinomialHeap.prototype.update = function ( tree, value ) {

		var d;

		d = this.predicate( value, tree.value );

		if ( d < 0 ) {
			this.decreasekey( tree, value );
		}

		else if ( d > 0 ) {
			this.increasekey( tree, value );
		}

		else {

			// d === 0 does not imply tree.value === value

			tree.value = value;

		}

	};

	BinomialHeap.prototype.decreasekey = function ( tree, value ) {

		decreasekey( this.predicate, this.list, tree, value );

	};

	BinomialHeap.prototype.increasekey = function ( tree, value ) {

		deletetree( this.predicate, this.list, tree );

		tree.value = value;

		binomial_heap_push( this.predicate, this.list, tree, 0 );

	};

	BinomialHeap.prototype.delete = function ( tree ) {

		--this.length;

		deletetree( this.predicate, this.list, tree );

	};

	return BinomialHeap;

};

exports.__BinomialHeap__ = __BinomialHeap__;
