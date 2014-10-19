

var __BinomialTree__ = function ( pred ) {

	var BinomialTree = function ( value, children ) {
		this.value = value;
		this.children = children;
	};

	/**
	 * /!\ Can only be used to merge two trees of the same rank.
	 */

	BinomialTree.prototype.merge = function ( other ) {

		var value, children;

		value = 0;
		children = null;

		if ( pred( this.value, other.value ) ) {
			value = this.value;
			children = this.children.concat( other );
		}

		else {
			value = other.value;
			children = other.children.concat( this );
		}

		return new BinomialTree( value, children );

	};

	return BinomialTree;

};

exports.__BinomialTree__ = __BinomialTree__;
