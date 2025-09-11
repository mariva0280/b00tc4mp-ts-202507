class Machine {
    isRunning = false;
    name;
    constructor(name) {
        this.name = name;
    }
    start() {
        this.isRunning = true;
        console.log(`${this.name} started.`);
    }
    stop() {
        this.isRunning = false;
        console.log(`${this.name} stopped.`);
    }
    status() {
        return this.isRunning ? `${this.name} is running.` : `${this.name} is stopped.`;
    }
}
class Roomba extends Machine {
    constructor() {
        super("Roomba");
    }
    mapHouse() {
        if (this.isRunning) {
            console.log("Roomba is mapping the house");
        }
        else {
            console.log("Roomba cannot map the house because it is stopped");
        }
    }
}
const myRoomba = new Roomba();
myRoomba.start();
console.log(myRoomba.status());
myRoomba.mapHouse();
myRoomba.stop();
console.log(myRoomba.status());
myRoomba.mapHouse();
class Thermomix extends Machine {
    constructor() {
        super("Thermomix");
    }
    cook() {
        if (this.isRunning) {
            console.log("Thermomix is cookin");
        }
        else {
            console.log("Thermomix cannot cook because it is stopped");
        }
    }
}
const myThermomix = new Thermomix();
myThermomix.start();
console.log(myThermomix.status());
myThermomix.cook();
myThermomix.stop();
console.log(myThermomix.status());
myThermomix.cook();
class Lamborghini extends Machine {
    constructor() {
        super("Lamborghini");
    }
    run() {
        if (this.isRunning) {
            console.log("Lamborghini is running at high speed");
        }
        else {
            console.log("Lamborghini cannot run because it is stopped");
        }
    }
}
const myLamborghini = new Lamborghini();
myLamborghini.start();
console.log(myLamborghini.status());
myLamborghini.run();
myLamborghini.stop();
console.log(myLamborghini.status());
myLamborghini.run();
export {};
//# sourceMappingURL=index.js.map