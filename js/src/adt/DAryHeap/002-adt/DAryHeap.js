

var DAryHeap = function ( arity, compare ) {

	// arity of this heap

	this.arity = arity;


	// the comparison function

	this.compare = compare;


	// array used to store values

	this.array = [];


	// array used to store references

	this.ref = [];


	// size of the heap

	this.length = 0;


	// bind the swap method

	this.swap = this.swap.bind( this );

};


DAryHeap.prototype.swap = function ( a, i, j ) {

	var tmp;

	tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;

	tmp = this.ref[i];
	this.ref[i] = this.ref[j];
	this.ref[j] = tmp;

	this.ref[i][0] = i;
	this.ref[j][0] = j;

};


DAryHeap.prototype.head = function () {

	if ( this.length === 0 ) {
		return undefined;
	}

	return this.array[0];

};


DAryHeap.prototype.pop = function () {

	var a, i, j, value;

	if ( this.length === 0 ) {
		return undefined;
	}

	a = this.array;
	i = 0;
	j = a.length;

	value = daryheap.pop( this.arity, this.compare, this.swap, a, i, j );

	a.pop();
	this.ref.pop();

	--this.length;

	return value;

};


DAryHeap.prototype.push = function ( value ) {

	var a, i, j;

	a = this.array;
	i = 0;
	j = a.length;


	a.push( value );
	this.ref.push( [j] );

	daryheap.push( this.arity, this.compare, this.swap, a, i, j );

	++this.length;

};

DAryHeap.prototype.merge = function ( other ) {

	var a, i, j, k;

	a = this.array;
	i = 0;
	j = a.length;

	a = this.array = a.concat( other.array );

	this.ref = this.ref.concat( other.ref );

	k = a.length;

	daryheap.merge( this.arity, this.compare, this.swap, a, i, j, k );

	this.length += other.length;

};

exports.DAryHeap = DAryHeap;
