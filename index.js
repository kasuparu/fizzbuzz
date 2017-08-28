'use strict';
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();
const log = (val) => { val; };
// const log = console.log;
// const limit = 20;
const limit = 1000000;
const a = 3;
const b = 5;

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
    const A = num1;
    const B = num2;
    const limit = max;

    const generateIndex = (divisor) => {
        return {divisor, n: divisor};
    };
    const indexA = generateIndex(A);
    const indexB = generateIndex(B);

    const check = (index, n) => {
        if (n !== index.n) {
            return false;
        }
        index.n += index.divisor;
        return true;
    };

    return () => {
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
// concatenateFizzBuzz(a, b, limit)();
