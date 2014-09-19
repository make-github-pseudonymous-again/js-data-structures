

var dllToArrayForward = function (dll) {
	var array = [];

	var it = dll.begin();

	var e;

	while (!(e = it.next()).done){
		array.push(e.value);
	}

	return array;
};

var dllToArrayBackward = function (dll) {
	var array = [];

	var it = dll.rbegin();

	var e;

	while (!(e = it.next()).done){
		array.push(e.value);
	}

	return array;
};


test("DoublyLinkedList", function(){

	console.log("DoublyLinkedList");

	var i, j, k, n, m, it, a, b, v, first, last;

	var DoublyLinkedList = algo.DoublyLinkedList;

	var dll = new DoublyLinkedList();

	deepEqual(dll.length, 0, "length is 0");


	var expectedArrayForward = [];
	var expectedArrayBackward = [];

	var arrayForward = [];
	var arrayBackward = [];

	var add20 = function(){

		n = 10;

		for (i = 1; i <= n; ++i) {
			dll.push(i);
			expectedArrayForward.push(i);
			expectedArrayBackward.unshift(i);
			deepEqual(dll.length, i, "length is " + i);

			arrayForward = dllToArrayForward(dll);
			arrayBackward = dllToArrayBackward(dll);

			deepEqual(arrayForward, expectedArrayForward, "content is equal");
			deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
		}

		n = 20;

		for (; i <= n; ++i) {
			dll.unshift(i);
			expectedArrayForward.unshift(i);
			expectedArrayBackward.push(i);
			deepEqual(dll.length, i, "length is " + i);

			arrayForward = dllToArrayForward(dll);
			arrayBackward = dllToArrayBackward(dll);

			deepEqual(arrayForward, expectedArrayForward, "content is equal");
			deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
		}

	};

	var del20 = function(){

		n = 10;

		for (i = 20; i > n; --i) {
			deepEqual(dll.length, i, "length is " + i);

			v = dll.pop();
			a = expectedArrayForward.pop();
			b = expectedArrayBackward.shift();
			deepEqual(v, a, "popped value a === " + a);
			deepEqual(v, b, "popped value b === " + a);

			arrayForward = dllToArrayForward(dll);
			arrayBackward = dllToArrayBackward(dll);

			deepEqual(arrayForward, expectedArrayForward, "content is equal");
			deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
		}

		n = 0;

		for (; i > n; --i) {
			deepEqual(dll.length, i, "length is " + i);

			v = dll.shift();
			a = expectedArrayForward.shift();
			b = expectedArrayBackward.pop();
			deepEqual(v, a, "shifted value a === " + a);
			deepEqual(v, b, "shifted value b === " + a);

			arrayForward = dllToArrayForward(dll);
			arrayBackward = dllToArrayBackward(dll);

			deepEqual(arrayForward, expectedArrayForward, "content is equal");
			deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
		}
	};

	var clear = function(){
		dll.clear();
		expectedArrayForward.splice(0);
		expectedArrayBackward.splice(0);
	};

	clear();
	add20();
	del20();

	deepEqual(dll.length, 0, "length is 0");

	v = dll.shift();
	deepEqual(v, null, "v === null");

	v = dll.pop();
	deepEqual(v, null, "v === null");

	deepEqual(dll.length, 0, "length is 0");

	clear();
	add20();

	clear();

	deepEqual(dll.length, 0, "length is 0");

	arrayForward = dllToArrayForward(dll);
	arrayBackward = dllToArrayBackward(dll);

	deepEqual(arrayForward, expectedArrayForward, "content is equal");
	deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

	clear();
	add20();

	first = dll.begin();
	last = dll.end();
	first.next();

	dll.eraserange(first, last);
	expectedArrayForward.splice(0);
	expectedArrayBackward.splice(0);

	deepEqual(dll.length, 0, "length is 0");

	arrayForward = dllToArrayForward(dll);
	arrayBackward = dllToArrayBackward(dll);

	deepEqual(arrayForward, expectedArrayForward, "content is equal");
	deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

	clear();
	add20();

	first = dll.rbegin();
	last = dll.rend();
	first.next();

	dll.reraserange(first, last);
	expectedArrayForward.splice(0);
	expectedArrayBackward.splice(0);

	deepEqual(dll.length, 0, "length is 0");

	arrayForward = dllToArrayForward(dll);
	arrayBackward = dllToArrayBackward(dll);

	deepEqual(arrayForward, expectedArrayForward, "content is equal");
	deepEqual(arrayBackward, expectedArrayBackward, "content is equal");


	clear();
	add20();

	m = 5;

	first = dll.begin();
	last = dll.end();
	first.next();
	for (i = 0; i < m; ++i) {
		first.next();
		last.prev();
	}

	dll.eraserange(first, last);
	expectedArrayForward.splice(m, n - m - m);
	expectedArrayBackward.splice(m, n - m - m);

	deepEqual(dll.length, expectedArrayForward.length, "length check");
	deepEqual(dll.length, expectedArrayBackward.length, "length check");

	arrayForward = dllToArrayForward(dll);
	arrayBackward = dllToArrayBackward(dll);

	deepEqual(arrayForward, expectedArrayForward, "content is equal");
	deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

	clear();
	add20();

	m = 5;

	first = dll.rbegin();
	last = dll.rend();
	first.next();
	for (i = 0; i < m; ++i) {
		first.next();
		last.prev();
	}

	dll.reraserange(first, last);
	expectedArrayForward.splice(m, n - m - m);
	expectedArrayBackward.splice(m, n - m - m);

	deepEqual(dll.length, expectedArrayForward.length, "length check");
	deepEqual(dll.length, expectedArrayBackward.length, "length check");

	arrayForward = dllToArrayForward(dll);
	arrayBackward = dllToArrayBackward(dll);

	deepEqual(arrayForward, expectedArrayForward, "content is equal");
	deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
});