'use strict';
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();
const log = function (val) { val; };
// const log = console.log;
// const limit = 20;
const limit = 1000000;

const genericFizzBuzz = function() {
    for (let i = 1; i <= limit; i++) {
        if (i % 15 === 0)
            log("FizzBuzz");
        else if (i % 3 === 0)
            log("Fizz");
        else if (i % 5 === 0)
            log("Buzz");
        else
            log(i);
    }
};

const genericProfilerCount = {
    count: 0,
    for: 0,
    div15: 0,
    div3: 0,
    div5: 0
};
const genericProfilerFizzBuzz = function() {
    genericProfilerCount.count++;
    for (let i = 1; i <= limit; i++) {
        genericProfilerCount.for++;
        genericProfilerCount.div15++;
        if (i % 15 === 0) {
            log("FizzBuzz");
        } else {
            genericProfilerCount.div3++;
            if (i % 3 === 0) {
                log("Fizz");
            } else {
                genericProfilerCount.div5++;
                if (i % 5 === 0) {
                    log("Buzz");
                } else {
                    log(i);
                }
            }
        }
    }
};

const genericVarsFizzBuzz = function() {
    let div3;
    let div5;
    for (let i = 1; i <= limit; i++) {
        div3 = i % 3 === 0;
        div5 = i % 5 === 0;
        if (div3 && div5)
            log("FizzBuzz");
        else if (div3)
            log("Fizz");
        else if (div5)
            log("Buzz");
        else
            log(i);
    }
};

const genericReorderedFizzBuzz = function() {
    for (let i = 1; i <= limit; i++) {
        if (i % 3 === 0)
            if (i % 5 === 0)
                log("FizzBuzz");
            else
                log("Fizz");
        else if (i % 5 === 0)
                log("Buzz");
        else
            log(i);
    }
};

const genericReorderedProfilerCount = {
    count: 0,
    for: 0,
    div3: 0,
    div51: 0,
    div52: 0
};
const genericReorderedFizzBuzzProfiling = function() {
    genericReorderedProfilerCount.count++;
    for (let i = 1; i <= limit; i++) {
        genericReorderedProfilerCount.for++;
        genericReorderedProfilerCount.div3++;
        if (i % 3 === 0) {
            genericReorderedProfilerCount.div51++;
            if (i % 5 === 0) {
                log("FizzBuzz");
            } else {
                log("Fizz");
            }
        } else {
            genericReorderedProfilerCount.div52++;
            if (i % 5 === 0) {
                log("Buzz");
            } else {
                log(i);
            }
        }
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

// With console.log
// const bitwiseFizzBuzz = function() {
//     let acc = 810092048;
//     console.log('acc =', acc.toString(2));
//     let number = 1;
//     let a;
//     let c;
//
//     while (number <= limit) {
//         c = acc & 3;
//         console.log('c =', c.toString(2));
//         a = 'FizzBuzz';
//         if (c === 0) {
//             a = number;
//         } else if (c === 1) {
//             a = 'Fizz';
//         } else if (c === 2) {
//             a = 'Buzz';
//         }
//
//         console.log('acc >> 2 =', (acc >> 2).toString(2));
//         console.log('c << 28 =', (c << 28).toString(2));
//         acc = acc >> 2 | c << 28;
//         console.log('acc =', acc.toString(2));
//         log(a);
//         number++;
//     }
// };

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
suite
.add('Generic', genericFizzBuzz)
.add('Generic Profiler', genericProfilerFizzBuzz)
.add('Generic Variables', genericVarsFizzBuzz)
.add('Generic Reordered', genericReorderedFizzBuzz)
.add('Generic Reordered Profiling', genericReorderedFizzBuzzProfiling)
.add('Incremental', incrementalFizzBuzz)
.add('Bitwise', bitwiseFizzBuzz)
.add('Concatenate', concatenateFizzBuzz)
.on('cycle', function(event) {
    results.push(String(event.target));
})
.on('complete', function() {
    results.forEach(function(result) {console.log(result);});
    console.log('Fastest is ' + this.filter('fastest').map('name'));
    console.log('genericProfilerCount', genericProfilerCount);
    console.log('genericReorderedProfilerCount', genericReorderedProfilerCount);
})
.run();

// genericFizzBuzz();
// genericReorderedFizzBuzz();
// cachedFizzBuzz();
// incrementalFizzBuzz();
// bitwiseFizzBuzz();
// fizzyFizzBuzz();
// concatenateFizzBuzz();
