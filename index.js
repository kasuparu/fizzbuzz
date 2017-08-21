'use strict';
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();
const log = function () {};
// const log = console.log;
const limit = 1000000;

const genericFizzBuzz = function() {
    for (let i = 1; i <= limit; i++) {
        if (i % 15 == 0)
            log("FizzBuzz");
        else if (i % 3 == 0)
            log("Fizz");
        else if (i % 5 == 0)
            log("Buzz");
        else
            log(i);
    }
};

const cachedFizzBuzz = function() {
    const generateIndex = function(divisor) {
        const index = [];
        let n = divisor;
        while (n <= limit) {
            index.push(n);
            n += divisor;
        };
        index.pop();
        index.divisor = divisor;
        index.i = 0;
        return index;
    };
    const index3 = generateIndex(3);
    const index5 = generateIndex(5);

    const check = function (index, n) {
        if (n == index[index.i]) {
            index.i++;
            return true;
        }
        return false;
    };

    let div3;
    let div5;

    for (let n = 1; n <= limit; n++) {
        div3 = check(index3, n);
        div5 = check(index5, n);
        if (div3 && div5)
            log("FizzBuzz");
        else if (div3)
            log("Fizz");
        else if (div5)
            log("Buzz");
        else
            log(n);
    }
};

const incrementalFizzBuzz = function() {
    const generateIndex = function(divisor) {
        return {divisor, n: divisor};
    };
    const index3 = generateIndex(3);
    const index5 = generateIndex(5);

    const check = function (index, n) {
        if (n == index.n) {
            index.n += index.divisor;
            return true;
        }
        return false;
    };

    let div3;
    let div5;

    for (let n = 1; n <= limit; n++) {
        div3 = check(index3, n);
        div5 = check(index5, n);
        if (div3 && div5)
            log("FizzBuzz");
        else if (div3)
            log("Fizz");
        else if (div5)
            log("Buzz");
        else
            log(n);
    }
};

const bitwiseFizzBuzz = function() {
    var acc = 810092048;
    var number = 1;

    function bitwiseFizzBuzz(i) {
        var c = acc & 3, a = 'FizzBuzz';
        if (c === 0) {
            a = i;
        } else if (c === 1) {
            a = 'Fizz';
        } else if (c === 2) {
            a = 'Buzz';
        }

        acc = acc >> 2 | c << 28;
        return a;
    }

    while (number <= limit) {
        log(bitwiseFizzBuzz(number));
        number++;
    }
};

const fizzyFizzBuzz = function() {
    function fizzy(n) {
        if (n % 15 === 0) {
            return "FizzBuzz";
        }
        if (n % 3 === 0) {
            return "Fizz";
        }
        if (n % 5 === 0) {
            return "Buzz";
        }
        return n.toString();
    }

    for (let i = 1; i <= limit; i++) {
        log(fizzy(i));
    }
}

const concatenateFizzBuzz = function() {
    for (var i = 1; i <= limit; i++) {
        var output = "";

        if((i % 3) === 0){
            output += "Fizz";
        }
        if((i % 5) === 0){
            output += "Buzz";
        }

        if(output.length === 0){
            output = i.toString();
        }

        log(output);
    }
};

const results = [];
suite.add('Generic FizzBuzz', genericFizzBuzz)
.add('Cached FizzBuzz', cachedFizzBuzz)
.add('Incremental FizzBuzz', incrementalFizzBuzz)
.add('Bitwise FizzBuzz', bitwiseFizzBuzz)
.add('Fizzy FizzBuzz', fizzyFizzBuzz)
.add('Concatenate FizzBuzz', concatenateFizzBuzz)
.on('cycle', function(event) {
    results.push(String(event.target));
})
.on('complete', function() {
    results.forEach(function(result) {console.log(result);});
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run();

// genericFizzBuzz();
// cachedFizzBuzz();
// incrementalFizzBuzz();
// bitwiseFizzBuzz();
// fizzyFizzBuzz();
// concatenateFizzBuzz();
