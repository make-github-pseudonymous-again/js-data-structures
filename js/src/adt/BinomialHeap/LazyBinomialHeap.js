
var __LazyBinomialHeap__ = function ( BinomialTree ) {

	var lazy_binomial_heap_push = function( lazy, tree, rank ){

		var i, sequence;

		// lightweight binomial heap containing a unique tree

		sequence = [];


		// offset tree by its rank

		i = rank;

		while ( i-- ) {
			sequence.push( null );
		}

		sequence.push( tree );


		// do not merge the generated sequence immediately

		lazy.push( sequence );

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


	var lazy_binomial_heap_pop = function ( predicate, list, lazy ) {

		var i, j, len, opt, item, candidate, orphan;

		len = lazy.length;


		// amortized merge of
		// stored values

		for ( i = 0 ; i < len ; ++i ) {
			merge( predicate, list, lazy[i] );
		}


		// clean up lazy list

		lazy.splice( 0 );


		// standard O(log n) optimum search method

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

				if ( predicate( candidate, opt ) < 0 ) {

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

		// we store the children in the
		// lazy list

		lazy.push( orphan );

		return opt;
	};

	var LazyBinomialHeap = function ( predicate ) {

		// the predicate to use to compare values

		this.predicate = predicate;


		// number of elements in this heap

		this.length = 0;


		// list of binomial trees

		this.list = [];


		// list of binomial heaps waiting to be merged

		this.lazy = [];

	};


	LazyBinomialHeap.prototype.pop = function () {

		if ( this.length === 0 ) {
			return undefined;
		}

		--this.length;

		return lazy_binomial_heap_pop( this.predicate, this.list, this.lazy );

	};

	LazyBinomialHeap.prototype.push = function (value) {

		++this.length;

		// push a new tree of rank 0

		return lazy_binomial_heap_push( this.lazy, new BinomialTree( value, [] ), 0 );

	};


	LazyBinomialHeap.prototype.merge = function ( other ) {
		var i;
		for ( i = 0 ; i < other.lazy.length ; ++i ) {
			this.lazy.push( other.lazy[i] );
		}
		this.lazy.push( other.list );
		this.length += other.length;
		return this;
	};

	return LazyBinomialHeap;
};

exports.__LazyBinomialHeap__ = __LazyBinomialHeap__;
