

var DAryHeap = function ( arity, compare ) {

	// arity of this heap

	this.arity = arity;


	// the comparison function

	this.compare = function ( a, b ) {
		return compare( a.value, b.value );
	};


	// the original comparison function

	this._compare = compare;


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


DAryHeap.prototype.headreference = function () {

	if ( this.length === 0 ) {
		return null;
	}

	return this.array[0];

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


DAryHeap.prototype.popreference = function () {

	var a, i, j, reference;

	if ( this.length === 0 ) {
		return null;
	}

	a = this.array;
	i = 0;
	j = a.length;

	reference = daryheap.pop( this.arity, this.compare, this.swap, a, i, j );

	a.pop();

	--this.length;

	return reference;

};


DAryHeap.prototype.push = function ( value ) {

	var a, i, j, reference;

	a = this.array;
	i = 0;
	j = a.length;

	reference = new DAryHeap.Reference( j, value );

	a.push( reference );

	daryheap.push( this.arity, this.compare, this.swap, a, i, j );

	++this.length;

	return reference;

};


DAryHeap.prototype.pushreference = function ( reference ) {

	var a, i, j;

	a = this.array;
	i = 0;
	j = a.length;


	reference.index = j;
	a.push( reference );

	daryheap.push( this.arity, this.compare, this.swap, a, i, j );

	++this.length;

};


DAryHeap.prototype.merge = function ( other ) {

	var a, i, j, k, t;

	a = this.array;
	i = 0;
	j = a.length;

	// concat arrays of both heaps

	a = this.array = a.concat( other.array );

	k = a.length;

	// update index of concatenated elements

	for ( t = j ; t < k ; ++t ) {
		a[t].index = t;
	}

	daryheap.merge( this.arity, this.compare, this.swap, a, i, j, k );

	this.length += other.length;

};


DAryHeap.prototype.update = function ( reference, value ) {

	var d;

	d = this._compare( value, reference.value );

	if ( d < 0 ) {
		this.decreasekey( reference, value );
	}

	else if ( d > 0 ) {
		this.increasekey( reference, value );
	}

	else {

		// d === 0 does not imply reference.value === value

		reference.value = value;

	}

};

DAryHeap.prototype.decreasekey = function ( reference, value ) {

	var a, i, j, k;

	a = this.array;
	i = 0;
	j = a.length;
	k = reference.index;

	reference.value = value;

	daryheap.percolateup( this.arity, this.compare, this.swap, a, i, j, k );

};

DAryHeap.prototype.increasekey = function ( reference, value ) {

	var a, i, j, k;

	a = this.array;
	i = 0;
	j = a.length;
	k = reference.index;

	reference.value = value;

	daryheap.percolatedown( this.arity, this.compare, this.swap, a, i, j, k );

};

DAryHeap.prototype.delete = function ( reference ) {

	var a, i, j, k;

	a = this.array;
	i = 0;
	j = a.length;
	k = reference.index;

	daryheap.delete( this.arity, this.compare, this.swap, a, i, j, k );

	--this.length;

};

exports.DAryHeap = DAryHeap;
