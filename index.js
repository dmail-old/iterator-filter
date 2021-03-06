/*
*/
var proto = require('@dmail/proto');
var FilteredIterator = require('./FilteredIterator');

var FilteredIterable = proto.extend({
	iterable: null,
	filter: null,
	bind: null,

	constructor: function(iterable, filter, bind){
		this.iterable = iterable;
		this.filter = filter;
		this.bind = bind;
	},

	count: function(){
		return Array.from(this).length;
	},

	toString: function(){
		return '[object Filter Iterable]';
	}
});

FilteredIterable[Symbol.iterator] = function(){
	return FilteredIterator.create(this.iterable[Symbol.iterator](), this.filter, this.bind, 'value');
};

function filter(iterable, fn, bind){
	return FilteredIterable.create(iterable, fn, bind);
}

module.exports = filter;
Iterator.filter = filter;