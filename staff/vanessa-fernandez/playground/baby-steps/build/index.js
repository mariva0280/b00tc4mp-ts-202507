"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calc_1 = require("./calc");
console.log("Hello World");
console.log((0, calc_1.add)(2, 3));
console.log((0, calc_1.sub)(5, 2));
console.log((0, calc_1.mul)(4, 2));
console.log((0, calc_1.div)(8, 2));
;
let vane = { name: "Vanessa", age: 35, city: "New York" };
let rares = { name: "Rares", age: 25, city: "Bucarest" };
let mario = { name: "Mario", age: 28, city: "Roma" };
let berni = { name: "Berni", age: 22, city: "Berlin" };
class Worker {
    constructor(name, age, city, country) {
        this.name = name;
        this.age = age;
        this.city = city;
        this.country = country;
    }
    work() {
        console.log(`${this.name} is working.`);
    }
}
let alice = new Worker("Alice", 32, "London", "Uk");
alice.work();
console.log(alice instanceof Worker);
//# sourceMappingURL=index.js.map