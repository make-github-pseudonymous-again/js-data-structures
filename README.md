:herb: [@aureooms/js-data-structures](http://aureooms.github.io/js-data-structures)
[![License](https://img.shields.io/github/license/aureooms/js-data-structures.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-data-structures/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-data-structures.svg?style=flat)](https://github.com/aureooms/js-data-structures/issues)
==

<p align="center">
<a href="https://courses.csail.mit.edu/6.851/fall17">
<img src="https://ipfs.io/ipfs/QmRzr2vnMFBTAeD4htkBytbF1wZK83eFRGGNkU3fpXfW9T" width="600">
</a><br/>
<i>Advanced Data Structures</i> by <a href="https://erikdemaine.org">Erik Demaine</a>
</p>

Playground for data structures in JavaScript.
This is a child project of [@aureooms/js-library](https://github.com/aureooms/js-library)
and
the twin project of [@aureooms/js-algorithms](https://github.com/aureooms/js-algorithms).

## Description

This README regroups dozens of projects focusing on implementing data structures with JavaScript.
This project itself does not contain any code.

### :fallen_leaf: Heaps

  - [@aureooms/js-heap](https://github.com/aureooms/js-heap) : Heap data structures for JavaScript
    - [@aureooms/js-heap-spec](https://github.com/aureooms/js-heap-spec): Specification for heap data structures in JavaScript
    - [@aureooms/js-heapq](https://github.com/aureooms/js-heapq): Python's heapq library for Javascript
    - [@aureooms/js-heapsort](https://github.com/aureooms/js-heapsort): Heap sort algorithm for Javascript
    - [@aureooms/js-binomial-heap](https://github.com/aureooms/js-binomial-heap): Binomial heap data structure for JavaScript
    - [@aureooms/js-d-ary-heap](https://github.com/aureooms/js-d-ary-heap): d-ary heap data structure for JavaScript
    - [@aureooms/js-pairing-heap](https://github.com/aureooms/js-pairing-heap): Pairing heap data structure for JavaScript
    - [@aureooms/js-fibonacci-heap](https://github.com/aureooms/js-fibonacci-heap): Fibonacci heap data structure for JavaScript

### :seedling: Search trees

  - [@aureooms/js-bst](https://github.com/aureooms/js-bst) : Binary search tree data structures for JavaScript
    - [@aureooms/js-red-black-tree](https://github.com/aureooms/js-red-black-tree) : Red-black tree data structure for JavaScript

### :hocho: Hash tables

  Nothing yet.

### :school_satchel: Python's collections library for Javascript

  - [@aureooms/js-collections](https://github.com/aureooms/js-collections) :  Python's collections library for JavaScript
    - [@aureooms/js-collections-chainmap](https://github.com/aureooms/js-collections-chainmap) :  Collections library for JavaScript
    - [@aureooms/js-collections-counter](https://github.com/aureooms/js-collections-counter) :  Python's counter data structure for JavaScript
    - [@aureooms/js-collections-defaultdict](https://github.com/aureooms/js-collections-defaultdict) :  Python's defaultdict data structure for JavaScript
    - [@aureooms/js-collections-deque](https://github.com/aureooms/js-collections-deque) :  Python's deque data structure for JavaScript
    - [@aureooms/js-collections-dict](https://github.com/aureooms/js-collections-dict) :  Collections library for JavaScript
    - [@aureooms/js-collections-namedtuple](https://github.com/aureooms/js-collections-namedtuple) :  Python's namedtuple data structure for JavaScript
    - [@aureooms/js-collections-ordereddict](https://github.com/aureooms/js-collections-ordereddict) :  Python's ordereddict data structure for JavaScript
    - [@aureooms/js-collections-set](https://github.com/aureooms/js-collections-set) :  Python's set data structure for JavaScript

### :triangular_ruler: Computational geometry

  - [@aureooms/js-cg](https://github.com/aureooms/js-cg) : Computational geometry data structures and algorithms for JavaScript
  
### :rice_ball: Union-find
  - [@aureooms/js-disjoint-set](https://github.com/aureooms/js-disjoint-set) : Disjoint-set data structures for JavaScript
  - [@aureooms/js-fixed-disjoint-set](https://github.com/aureooms/js-fixed-disjoint-set) : Fixed-size-array-based disjoint-set set data structures for JavaScript

### :globe_with_meridians: Graph theory

  - [@aureooms/js-gn](https://github.com/aureooms/js-gn) : Graphs and networks data structures and algorithms for JavaScript

### :oden: Arrays, lists and stacks

  - [@aureooms/js-list-spec](https://github.com/aureooms/js-list-spec) : List abstract data type specification for JavaScript

#### Arrays

  - [@aureooms/js-arraylist](https://github.com/aureooms/js-arraylist) : Dynamic array data structures for JavaScript
  
#### Double-ended queues
  - [@aureooms/js-collections-deque](https://github.com/aureooms/js-collections-deque) :  Python's deque data structure for JavaScript
    
#### Linked lists

  - [@aureooms/js-dll](https://github.com/aureooms/js-dll) : Doubly linked list data structures for JavaScript
  - [@aureooms/js-sll](https://github.com/aureooms/js-sll) : Singly linked list data structures for JavaScript
  - [@aureooms/js-cll](https://github.com/aureooms/js-cll) : Circular linked list data structures for JavaScript
  - [@aureooms/js-fifo](https://github.com/aureooms/js-fifo) : First In, First Out data structures for JavaScript
  - [@aureooms/js-skip-list](https://github.com/aureooms/js-skip-list) : Skip list data structure for JavaScript

#### Stacks
  - [@aureooms/js-lifo](https://github.com/aureooms/js-lifo) : Last In, First Out data structures for JavaScript

### :chains: Tries
  - [@aureooms/js-trie](https://github.com/aureooms/js-trie) : Trie data structures for JavaScript
  
### :evergreen_tree: Persistent data structures
  - [@aureooms/js-persistent](https://github.com/aureooms/js-persistent) : Persistent data structures for JavaScript
    - [@aureooms/js-fingertree](https://github.com/aureooms/js-fingertree): Finger tree data structure for JavaScript
    - [@aureooms/js-persistent-stack](https://github.com/aureooms/js-persistent-stack): Persistent stack data structure for JavaScript
    
### :mailbox_with_mail: Miscellaneous
  - [@aureooms/js-pubsub](https://github.com/aureooms/js-pubsub) : Publish-subscribe pattern data structures for JavaScript
  - [@aureooms/js-dict](https://github.com/aureooms/js-dict) : Dictionary data structure for JavaScript

Those packages aim to provide *code bricks* that are as generic as possible.
Some examples are:
  - [a `d`-ary heap that can be parametrized with any `d`](https://github.com/aureooms/js-d-ary-heap),
  - [binary search trees built on the same left rotate and right rotate functions](https://github.com/aureooms/js-bst),
  - [an ArrayList implementation with parameterizable allocator](https://github.com/aureooms/js-arraylist).

## :scroll: Reference

A list of links and projects focusing on data structures implementation.

### :coffee: Projects implementing data structures in JavaScript

  - https://github.com/nzakas/computer-science-in-javascript
  - https://github.com/benoitvallon/computer-science-in-javascript
  - http://www.nayuki.io
  - https://github.com/Yomguithereal/mnemonist

### :peacock: Projects implementing data structures in other languages

  - https://github.com/patmorin/ods (C++, Java, Python)
  - http://www.nayuki.io (C, C++, Java, C#, Python, Haskell, MATLAB and others)
  - http://rosettacode.org (All kinds of languages)
  - https://github.com/mahmoud/boltons (Python)
  - https://github.com/simongog/sdsl-lite (C++)
