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

const incrementalReorderedAllInlineOneArrayFizzBuzz = (num1, num2, max) => {
    // Do not assign/reassign the variables
    // Use a minimum amount of checks
    // Use equality and increment instead of division
    // Use objects and properties instead of variables
    // Avoid function calls
    // Use array access instead of object property access
    return () => {
        // Index: n = 0, indexA = 1, indexB = 2, A = 3, B = 4, limit = 5
        const stuff = [1, num1, num2, num1, num2, max];

        for (; stuff[0] <= stuff[5]; stuff[0]++) {
            if (stuff[1] === stuff[0]) {
                stuff[1] += stuff[3];
                if (stuff[2] === stuff[0]) {
                    stuff[2] += stuff[4];
                    log('FizzBuzz');
                } else
                    log('Fizz');
            } else if (stuff[2] === stuff[0]) {
                stuff[2] += stuff[4];
                log('Buzz');
            } else
                log(stuff[0]);
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
    return () => {
        const stuff = {n: 1, indexA: num1, indexB: num2, A: num1, B: num2, limit: max};

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

// incrementalFizzBuzz(a, b, limit)();
// incrementalReorderedFizzBuzz(a, b, limit)();
// incrementalReorderedOwnFizzBuzz(a, b, limit)();
// incrementalReorderedAllInlineFizzBuzz(a, b, limit)();
// incrementalReorderedAllInlineOneArrayFizzBuzz(a, b, limit)();
// incrementalReorderedAllInlineOneObjectFizzBuzz(a, b, limit)();
