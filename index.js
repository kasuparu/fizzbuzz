'use strict';
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();
const log = function (val) { val; };
// const log = console.log;
const limit = 1000000;

const genericFizzBuzz = function() {
    for (let i = 1; i <= limit; i++) {
        if (i % 15 === 0)
            log("FizzBuzz");k
        else if (i % 3 === 0)
            log("Fizz");
        else if (i % 5 === 0)
            log("Buzz");
        else
            log(i);
    }
};

const incrementalFizzBuzz = function() {
    const generateIndex = function(divisor) {
        return {divisor, n: divisor};
    };
    const index3 = generateIndex(3);
    const index5 = generateIndex(5);

    const check = function (index, n) {
        if (n === index.n) {
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

const incremental2FizzBuzz = function() {
    let multiply3 = 3;
    let multiply5 = 5;
    let div3;
    let div5;

    for (let n = 1; n <= limit; n++) {
        div3 = n === multiply3;
        if (div3) {
            multiply3 += 3;
        }
        div5 = n === multiply3;
        if (div5) {
            multiply5 += 5;
        }

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
    let acc = 810092048;
    let number = 1;
    let a;
    let c;

    while (number <= limit) {
        c = acc & 3;
        a = 'FizzBuzz';
        if (c === 0) {
            a = number;
        } else if (c === 1) {
            a = 'Fizz';
        } else if (c === 2) {
            a = 'Buzz';
        }

        acc = acc >> 2 | c << 28;
        log(a);
        number++;
    }
};

const concatenateFizzBuzz = function() {
    let output;
    for (let i = 1; i <= limit; i++) {
        output = "";

        if (i % 3 === 0) {
            output += "Fizz";
        }
        if (i % 5 === 0) {
            output += "Buzz";
        }

        if (output.length === 0) {
            output = i;
        }

        log(output);
    }
};

const results = [];
suite.add('Generic FizzBuzz', genericFizzBuzz)
.add('Incremental FizzBuzz', incrementalFizzBuzz)
.add('Incremental2 FizzBuzz', incremental2FizzBuzz)
.add('Bitwise FizzBuzz', bitwiseFizzBuzz)
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
