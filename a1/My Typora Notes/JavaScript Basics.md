# JavaScript Basics

- High level, interpreted programming language
- Conforms to the ECMAScript specification
- Multi-paradigm
- Runs on the client/browser as well as on the server(Node.js)

### Variables:

// var, let, const //

- In most of the cases we use let to initialise the variable 

  let will allow us to reassign the variable whereas const won't 

  - let age = 28;

    console.log(age);

    => 28

    age = 30;

    console.log(age);

    => 30

  - const value = 50;

    console.log(value);

    => 50

    value = 100;

    console.log(value);

    => 100

### Data types:

- String

  const name = 'John';

- Number

  const num = 20;

  const rating = 5.7;

- Boolean

  const isGood = true;

- Null

  const x = null;

- Undefined

  const y = undefinied;

  const z;

- Symbol

#### String

const name = 'Sam';

const age = 28;



// Concatenation //

console.log('My name is ' + name + ' and I am ' + age);



// Template String //

console.log(`My name is ${name} and I am ${age}`);



// Assign to variable //

const hello = `My name is ${name} and I am ${age}`;

console.log(hello)



note: ` this is symbol is named as backquote.



const s = 'Hello World';

console.log(s.length);

=> 11

console.log(s.toUpperCase());

=> HELLO WORLD

console.log(s.toLowerCase());

=> hello world

console.log(s.substring(0,5).toUpperCase());

=> HELLO

console.log(s.split(''));

=> (11) ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"]

const x = 'HTML, CSS, Bootstrap, Python, Flask, Django';

console.log(x.split(', '));

#### Arrays

// Variables that hold multiple values //

const fruits = ['apple', 'orange', 'pears' ];

fruits[3] = 'grapes';

console.log(fruits);

=> ['apple', 'orange', 'pears', 'grapes']

fruits.pop();

console.log(fruits);

=> ['apple', 'orange', 'pears' ]

fruits.push('mango');

console.log(fruits);

=> ['apple', 'orange', 'pears', 'mango']

fruit.unshift('banana');

console.log(fruits);

=> ['banana', 'apple', 'orange', 'pears', 'mango']

console.log(fruits.indexOf('orange'));

=> 2

console.log(Array.isArray('fruits');

=> true

console.log(Array.isArray('hello');

=> false

#### Objects



###### 

