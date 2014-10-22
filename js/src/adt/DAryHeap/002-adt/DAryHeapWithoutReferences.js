

var DAryHeapWithoutReferences = function ( arity, compare ) {

	// arity of this heap

	this.arity = arity;


	// the comparison function

	this.compare = compare;


	// array used to store values

	this.array = [];


	// size of the heap

	this.length = 0;

};

DAryHeapWithoutReferences.prototype.swap = function ( a, i, j ) {

	var tmp;

	tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;

};


DAryHeapWithoutReferences.prototype.pop = function () {

	var a, i, j, value;

	if ( this.length === 0 ) {
		return undefined;
	}

	a = this.array;
	i = 0;
	j = a.length;

	value = daryheap.pop( this.arity, this.compare, this.swap, a, i, j );

	a.pop();

	--this.length;

	return value;

};


DAryHeapWithoutReferences.prototype.push = function ( value ) {

	var a, i, j;

	a = this.array;
	i = 0;
	j = a.length;


	a.push( value );

	daryheap.push( this.arity, this.compare, this.swap, a, i, j );

	++this.length;

};

DAryHeapWithoutReferences.prototype.merge = function ( other ) {

	var a, i, j, k;

	a = this.array;
	i = 0;
	j = a.length;

	a = this.array = a.concat( other.array );

	k = a.length;

	daryheap.merge( this.arity, this.compare, this.swap, a, i, j, k );

	this.length += other.length;

};

exports.DAryHeapWithoutReferences = DAryHeapWithoutReferences;

