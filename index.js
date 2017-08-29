'use strict';
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();
const a = 3;
const b = 5;
const log = () => {};
// const log = console.log;
const limit = 1000000;
// const limit = 20;

const genericFizzBuzz = (num1, num2, max) => {
    const A = num1;
    const B = num2;
    const AB = num1 * num2;
    const limit = max;

    return () => {
        for (let i = 1; i <= limit; i++) {
            if (i % AB === 0)
                log('FizzBuzz');
            else if (i % A === 0)
                log('Fizz');
            else if (i % B === 0)
                log('Buzz');
            else
                log(i);
        }
    }
};

const genericVarsFizzBuzz = (num1, num2, max) => {
    const A = num1;
    const B = num2;
    const limit = max;

    return () => {
        let divA;
        let divB;
        for (let i = 1; i <= limit; i++) {
            divA = i % A === 0;
            divB = i % B === 0;
            if (divA)
                if (divB)
                    log('FizzBuzz');
                else
                    log('Fizz');
            else if (divB)
                log('Buzz');
            else
                log(i);
        }
    };
};

const genericReorderedFizzBuzz = (num1, num2, max) => {
    // Use a minimum amount of checks
    // Do not assign/reassign the variables
    const A = num1;
    const B = num2;
    const limit = max;

    return () => {
        for (let i = 1; i <= limit; i++) {
            if (i % A === 0)
                if (i % B === 0)
                    log('FizzBuzz');
                else
                    log('Fizz');
            else if (i % B === 0)
                log('Buzz');
            else
                log(i);
        }
    };
};

const incrementalFizzBuzz = (num1, num2, max) => {
    // Use equality and increment instead of division
    const A = num1;
    const B = num2;
    const limit = max;

    const generateIndex = (divisor) => {
        return {divisor, n: divisor};
    };

    const check = (index, n) => {
        if (n !== index.n) {
            return false;
        }
        index.n += index.divisor;
        return true;
    };

    return () => {
        const indexA = generateIndex(A);
        const indexB = generateIndex(B);
        let divA;
        let divB;

        for (let n = 1; n <= limit; n++) {
            divA = check(indexA, n);
            divB = check(indexB, n);
            if (divA && divB)
                log('FizzBuzz');
            else if (divA)
                log('Fizz');
            else if (divB)
                log('Buzz');
            else
                log(n);
        }
    };
};

const incrementalReorderedFizzBuzz = (num1, num2, max) => {
    // Use a minimum amount of checks
    // Use equality and increment instead of division
    const A = num1;
    const B = num2;
    const limit = max;

    const generateIndex = (divisor) => {
        return {divisor, n: divisor};
    };

    const check = (index, n) => {
        if (n !== index.n) {
            return false;
        }
        index.n += index.divisor;
        return true;
    };

    return () => {
        const indexA = generateIndex(A);
        const indexB = generateIndex(B);

        for (let n = 1; n <= limit; n++) {
            if (check(indexA, n))
                if (check(indexB, n))
                    log('FizzBuzz');
                else
                    log('Fizz');
            else if (check(indexB, n))
                log('Buzz');
            else
                log(n);
        }
    };
};

const incrementalReorderedOwnFizzBuzz = (num1, num2, max) => {
    // Use a minimum amount of checks
    // Use equality and increment instead of division
    // Use objects and properties instead of variables
    const A = num1;
    const B = num2;
    const limit = max;

    class Index {
        constructor(divisor) {
            this.divisor = divisor;
            this.n = divisor;
        }

        check(n) {
            if (n !== this.n) {
                return false;
            }
            this.n += this.divisor;
            return true;
        }
    }

    return () => {
        const indexA = new Index(A);
        const indexB = new Index(B);

        for (let n = 1; n <= limit; n++) {
            if (indexA.check(n))
                if (indexB.check(n))
                    log('FizzBuzz');
                else
                    log('Fizz');
            else if (indexB.check(n))
                log('Buzz');
            else
                log(n);
        }
    };
};

const incrementalReorderedAllInlineFizzBuzz = (num1, num2, max) => {
    // Use a minimum amount of checks
    // Use equality and increment instead of division
    // Use objects and properties instead of variables
    // Avoid function calls
    const A = num1;
    const B = num2;
    const limit = max;

    return () => {
        const i = {n: 1};
        const indexA = {n: A};
        const indexB = {n: B};

        for (; i.n <= limit; i.n++) {
            if (indexA.n === i.n) {
                indexA.n += A;
                if (indexB.n === i.n) {
                    indexB.n += B;
                    log('FizzBuzz');
                } else
                    log('Fizz');
            } else if (indexB.n === i.n) {
                indexB.n += B;
                log('Buzz');
            } else
                log(i.n);
        }
    };
};

const incrementalReorderedAllInlineOneObjectFizzBuzz = (num1, num2, max) => {
    // Do not assign/reassign the variables
    // Use a minimum amount of checks
    // Use equality and increment instead of division
    // Use objects and properties instead of variables
    // Avoid function calls
    // Operate only with properties of one object
    const A = num1;
    const B = num2;
    const limit = max;

    return () => {
        const stuff = {n: 1, indexA: A, indexB: B, A, B, limit};

        for (; stuff.n <= stuff.limit; stuff.n++) {
            if (stuff.indexA === stuff.n) {
                stuff.indexA += stuff.A;
                if (stuff.indexB === stuff.n) {
                    stuff.indexB += stuff.B;
                    log('FizzBuzz');
                } else
                    log('Fizz');
            } else if (stuff.indexB === stuff.n) {
                stuff.indexB += stuff.B;
                log('Buzz');
            } else
                log(stuff.n);
        }
    };
};

const concatenateFizzBuzz = (num1, num2, max) => {
    const A = num1;
    const B = num2;
    const limit = max;

    return () => {
        let output;
        for (let i = 1; i <= limit; i++) {
            output = '';

            if (i % A === 0) {
                output += 'Fizz';
            }
            if (i % B === 0) {
                output += 'Buzz';
            }

            if (output.length === 0) {
                output = i;
            }

            log(output);
        }
    };
};

suite
.add('Generic', genericFizzBuzz(a, b, limit))
.add('Generic Variables', genericVarsFizzBuzz(a, b, limit))
.add('Generic Reordered', genericReorderedFizzBuzz(a, b, limit))
.add('Incremental', incrementalFizzBuzz(a, b, limit))
.add('Incremental Reordered', incrementalReorderedFizzBuzz(a, b, limit))
.add('Incremental Reordered OwnMethods', incrementalReorderedOwnFizzBuzz(a, b, limit))
.add('Incremental Reordered AllInline', incrementalReorderedAllInlineFizzBuzz(a, b, limit))
.add('Incremental Reordered AllInline OneObject', incrementalReorderedAllInlineOneObjectFizzBuzz(a, b, limit))
.add('Concatenate', concatenateFizzBuzz(a, b, limit))
.on('cycle', (event) => {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run();

// genericFizzBuzz(a, b, limit)();
// genericVarsFizzBuzz(a, b, limit)();
// genericReorderedFizzBuzz(a, b, limit)();
// incrementalFizzBuzz(a, b, limit)();
// incrementalReorderedFizzBuzz(a, b, limit)();
// incrementalReorderedOwnFizzBuzz(a, b, limit)();
// incrementalReorderedAllInlineFizzBuzz(a, b, limit)();
// incrementalReorderedAllInlineOneObjectFizzBuzz(a, b, limit)();
// concatenateFizzBuzz(a, b, limit)();
