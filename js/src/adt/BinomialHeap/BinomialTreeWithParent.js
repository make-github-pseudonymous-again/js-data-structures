

var BinomialTreeWithParent = function ( value, children ) {
	this.value = value;
	this.children = children;
	this.parent = null;
};

BinomialTreeWithParent.prototype.rank = function () {
	return this.children.length;
};

/**
 * /!\ Can only be used to merge two trees of the same rank.
 * /!\ Modifies both trees
 */

BinomialTreeWithParent.prototype.merge = function ( predicate, other ) {

	if ( predicate( this.value, other.value ) <= 0 ) {
		this.children = this.children.concat( other );
		other.parent = this;
		return this;
	}

	else {
		other.children = other.children.concat( this );
		this.parent = other;
		return other;
	}

};

/**
 * Method used to reset a tree element in order to reuse it
 * somewhere else, e.g. insert it back in the same or a new
 * heap.
 */

BinomialTreeWithParent.prototype.detach = function () {
	this.children.splice( 0 );
	this.parent = null;
	return this;
};

BinomialTreeWithParent.prototype.setparent = function ( parent ) {
	this.parent = parent;
};

exports.BinomialTreeWithParent = BinomialTreeWithParent;
