

var __BinomialTree__ = function ( pred ) {

	var BinomialTree = function ( value, next ) {
		this.value = value;
		this.next = next;
	};

	BinomialTree.prototype.rank = function () {
		return this.next.length;
	};

	/**
	 * /!\ Can only be used to merge two trees of the same rank.
	 */

	BinomialTree.prototype.merge = function ( other ) {

		var value, next;

		value = 0;
		next = null;

		if ( pred( this.value, other.value ) ) {
			value = this.value;
			next = this.next.concat( other );
		}

		else {
			value = other.value;
			next = other.next.concat( this );
		}

		return new BinomialTree( value, next );

	};

	return BinomialTree;

};

exports.__BinomialTree__ = __BinomialTree__;
