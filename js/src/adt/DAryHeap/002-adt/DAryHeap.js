

var DAryHeap = function ( arity, compare ) {

	// arity of this heap

	this.arity = arity;


	// the comparison function

	this.compare = function ( a, b ) {
		return compare( a.value, b.value );
	};


	// array used to store values

	this.array = [];


	// size of the heap

	this.length = 0;

};


DAryHeap.Reference = function ( index, value ) {

	this.index = index;
	this.value = value;

};


DAryHeap.prototype.swap = function ( a, i, j ) {

	var tmp;

	tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;

	a[i].index = i;
	a[j].index = j;

};


DAryHeap.prototype.head = function () {

	if ( this.length === 0 ) {
		return undefined;
	}

	return this.array[0].value;

};


DAryHeap.prototype.pop = function () {

	var a, i, j, reference;

	if ( this.length === 0 ) {
		return undefined;
	}

	a = this.array;
	i = 0;
	j = a.length;

	reference = daryheap.pop( this.arity, this.compare, this.swap, a, i, j );

	a.pop();

	--this.length;

	return reference.value;

};


DAryHeap.prototype.push = function ( value ) {

	var a, i, j;

	a = this.array;
	i = 0;
	j = a.length;


	a.push( new DAryHeap.Reference( j, value ) );

	daryheap.push( this.arity, this.compare, this.swap, a, i, j );

	++this.length;

};

DAryHeap.prototype.merge = function ( other ) {

	var a, i, j, k;

	a = this.array;
	i = 0;
	j = a.length;

	a = this.array = a.concat( other.array );

	k = a.length;

	daryheap.merge( this.arity, this.compare, this.swap, a, i, j, k );

	this.length += other.length;

};

exports.DAryHeap = DAryHeap;
