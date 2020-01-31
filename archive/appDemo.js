// COMMON JS MODULE SYNTAX
const person = require('./myModule1')

console.log(person.name)


// ES2015 MODULE

// Importing specific
/*  import {person2, sayHello} from './myModule2';
    console.log(person2.name)
    console.log(sayHello())
*/

// Importing all
/*  import * as mod from './myModule2';
    console.log(mod.person2.name)
    console.log(mod.sayHello())
*/

// Importing Default
import greeting from './myModule2';
console.log(greeting);


