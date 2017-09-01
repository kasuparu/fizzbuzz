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
