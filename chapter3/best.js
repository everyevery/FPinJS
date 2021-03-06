var _ = require('lodash');

_.max([1, 2, 3, 4, 5]);
//=> 5

_.max([1, 2, 3, 4.75, 4.5]);
//=> 4.75

var people = [{name: "Fred", age: 65}, {name: "Lucy", age: 36}];
_.max(people, function(p) { return p.age; });
//=> {name: "Fred", age: 65}

function finder(valueFun, bestFun, coll) {
	return _.reduce(coll, function(best, current) {
		var bestValue = bestFun(best);
		var currentValue = bestFun(current);
		return (bestValue === bestFun(bestValue, currentValue)) ? bestValue : current;
	});
}

finder(_.identify, Math.max, [1, 2, 3, 4, 5]);
finder(plucker('age'), Math.max, people);
//=> {name: "Fred", age: 65}

finder(
	plucker('name'),
	function(x, y) { return (x.chartAt(0) === "L") ? x : y; },
	people
	);
//=> {name: "Lucy", age: 36}

function best(fun, coll) {
	return _.reduce(coll, function(x, y) {
		return fun(x, y) ? x : y;
	})

best(function(x, y) { return x > y; }, [1, 2, 3, 4, 5]);
//=> 5

