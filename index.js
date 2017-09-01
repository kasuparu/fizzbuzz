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

const genericReorderedOneObjectFizzBuzz = (num1, num2, max) => {
    // Use a minimum amount of checks
    // Do not assign/reassign the variables
    // Use objects and properties instead of variables
    // Operate only with properties of one object
    return () => {
        const stuff = {i: 1, A: num1, B: num2, limit: max};

        for (; stuff.i <= stuff.limit; stuff.i++) {
            if (stuff.i % stuff.A === 0)
                if (stuff.i % stuff.B === 0)
                    log('FizzBuzz');
                else
                    log('Fizz');
            else if (stuff.i % stuff.B === 0)
                log('Buzz');
            else
                log(stuff.i);
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

const donatasFizzBuzz = (num1, num2, max) => {
    return () => {
        let i = 0;
        while (i < max) {
            i++;
            const isFizz = (i % num1) == 0;
            const isBuzz = (i % num2) == 0;
            if (isFizz && isBuzz) {
                log('FizzBuzz');
                continue;
            }
            if (isFizz) {
                log('Fizz');
                continue;
            }
            if (isBuzz) {
                log('Buzz');
                continue;
            }
            log(i);
        }
    }
};

suite
.add('Concatenate', concatenateFizzBuzz(a, b, limit))
.add('Generic', genericFizzBuzz(a, b, limit))
.add('Donatas', donatasFizzBuzz(a, b, limit))
.add('Generic Reordered OneObject', genericReorderedOneObjectFizzBuzz(a, b, limit))
.on('cycle', (event) => {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run();

// concatenateFizzBuzz(a, b, limit)();
// genericFizzBuzz(a, b, limit)();
// genericReorderedOneObjectFizzBuzz(a, b, limit)();
