(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    const length = array.length;

    if (n > length) return array;
    return n === undefined ? array[length - 1] : array.slice(length - n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (let index = 0; index < collection.length; index++) {
        iterator(collection[index], index, collection);
      }
    } else {
      for (let item in collection) {
        iterator(collection[item], item, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    const result = [];

    for (let item of collection) {
      if (test(item)) {
        result.push(item);
      }
    }

    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    const results = [];
    const opposite = _.filter(collection, test);

    for (let item of collection) {
      if (!opposite.includes(item)) {
        results.push(item);
      }
    }

    return results;
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    let results = [];
    let visited = [];

    if (!iterator) {
      visited = new Set(array);
      results = Array.from(visited);
    } else if (isSorted && iterator) {
      _.each(array, function(item, index, array) {
        const calcd = iterator(item);
        visited.includes(calcd) ? calcd : results.push(item);
        visited.push(calcd);
      });
    }
    //below version is before using _.each()
    // for (let i = 0; i < array.length; i++) {
    //   let calcd = iterator(array[i]);
    //   visited.includes(calcd) ? calcd: results.push(array[i])
    //   visited.push(calcd);
    // }
    return results;
  };

  // Return the results of applying an iterator to each element.
  //below is my first version before using _.each() - CH
  // const results = [];
  // for (let i = 0; i < collection.length; i++) {
  //   let change = iterator(collection[i]);
  //   results.push(change);
  // }

  // map() is a useful primitive iteration function that works a lot
  // like each(), but in addition to running the operation on all
  // the members, it also maintains an array of results.
  _.map = function(collection, iterator) {
    const results = [];

    _.each(collection, function(item) {
      let newItem = iterator(item);
      results.push(newItem);
    });

    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    let index = 0;

    if (accumulator === undefined) {
      accumulator = collection[0];
      index = 1;
    }
    for (let i = index; i < collection.length; i++) {
      accumulator = iterator(accumulator, collection[i]);
    }

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    if (!collection.length) {
      const objArr = [];
      for (let prop in collection) {
        objArr.push(collection[prop]);
      }
      collection = objArr;
    }

    return _.reduce(
      collection,
      function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target;
      },
      false
    );
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    return _.reduce(
      collection,
      function(isMatch, item) {
        if (!isMatch) {
          return false;
        }
        if (!iterator) {
          return !!item;
        }
        return !!iterator(item) === true;
      },
      true
    );
    // TIP: Try re-using reduce() here.
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    //let every = _.every(collection, iterator);

    for (let item of collection) {
      if (!iterator) {
        return !!item === true;
      }
      if (iterator(item)) {
        return true;
      }
    }
    return false;
    //TIP: There's a very clever way to re-use every() here.
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (let i = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (let i = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        if (obj[key] === undefined) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    const store = {};

    return function() {
      const key = JSON.stringify(arguments);
      if (store[key]) {
        return store[key];
      } else {
        const val = func.apply(null, arguments);
        store[key] = val;
        return val;
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    const args = Array.prototype.slice.call(arguments, 2);

    setTimeout(function() {
      func.apply(null, args);
    }, wait);
  };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    const shuffled = [];

    while (shuffled.length < array.length) {
      const index = Math.floor(Math.random() * array.length);
      const sample = array[index];

      if (!_.contains(shuffled, index)) {
        shuffled.push(index);
      }
    }
    const results = _.map(shuffled, function(item) {
      return array[item];
    });

    return results;
  };

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    let result;

    if (typeof functionOrKey !== 'string') {
      result = _.map(collection, function(item) {
        return functionOrKey.call(item);
      });
    } else {
      result = _.map(collection, function(item) {
        return String.prototype[functionOrKey].call(item);
      });
    }

    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    let result;
    if (typeof iterator === 'string') {
      result = collection.sort(function(a, b) {
        return a[iterator] - b[iterator];
      });
    } else {
      result = collection.sort(function(a, b) {
        return iterator(a) - iterator(b);
      });
    }

    return result;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    let longest = [];
    const result = [];
    const args = Object.values(arguments);

    _.each(args, function(arg) {
      longest = arg.length > longest.length ? arg : longest;
    });
    _.each(longest, function(item, index) {
      const tempArr = [];
      const i = index;

      _.each(args, function(arg) {
        tempArr.push(arg[i]);
      });
      result.push(tempArr);
    });

    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    const flat = [];

    const iterator = function(array) {
      _.each(array, function(item) {
        if (Array.isArray(item)) {
          iterator(item);
        } else {
          flat.push(item);
        }
      });
    };
    iterator(nestedArray);

    return flat;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    const argsArr = Object.values(arguments);
    const results = [];
    const argsSet = new Set(_.flatten(argsArr));
    const allItems = Array.from(argsSet);

    _.each(allItems, function(item) {
      const shared = _.every(argsArr, function(arg) {
        return _.indexOf(arg, item) !== -1;
      });

      if (shared) {
        results.push(item);
      }
    });

    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    const argsArr = Array.from(arguments);
    const args = _.flatten(argsArr.slice(1));
    const result = [];

    _.each(argsArr[0], function(item) {
      if (!_.contains(args, item)) {
        result.push(item);
      }
    });

    return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    let release = true;

    setInterval(function() {
      release = !release;
    }, wait);

    return function() {
      if (release) {
        return func();
      }
    };
  };
})();
