

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

	var a, value;

	if ( this.length === 0 ) {
		return undefined;
	}

	--this.length;

	a = this.array;

	value = daryheap.pop( this.arity, this.compare, this.swap, a, 0, a.length );

	a.pop();

	return value;

};


DAryHeapWithoutReferences.prototype.push = function ( value ) {

	var a;

	++this.length;

	a = this.array;

	a.push( value );

	daryheap.push( this.arity, this.compare, this.swap, a, 0, a.length - 1 );

};

DAryHeapWithoutReferences.prototype.merge = function ( other ) {

	var a, i, j, k;

	a = this.array;

	i = 0;
	j = a.length;

	this.array = a.concat( other.array );

	a = this.array;

	k = a.length;

	this.length += other.length;

	daryheap.merge( this.arity, this.compare, this.swap, a, i, j, k );

};

exports.DAryHeapWithoutReferences = DAryHeapWithoutReferences;
